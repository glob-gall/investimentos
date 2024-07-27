import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', unique: true })
  price: number;

  @Column({ type: 'numeric', unique: true })
  capital: number;

  @Column({ type: 'date', unique: true })
  date: Date;

  constructor(purchase: Partial<Purchase>) {
    Object.assign(this, purchase);
  }
}
