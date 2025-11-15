import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizTemplatesController } from './quiz-templates.controller';
import { QuizTemplatesService } from './quiz-templates.service';
import { QuizTemplate } from './entities/quiz-template.entity';
import { Problem } from '../problems/entities/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizTemplate, Problem])],
  controllers: [QuizTemplatesController],
  providers: [QuizTemplatesService],
  exports: [QuizTemplatesService],
})
export class QuizTemplatesModule {}
