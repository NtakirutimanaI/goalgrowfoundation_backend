import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CmsContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  page: string;

  @Column()
  section: string;

  @Column()
  key: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ default: 'text' })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
