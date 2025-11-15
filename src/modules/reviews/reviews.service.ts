import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { TutorProfile } from '../tutors/entities/tutor-profile.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { RespondReviewDto } from './dto/respond-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(TutorProfile)
    private tutorProfilesRepository: Repository<TutorProfile>,
  ) {}

  async create(studentId: string, tutorId: string, createDto: CreateReviewDto): Promise<Review> {
    const existing = await this.reviewsRepository.findOne({
      where: { bookingId: createDto.bookingId },
    });

    if (existing) {
      throw new ConflictException('Review for this booking already exists');
    }

    const review = this.reviewsRepository.create({
      studentId,
      tutorId,
      ...createDto,
    });

    const savedReview = await this.reviewsRepository.save(review);

    await this.updateTutorRating(tutorId);

    return savedReview;
  }

  async findByTutor(
    tutorId: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ data: Review[]; meta: { averageRating: number; totalReviews: number; page: number; limit: number } }> {
    const skip = (page - 1) * limit;

    const [reviews, total] = await this.reviewsRepository.findAndCount({
      where: { tutorId },
      relations: ['student', 'student.user'],
      order: { [sortBy]: order },
      skip,
      take: limit,
    });

    const tutor = await this.tutorProfilesRepository.findOne({
      where: { id: tutorId },
    });

    return {
      data: reviews,
      meta: {
        averageRating: tutor?.averageRating || 0,
        totalReviews: total,
        page,
        limit,
      },
    };
  }

  async findByBooking(bookingId: string): Promise<Review | null> {
    return await this.reviewsRepository.findOne({
      where: { bookingId },
      relations: ['student', 'student.user'],
    });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['student', 'student.user'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async respond(id: string, tutorId: string, respondDto: RespondReviewDto): Promise<Review> {
    const review = await this.findOne(id);

    if (review.tutorId !== tutorId) {
      throw new BadRequestException('You can only respond to your own reviews');
    }

    if (review.tutorResponse) {
      throw new ConflictException('You have already responded to this review');
    }

    review.tutorResponse = respondDto.response;
    review.tutorRespondedAt = new Date();

    return await this.reviewsRepository.save(review);
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewsRepository.delete(id);
    await this.updateTutorRating(review.tutorId);
  }

  private async updateTutorRating(tutorId: string): Promise<void> {
    const reviews = await this.reviewsRepository.find({
      where: { tutorId },
    });

    const totalReviews = reviews.length;
    let averageRating = 0;

    if (totalReviews > 0) {
      const sumRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
      averageRating = Math.round((sumRatings / totalReviews) * 100) / 100;
    }

    await this.tutorProfilesRepository.update(tutorId, {
      averageRating,
      totalReviews,
    });
  }
}
