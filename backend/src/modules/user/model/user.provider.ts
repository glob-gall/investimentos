import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const photoProviders = [
  {
    provide: 'User',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
