import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';

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

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
