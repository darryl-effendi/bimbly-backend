import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { QuizAssignment } from '../../quiz-assignments/entities/quiz-assignment.entity';
import { Problem } from '../../problems/entities/problem.entity';

@Entity('student_answers')
@Unique(['assignmentId', 'problemId'])
export class StudentAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'assignment_id', type: 'uuid' })
  assignmentId: string;

  @ManyToOne(() => QuizAssignment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assignment_id' })
  assignment: QuizAssignment;

  @Column({ name: 'problem_id', type: 'uuid' })
  problemId: string;

  @ManyToOne(() => Problem)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  @Column({ name: 'student_answer', type: 'text' })
  studentAnswer: string;

  @Column({ name: 'is_correct', type: 'boolean', nullable: true })
  isCorrect?: boolean | null;

  @Column({ name: 'points_earned', type: 'decimal', precision: 5, scale: 2, default: 0 })
  pointsEarned: number;

  @Column({ name: 'tutor_feedback', type: 'text', nullable: true })
  tutorFeedback?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
