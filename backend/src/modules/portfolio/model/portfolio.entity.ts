import { Purchase } from 'src/modules/purchase/model/purchase.entity';
import { User } from 'src/modules/user/model/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column({ type: 'text', unique: true })
  slug: string;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @OneToMany(() => Purchase, (purchase) => purchase.portfolio)
  purchases?: Purchase[];

  constructor(portfolio: Partial<Portfolio>) {
    Object.assign(this, portfolio);
  }
}
