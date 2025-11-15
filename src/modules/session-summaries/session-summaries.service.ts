import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionSummary } from './entities/session-summary.entity';
import { CreateSessionSummaryDto } from './dto/create-session-summary.dto';
import { UpdateSessionSummaryDto } from './dto/update-session-summary.dto';

@Injectable()
export class SessionSummariesService {
  constructor(
    @InjectRepository(SessionSummary)
    private sessionSummariesRepository: Repository<SessionSummary>,
  ) {}

  async create(createDto: CreateSessionSummaryDto): Promise<SessionSummary> {
    const existing = await this.sessionSummariesRepository.findOne({
      where: { bookingId: createDto.bookingId },
    });

    if (existing) {
      throw new ConflictException('Summary for this booking already exists');
    }

    const summary = this.sessionSummariesRepository.create(createDto);
    return await this.sessionSummariesRepository.save(summary);
  }

  async findByBooking(bookingId: string): Promise<SessionSummary | null> {
    return await this.sessionSummariesRepository.findOne({
      where: { bookingId },
    });
  }

  async findByStudent(studentId: string): Promise<SessionSummary[]> {
    return await this.sessionSummariesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByTutor(tutorId: string): Promise<SessionSummary[]> {
    return await this.sessionSummariesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<SessionSummary> {
    const summary = await this.sessionSummariesRepository.findOne({
      where: { id },
    });

    if (!summary) {
      throw new NotFoundException('Session summary not found');
    }

    return summary;
  }

  async update(id: string, updateDto: UpdateSessionSummaryDto): Promise<SessionSummary> {
    const summary = await this.findOne(id);

    Object.assign(summary, updateDto);
    return await this.sessionSummariesRepository.save(summary);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sessionSummariesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Session summary not found');
    }
  }
}
