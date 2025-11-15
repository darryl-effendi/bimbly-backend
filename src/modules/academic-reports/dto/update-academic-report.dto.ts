import { IsObject, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAcademicReportDto {
  @IsOptional()
  @IsObject({ message: 'Subtopic scores must be an object' })
  @IsNotEmpty({ message: 'Subtopic scores cannot be empty' })
  subtopicScores?: Record<string, number>;
}
