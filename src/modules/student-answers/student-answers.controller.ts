import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StudentAnswersService } from './student-answers.service';
import { SaveAnswerDto } from './dto/save-answer.dto';
import { GradeAnswerDto } from './dto/grade-answer.dto';

@Controller('student-answers')
export class StudentAnswersController {
  constructor(private readonly studentAnswersService: StudentAnswersService) {}

  @Post()
  saveAnswer(@Body() body: { assignmentId: string; answer: SaveAnswerDto }) {
    return this.studentAnswersService.saveAnswer(body.assignmentId, body.answer);
  }

  @Get('assignment/:assignmentId')
  findByAssignment(@Param('assignmentId') assignmentId: string) {
    return this.studentAnswersService.findByAssignment(assignmentId);
  }

  @Patch(':id/grade')
  gradeAnswer(@Param('id') id: string, @Body() gradeDto: GradeAnswerDto) {
    return this.studentAnswersService.gradeAnswer(id, gradeDto);
  }
}
