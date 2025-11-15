import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuizTemplate } from '../../quiz-templates/entities/quiz-template.entity';
import { StudentProfile } from '../../students/entities/student-profile.entity';
import { TutorProfile } from '../../tutors/entities/tutor-profile.entity';

export type AssignmentStatus = 'assigned' | 'in_progress' | 'submitted' | 'graded';

@Entity('quiz_assignments')
export class QuizAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_template_id', type: 'uuid' })
  quizTemplateId: string;

  @ManyToOne(() => QuizTemplate)
  @JoinColumn({ name: 'quiz_template_id' })
  quizTemplate: QuizTemplate;

  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @ManyToOne(() => StudentProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: StudentProfile;

  @Column({ name: 'tutor_id', type: 'uuid' })
  tutorId: string;

  @ManyToOne(() => TutorProfile)
  @JoinColumn({ name: 'tutor_id' })
  tutor: TutorProfile;

  @Column({ name: 'session_id', type: 'uuid', nullable: true })
  sessionId?: string;

  @Column({ name: 'assigned_at', type: 'timestamp' })
  assignedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date;

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  startedAt?: Date;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  score?: number;

  @Column({
    type: 'enum',
    enum: ['assigned', 'in_progress', 'submitted', 'graded'],
    default: 'assigned',
  })
  status: AssignmentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
