import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column({ type: 'text', unique: true })
  slug: string;

  constructor(portfolio: Partial<Portfolio>) {
    Object.assign(this, portfolio);
  }
}
