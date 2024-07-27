import { Asset } from 'src/modules/asset/model/asset.entity';
import { Portfolio } from 'src/modules/portfolio/model/portfolio.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  price: number;

  @Column('numeric')
  capital: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.purchases)
  portfolio: Portfolio;

  @ManyToOne(() => Asset, (asset) => asset.purchases)
  @JoinColumn()
  asset: Asset;

  constructor(purchase: Partial<Purchase>) {
    Object.assign(this, purchase);
  }
}
