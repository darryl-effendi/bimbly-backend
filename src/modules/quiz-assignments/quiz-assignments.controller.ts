import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { QuizAssignmentsService } from './quiz-assignments.service';
import { CreateQuizAssignmentDto } from './dto/create-quiz-assignment.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller('quiz-assignments')
export class QuizAssignmentsController {
  constructor(private readonly quizAssignmentsService: QuizAssignmentsService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateQuizAssignmentDto) {
    return this.quizAssignmentsService.create(req.user.tutorProfileId, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.quizAssignmentsService.findAll(
      req.user.userType === 'student' ? req.user.studentProfileId : req.user.tutorProfileId,
      req.user.userType,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizAssignmentsService.findOne(id);
  }

  @Patch(':id/start')
  start(@Param('id') id: string, @Request() req) {
    return this.quizAssignmentsService.start(id, req.user.studentProfileId);
  }

  @Post(':id/submit')
  submit(@Param('id') id: string, @Request() req, @Body() submitDto: SubmitQuizDto) {
    return this.quizAssignmentsService.submit(id, req.user.studentProfileId, submitDto);
  }

  @Get(':id/results')
  getResults(@Param('id') id: string) {
    return this.quizAssignmentsService.getResults(id);
  }
}
