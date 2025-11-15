import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentAnswersController } from './student-answers.controller';
import { StudentAnswersService } from './student-answers.service';
import { GradingService } from './grading.service';
import { StudentAnswer } from './entities/student-answer.entity';
import { Problem } from '../problems/entities/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentAnswer, Problem])],
  controllers: [StudentAnswersController],
  providers: [StudentAnswersService, GradingService],
  exports: [StudentAnswersService],
})
export class StudentAnswersModule {}
