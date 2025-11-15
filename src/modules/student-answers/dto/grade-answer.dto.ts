import { IsNumber, Min, Max, IsOptional, IsString, MaxLength } from 'class-validator';

export class GradeAnswerDto {
  @IsNumber({}, { message: 'Points earned must be a number' })
  @Min(0, { message: 'Points earned must be at least 0' })
  pointsEarned: number;

  @IsOptional()
  @IsString({ message: 'Tutor feedback must be a string' })
  @MaxLength(1000, { message: 'Tutor feedback must be at most 1000 characters' })
  tutorFeedback?: string;
}
