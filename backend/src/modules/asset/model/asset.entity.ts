import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  identifier: string;

  constructor(asset: Partial<Asset>) {
    Object.assign(this, asset);
  }
}
