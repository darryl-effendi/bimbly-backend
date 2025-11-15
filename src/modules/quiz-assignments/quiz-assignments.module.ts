import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAssignmentsController } from './quiz-assignments.controller';
import { QuizAssignmentsService } from './quiz-assignments.service';
import { QuizAssignment } from './entities/quiz-assignment.entity';
import { StudentAnswer } from '../student-answers/entities/student-answer.entity';
import { QuizTemplatesModule } from '../quiz-templates/quiz-templates.module';
import { StudentAnswersModule } from '../student-answers/student-answers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizAssignment, StudentAnswer]),
    QuizTemplatesModule,
    StudentAnswersModule,
  ],
  controllers: [QuizAssignmentsController],
  providers: [QuizAssignmentsService],
  exports: [QuizAssignmentsService],
})
export class QuizAssignmentsModule {}
