import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { GateType } from './gate-type';
import { TokenCondition } from './token-condition.entity';

@Entity('rules')
export class Rule{
  
  @Unique(["organization", "gateType", "gateId"])
  
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  description: string;

  @Column()
  organization: string;

  @Column({
    type: "enum",
    enum: GateType,
    default: GateType.WEB_PAGE,
    })
  gateType: GateType;

  @Column()
  gateId: string;

  @Column({ default: true })
  meetAllConditions: boolean;

  @OneToMany(type => TokenCondition, condition => condition.rule, { cascade: true })
  conditions: TokenCondition[];
}