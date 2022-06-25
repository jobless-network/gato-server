import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('wallets')
export class Wallet {

  @PrimaryColumn()
  address: string;

  @Column()
  nonce: string;
}