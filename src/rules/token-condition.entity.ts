import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContractType } from "./contract-type";
import { Rule } from "./rule.entity";

@Entity('token-conditions')
export class TokenCondition{
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: 1 })
  chainId: number;

  @Column()
  contractAddress: string;

  @Column({
    type: "enum",
    enum: ContractType,
    default: ContractType.ERC721,
    })
  contractType: ContractType;

  @Column({ default: 1 })
  amount: number;

  @ManyToOne(() => Rule, (rule) => rule.conditions)
  rule: Rule
}