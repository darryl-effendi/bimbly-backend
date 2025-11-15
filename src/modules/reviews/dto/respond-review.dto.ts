import { IsString, MinLength, MaxLength } from 'class-validator';

export class RespondReviewDto {
  @IsString({ message: 'Response must be a string' })
  @MinLength(10, { message: 'Response must be at least 10 characters' })
  @MaxLength(1000, { message: 'Response must be at most 1000 characters' })
  response: string;
}
