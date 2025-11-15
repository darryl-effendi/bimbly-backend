import { IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateQuizAssignmentDto {
  @IsUUID('4', { message: 'Quiz template ID must be a valid UUID' })
  quizTemplateId: string;

  @IsUUID('4', { message: 'Student ID must be a valid UUID' })
  studentId: string;

  @IsOptional()
  @IsUUID('4', { message: 'Session ID must be a valid UUID' })
  sessionId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Deadline must be a valid date string' })
  deadline?: string;
}
