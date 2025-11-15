import { IsString, IsArray, IsInt, IsOptional, IsBoolean, IsUUID, MaxLength, Min, ArrayMinSize } from 'class-validator';

export class UpdateQuizTemplateDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255, { message: 'Title must be at most 255 characters' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(2000, { message: 'Description must be at most 2000 characters' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Subject must be a string' })
  @MaxLength(100, { message: 'Subject must be at most 100 characters' })
  subject?: string;

  @IsOptional()
  @IsArray({ message: 'Grade levels must be an array' })
  @IsInt({ each: true, message: 'Each grade level must be an integer' })
  @ArrayMinSize(1, { message: 'At least one grade level is required' })
  gradeLevels?: number[];

  @IsOptional()
  @IsArray({ message: 'Problem IDs must be an array' })
  @IsUUID('4', { each: true, message: 'Each problem ID must be a valid UUID' })
  @ArrayMinSize(1, { message: 'At least one problem is required' })
  problemIds?: string[];

  @IsOptional()
  @IsInt({ message: 'Duration minutes must be an integer' })
  @Min(1, { message: 'Duration minutes must be at least 1' })
  durationMinutes?: number;

  @IsOptional()
  @IsBoolean({ message: 'Is public must be a boolean' })
  isPublic?: boolean;
}
