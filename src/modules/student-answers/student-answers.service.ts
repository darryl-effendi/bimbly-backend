import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAnswer } from './entities/student-answer.entity';
import { Problem } from '../problems/entities/problem.entity';
import { SaveAnswerDto } from './dto/save-answer.dto';
import { GradeAnswerDto } from './dto/grade-answer.dto';
import { GradingService } from './grading.service';

@Injectable()
export class StudentAnswersService {
  constructor(
    @InjectRepository(StudentAnswer)
    private studentAnswersRepository: Repository<StudentAnswer>,
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,
    private gradingService: GradingService,
  ) {}

  async saveAnswer(assignmentId: string, saveDto: SaveAnswerDto): Promise<StudentAnswer> {
    const problem = await this.problemsRepository.findOne({
      where: { id: saveDto.problemId },
    });

    if (!problem) {
      throw new NotFoundException('Problem not found');
    }

    const existing = await this.studentAnswersRepository.findOne({
      where: {
        assignmentId,
        problemId: saveDto.problemId,
      },
    });

    const gradingResult = this.gradingService.calculateScore(
      saveDto.studentAnswer,
      problem.answerText,
      problem.questionType,
      problem.points,
    );

    if (existing) {
      existing.studentAnswer = saveDto.studentAnswer;
      existing.isCorrect = gradingResult.isCorrect;
      existing.pointsEarned = gradingResult.pointsEarned;
      return await this.studentAnswersRepository.save(existing);
    }

    const answer = this.studentAnswersRepository.create({
      assignmentId,
      problemId: saveDto.problemId,
      questionText: problem.questionText,
      studentAnswer: saveDto.studentAnswer,
      isCorrect: gradingResult.isCorrect,
      pointsEarned: gradingResult.pointsEarned,
    });

    return await this.studentAnswersRepository.save(answer);
  }

  async findByAssignment(assignmentId: string): Promise<StudentAnswer[]> {
    return await this.studentAnswersRepository.find({
      where: { assignmentId },
      relations: ['problem'],
      order: { createdAt: 'ASC' },
    });
  }

  async gradeAnswer(id: string, gradeDto: GradeAnswerDto): Promise<StudentAnswer> {
    const answer = await this.studentAnswersRepository.findOne({
      where: { id },
      relations: ['problem'],
    });

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    if (answer.problem.questionType !== 'essay') {
      throw new BadRequestException('Only essay answers can be manually graded');
    }

    if (gradeDto.pointsEarned > answer.problem.points) {
      throw new BadRequestException(`Points earned cannot exceed maximum points (${answer.problem.points})`);
    }

    answer.pointsEarned = gradeDto.pointsEarned;
    answer.tutorFeedback = gradeDto.tutorFeedback;
    answer.isCorrect = gradeDto.pointsEarned === answer.problem.points;

    return await this.studentAnswersRepository.save(answer);
  }
}
