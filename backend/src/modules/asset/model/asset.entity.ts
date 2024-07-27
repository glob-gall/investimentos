import { Purchase } from 'src/modules/purchase/model/purchase.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  identifier: string;

  @ManyToOne(() => Purchase, (purchase) => purchase.asset)
  purchases?: Purchase[];

  constructor(asset: Partial<Asset>) {
    Object.assign(this, asset);
  }
}
