import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quiz_templates')
export class QuizTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @Column({ name: 'grade_levels', type: 'integer', array: true })
  gradeLevels: number[];

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @Column({ name: 'problem_ids', type: 'uuid', array: true })
  problemIds: string[];

  @Column({ name: 'total_points', type: 'integer' })
  totalPoints: number;

  @Column({ name: 'duration_minutes', type: 'integer', nullable: true })
  durationMinutes?: number;

  @Column({ name: 'is_public', type: 'boolean', default: false })
  isPublic: boolean;

  @Column({ name: 'times_used', type: 'integer', default: 0 })
  timesUsed: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
