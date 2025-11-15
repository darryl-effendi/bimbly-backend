import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type QuestionType = 'multiple_choice' | 'essay' | 'short_answer';

@Entity('problems')
export class Problem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  @Column({ name: 'answer_text', type: 'text' })
  answerText: string;

  @Column({
    name: 'question_type',
    type: 'enum',
    enum: ['multiple_choice', 'essay', 'short_answer'],
  })
  questionType: QuestionType;

  @Column({ type: 'text', array: true, nullable: true })
  choices?: string[];

  @Column({ type: 'integer', default: 1 })
  points: number;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
