import { DataSource } from 'typeorm';
import { Portfolio } from './portfolio.entity';

export const photoProviders = [
  {
    provide: 'Portfolio',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Portfolio),
    inject: ['DATA_SOURCE'],
  },
];
