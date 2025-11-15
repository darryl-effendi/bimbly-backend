import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './entities/problem.entity';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,
  ) {}

  async create(userId: string, createDto: CreateProblemDto): Promise<Problem> {
    const problem = this.problemsRepository.create({
      createdBy: userId,
      points: createDto.points || 1,
      ...createDto,
    });

    return await this.problemsRepository.save(problem);
  }

  async findAllByUser(userId: string): Promise<Problem[]> {
    return await this.problemsRepository.find({
      where: { createdBy: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Problem> {
    const problem = await this.problemsRepository.findOne({ where: { id } });

    if (!problem) {
      throw new NotFoundException('Problem not found');
    }

    return problem;
  }

  async update(id: string, userId: string, updateDto: UpdateProblemDto): Promise<Problem> {
    const problem = await this.findOne(id);

    if (problem.createdBy !== userId) {
      throw new ForbiddenException('You can only update your own problems');
    }

    Object.assign(problem, updateDto);
    return await this.problemsRepository.save(problem);
  }

  async remove(id: string, userId: string): Promise<void> {
    const problem = await this.findOne(id);

    if (problem.createdBy !== userId) {
      throw new ForbiddenException('You can only delete your own problems');
    }

    await this.problemsRepository.delete(id);
  }
}
