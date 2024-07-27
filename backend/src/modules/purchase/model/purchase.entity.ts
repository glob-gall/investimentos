import { Asset } from 'src/modules/asset/model/asset.entity';
import { Portfolio } from 'src/modules/portfolio/model/portfolio.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

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

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.purchases)
  portfolio: Portfolio;

  @OneToOne(() => Asset)
  @JoinColumn()
  asset: Asset;

  constructor(purchase: Partial<Purchase>) {
    Object.assign(this, purchase);
  }
}
