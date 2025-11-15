import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TutorProfile } from '../../tutors/entities/tutor-profile.entity';
import { StudentProfile } from '../../students/entities/student-profile.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'booking_id', type: 'uuid', unique: true })
  bookingId: string;

  @Column({ name: 'tutor_id', type: 'uuid' })
  tutorId: string;

  @ManyToOne(() => TutorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tutor_id' })
  tutor: TutorProfile;

  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @ManyToOne(() => StudentProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: StudentProfile;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ name: 'review_text', type: 'text', nullable: true })
  reviewText?: string;

  @Column({ name: 'tutor_response', type: 'text', nullable: true })
  tutorResponse?: string;

  @Column({ name: 'tutor_responded_at', type: 'timestamp', nullable: true })
  tutorRespondedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
