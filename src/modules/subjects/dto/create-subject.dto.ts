import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateSubjectDto {
  @IsString({ message: 'Subject name must be a string' })
  @MinLength(2, { message: 'Subject name must be at least 2 characters' })
  @MaxLength(100, { message: 'Subject name must be at most 100 characters' })
  name: string;
}
