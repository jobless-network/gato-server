import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rules')
export class Rule{
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  organization: string;

  @Column()
  meetAllConditions: boolean;
}