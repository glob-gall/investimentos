import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { Portfolio } from 'src/modules/portfolio/model/portfolio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', default: UserRole.User, enum: UserRole })
  role: UserRole;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user, {
    cascade: ['update'],
  })
  portfolios?: Portfolio[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
