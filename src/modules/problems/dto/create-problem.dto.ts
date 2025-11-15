import { IsString, IsEnum, IsOptional, IsArray, IsInt, Min, MaxLength } from 'class-validator';

export class CreateProblemDto {
  @IsString({ message: 'Question text must be a string' })
  @MaxLength(5000, { message: 'Question text must be at most 5000 characters' })
  questionText: string;

  @IsString({ message: 'Answer text must be a string' })
  @MaxLength(5000, { message: 'Answer text must be at most 5000 characters' })
  answerText: string;

  @IsEnum(['multiple_choice', 'essay', 'short_answer'], {
    message: 'Question type must be multiple_choice, essay, or short_answer',
  })
  questionType: 'multiple_choice' | 'essay' | 'short_answer';

  @IsOptional()
  @IsArray({ message: 'Choices must be an array' })
  @IsString({ each: true, message: 'Each choice must be a string' })
  choices?: string[];

  @IsOptional()
  @IsInt({ message: 'Points must be an integer' })
  @Min(1, { message: 'Points must be at least 1' })
  points?: number;
}
