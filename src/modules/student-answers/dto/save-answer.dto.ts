import { IsUUID, IsString, MaxLength } from 'class-validator';

export class SaveAnswerDto {
  @IsUUID('4', { message: 'Problem ID must be a valid UUID' })
  problemId: string;

  @IsString({ message: 'Student answer must be a string' })
  @MaxLength(5000, { message: 'Answer must be at most 5000 characters' })
  studentAnswer: string;
}
