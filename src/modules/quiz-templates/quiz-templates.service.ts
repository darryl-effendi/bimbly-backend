import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizTemplate } from './entities/quiz-template.entity';
import { Problem } from '../problems/entities/problem.entity';
import { CreateQuizTemplateDto } from './dto/create-quiz-template.dto';
import { UpdateQuizTemplateDto } from './dto/update-quiz-template.dto';

@Injectable()
export class QuizTemplatesService {
  constructor(
    @InjectRepository(QuizTemplate)
    private quizTemplatesRepository: Repository<QuizTemplate>,
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,
  ) {}

  async create(userId: string, createDto: CreateQuizTemplateDto): Promise<QuizTemplate> {
    const problems = await this.problemsRepository.findByIds(createDto.problemIds);
    const totalPoints = problems.reduce((sum, problem) => sum + problem.points, 0);

    const template = this.quizTemplatesRepository.create({
      authorId: userId,
      totalPoints,
      isPublic: createDto.isPublic || false,
      ...createDto,
    });

    return await this.quizTemplatesRepository.save(template);
  }

  async findAll(userId: string, includePublic: boolean = true): Promise<QuizTemplate[]> {
    const query = this.quizTemplatesRepository.createQueryBuilder('template');

    if (includePublic) {
      query.where('template.authorId = :userId OR template.isPublic = true', { userId });
    } else {
      query.where('template.authorId = :userId', { userId });
    }

    return await query.orderBy('template.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<QuizTemplate> {
    const template = await this.quizTemplatesRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException('Quiz template not found');
    }

    return template;
  }

  async update(id: string, userId: string, updateDto: UpdateQuizTemplateDto): Promise<QuizTemplate> {
    const template = await this.findOne(id);

    if (template.authorId !== userId) {
      throw new ForbiddenException('You can only update your own templates');
    }

    if (updateDto.problemIds) {
      const problems = await this.problemsRepository.findByIds(updateDto.problemIds);
      const totalPoints = problems.reduce((sum, problem) => sum + problem.points, 0);
      Object.assign(template, { ...updateDto, totalPoints });
    } else {
      Object.assign(template, updateDto);
    }

    return await this.quizTemplatesRepository.save(template);
  }

  async togglePublic(id: string, userId: string): Promise<QuizTemplate> {
    const template = await this.findOne(id);

    if (template.authorId !== userId) {
      throw new ForbiddenException('You can only modify your own templates');
    }

    template.isPublic = !template.isPublic;
    return await this.quizTemplatesRepository.save(template);
  }

  async remove(id: string, userId: string): Promise<void> {
    const template = await this.findOne(id);

    if (template.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own templates');
    }

    await this.quizTemplatesRepository.delete(id);
  }

  async incrementUsage(id: string): Promise<void> {
    await this.quizTemplatesRepository.increment({ id }, 'timesUsed', 1);
  }
}
