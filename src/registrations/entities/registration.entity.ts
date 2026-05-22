import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { RegistrationLink } from './registration-link.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RegistrationLink)
  link: RegistrationLink;

  @Column()
  linkId: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  additionalInfo: string;

  @CreateDateColumn()
  createdAt: Date;
}
