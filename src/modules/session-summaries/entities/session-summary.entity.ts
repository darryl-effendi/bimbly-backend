import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('session_summaries')
export class SessionSummary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'booking_id', type: 'uuid', unique: true })
  bookingId: string;

  @Column({ type: 'text' })
  strengths: string;

  @Column({ name: 'areas_for_improvement', type: 'text' })
  areasForImprovement: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'homework_assigned', type: 'text', nullable: true })
  homeworkAssigned?: string;

  @Column({ name: 'next_session_plan', type: 'text', nullable: true })
  nextSessionPlan?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
