import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PlayerProfile } from '../../profiles/entities/player-profile.entity';

@Entity()
export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  points: number;

  @ManyToOne(() => PlayerProfile, { nullable: true })
  @JoinColumn()
  assignedPlayer: PlayerProfile | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
