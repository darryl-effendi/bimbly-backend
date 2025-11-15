import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const existing = await this.subjectsRepository.findOne({
      where: { name: createSubjectDto.name },
    });

    if (existing) {
      throw new ConflictException('Subject with this name already exists');
    }

    const subject = this.subjectsRepository.create(createSubjectDto);
    return await this.subjectsRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectsRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({ where: { id } });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async remove(id: string): Promise<void> {
    const result = await this.subjectsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Subject not found');
    }
  }

  async seed(): Promise<void> {
    const defaultSubjects = [
      'Matematika',
      'Bahasa Indonesia',
      'Bahasa Inggris',
      'Fisika',
      'Kimia',
      'Biologi',
      'Sejarah',
      'Geografi',
      'Ekonomi',
      'Sosiologi',
    ];

    for (const name of defaultSubjects) {
      const existing = await this.subjectsRepository.findOne({ where: { name } });
      if (!existing) {
        const subject = this.subjectsRepository.create({ name });
        await this.subjectsRepository.save(subject);
      }
    }
  }
}
