import { IsUUID, IsString, MinLength, IsOptional, MaxLength } from 'class-validator';

export class CreateSessionSummaryDto {
  @IsUUID('4', { message: 'Booking ID must be a valid UUID' })
  bookingId: string;

  @IsString({ message: 'Strengths must be a string' })
  @MinLength(10, { message: 'Strengths must be at least 10 characters' })
  @MaxLength(2000, { message: 'Strengths must be at most 2000 characters' })
  strengths: string;

  @IsString({ message: 'Areas for improvement must be a string' })
  @MinLength(10, { message: 'Areas for improvement must be at least 10 characters' })
  @MaxLength(2000, { message: 'Areas for improvement must be at most 2000 characters' })
  areasForImprovement: string;

  @IsOptional()
  @IsString({ message: 'Notes must be a string' })
  @MaxLength(2000, { message: 'Notes must be at most 2000 characters' })
  notes?: string;

  @IsOptional()
  @IsString({ message: 'Homework assigned must be a string' })
  @MaxLength(1000, { message: 'Homework assigned must be at most 1000 characters' })
  homeworkAssigned?: string;

  @IsOptional()
  @IsString({ message: 'Next session plan must be a string' })
  @MaxLength(1000, { message: 'Next session plan must be at most 1000 characters' })
  nextSessionPlan?: string;
}
