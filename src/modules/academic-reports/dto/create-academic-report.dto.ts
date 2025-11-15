import { IsInt, Min, Max, IsUUID, IsObject, IsNotEmpty } from 'class-validator';

export class CreateAcademicReportDto {
  @IsInt({ message: 'Grade must be an integer' })
  @Min(1, { message: 'Grade must be at least 1' })
  @Max(12, { message: 'Grade must be at most 12' })
  grade: number;

  @IsUUID('4', { message: 'Subject ID must be a valid UUID' })
  subjectId: string;

  @IsObject({ message: 'Subtopic scores must be an object' })
  @IsNotEmpty({ message: 'Subtopic scores cannot be empty' })
  subtopicScores: Record<string, number>;
}
