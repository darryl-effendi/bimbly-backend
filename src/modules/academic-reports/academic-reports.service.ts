import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAcademicReport } from './entities/student-academic-report.entity';
import { CreateAcademicReportDto } from './dto/create-academic-report.dto';
import { UpdateAcademicReportDto } from './dto/update-academic-report.dto';

@Injectable()
export class AcademicReportsService {
  constructor(
    @InjectRepository(StudentAcademicReport)
    private academicReportsRepository: Repository<StudentAcademicReport>,
  ) {}

  async create(studentId: string, createDto: CreateAcademicReportDto): Promise<StudentAcademicReport> {
    const existing = await this.academicReportsRepository.findOne({
      where: {
        studentId,
        grade: createDto.grade,
        subjectId: createDto.subjectId,
      },
    });

    if (existing) {
      throw new ConflictException('Report for this student-grade-subject combination already exists');
    }

    const report = this.academicReportsRepository.create({
      studentId,
      ...createDto,
    });

    return await this.academicReportsRepository.save(report);
  }

  async findAllByStudent(studentId: string): Promise<StudentAcademicReport[]> {
    return await this.academicReportsRepository.find({
      where: { studentId },
      relations: ['subject'],
      order: { grade: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<StudentAcademicReport> {
    const report = await this.academicReportsRepository.findOne({
      where: { id },
      relations: ['subject'],
    });

    if (!report) {
      throw new NotFoundException('Academic report not found');
    }

    return report;
  }

  async update(id: string, updateDto: UpdateAcademicReportDto): Promise<StudentAcademicReport> {
    const report = await this.findOne(id);

    Object.assign(report, updateDto);
    return await this.academicReportsRepository.save(report);
  }

  async remove(id: string): Promise<void> {
    const result = await this.academicReportsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Academic report not found');
    }
  }

  calculateAverage(subtopicScores: Record<string, number>): number {
    const scores = Object.values(subtopicScores);
    if (scores.length === 0) return 0;

    const sum = scores.reduce((acc, score) => acc + score, 0);
    return Math.round((sum / scores.length) * 10) / 10;
  }
}
