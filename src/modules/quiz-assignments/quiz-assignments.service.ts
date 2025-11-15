import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAssignment } from './entities/quiz-assignment.entity';
import { QuizTemplate } from '../quiz-templates/entities/quiz-template.entity';
import { StudentAnswer } from '../student-answers/entities/student-answer.entity';
import { CreateQuizAssignmentDto } from './dto/create-quiz-assignment.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { StudentAnswersService } from '../student-answers/student-answers.service';
import { QuizTemplatesService } from '../quiz-templates/quiz-templates.service';

@Injectable()
export class QuizAssignmentsService {
  constructor(
    @InjectRepository(QuizAssignment)
    private quizAssignmentsRepository: Repository<QuizAssignment>,
    @InjectRepository(StudentAnswer)
    private studentAnswersRepository: Repository<StudentAnswer>,
    private quizTemplatesService: QuizTemplatesService,
    private studentAnswersService: StudentAnswersService,
  ) {}

  async create(tutorId: string, createDto: CreateQuizAssignmentDto): Promise<QuizAssignment> {
    await this.quizTemplatesService.findOne(createDto.quizTemplateId);

    const assignment = this.quizAssignmentsRepository.create({
      tutorId,
      assignedAt: new Date(),
      deadline: createDto.deadline ? new Date(createDto.deadline) : undefined,
      ...createDto,
    });

    const saved = await this.quizAssignmentsRepository.save(assignment);

    await this.quizTemplatesService.incrementUsage(createDto.quizTemplateId);

    return saved;
  }

  async findAll(userId: string, userType: 'student' | 'tutor'): Promise<QuizAssignment[]> {
    const whereCondition = userType === 'student'
      ? { studentId: userId }
      : { tutorId: userId };

    return await this.quizAssignmentsRepository.find({
      where: whereCondition,
      relations: ['quizTemplate', 'student', 'student.user', 'tutor', 'tutor.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<QuizAssignment> {
    const assignment = await this.quizAssignmentsRepository.findOne({
      where: { id },
      relations: ['quizTemplate', 'student', 'student.user'],
    });

    if (!assignment) {
      throw new NotFoundException('Quiz assignment not found');
    }

    return assignment;
  }

  async start(id: string, studentId: string): Promise<QuizAssignment> {
    const assignment = await this.findOne(id);

    if (assignment.studentId !== studentId) {
      throw new ForbiddenException('You can only start your own assignments');
    }

    if (assignment.status !== 'assigned') {
      throw new BadRequestException('Quiz has already been started');
    }

    if (assignment.deadline && new Date() > assignment.deadline) {
      throw new BadRequestException('Quiz deadline has passed');
    }

    assignment.status = 'in_progress';
    assignment.startedAt = new Date();

    return await this.quizAssignmentsRepository.save(assignment);
  }

  async submit(id: string, studentId: string, submitDto: SubmitQuizDto): Promise<QuizAssignment> {
    const assignment = await this.findOne(id);

    if (assignment.studentId !== studentId) {
      throw new ForbiddenException('You can only submit your own assignments');
    }

    if (assignment.status === 'submitted' || assignment.status === 'graded') {
      throw new BadRequestException('Quiz has already been submitted');
    }

    if (assignment.deadline && new Date() > assignment.deadline) {
      throw new BadRequestException('Quiz deadline has passed');
    }

    for (const answerDto of submitDto.answers) {
      await this.studentAnswersService.saveAnswer(id, answerDto);
    }

    assignment.status = 'submitted';
    assignment.submittedAt = new Date();

    const answers = await this.studentAnswersService.findByAssignment(id);
    const hasEssays = answers.some(a => a.problem.questionType === 'essay');

    if (!hasEssays) {
      assignment.status = 'graded';
      assignment.score = this.calculateScore(answers);
    }

    return await this.quizAssignmentsRepository.save(assignment);
  }

  async getResults(id: string): Promise<{ assignment: QuizAssignment; answers: StudentAnswer[]; score: number }> {
    const assignment = await this.findOne(id);

    if (assignment.status !== 'graded' && assignment.status !== 'submitted') {
      throw new BadRequestException('Quiz must be submitted before viewing results');
    }

    const answers = await this.studentAnswersService.findByAssignment(id);
    const score = this.calculateScore(answers);

    if (assignment.status === 'submitted') {
      const allGraded = answers.every(a => a.isCorrect !== null || a.tutorFeedback !== null);
      if (allGraded) {
        assignment.status = 'graded';
        assignment.score = score;
        await this.quizAssignmentsRepository.save(assignment);
      }
    }

    return {
      assignment,
      answers,
      score,
    };
  }

  private calculateScore(answers: StudentAnswer[]): number {
    const totalPoints = answers.reduce((sum, answer) => sum + answer.problem.points, 0);
    const earnedPoints = answers.reduce((sum, answer) => sum + Number(answer.pointsEarned), 0);

    if (totalPoints === 0) return 0;

    return Math.round((earnedPoints / totalPoints) * 100 * 100) / 100;
  }
}
