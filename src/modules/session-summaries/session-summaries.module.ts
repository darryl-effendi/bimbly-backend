import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSummariesController } from './session-summaries.controller';
import { SessionSummariesService } from './session-summaries.service';
import { SessionSummary } from './entities/session-summary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionSummary])],
  controllers: [SessionSummariesController],
  providers: [SessionSummariesService],
  exports: [SessionSummariesService],
})
export class SessionSummariesModule {}
