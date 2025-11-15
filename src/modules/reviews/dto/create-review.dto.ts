import { IsUUID, IsInt, Min, Max, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsUUID('4', { message: 'Booking ID must be a valid UUID' })
  bookingId: string;

  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating: number;

  @IsOptional()
  @IsString({ message: 'Review text must be a string' })
  @MaxLength(1000, { message: 'Review text must be at most 1000 characters' })
  reviewText?: string;
}
