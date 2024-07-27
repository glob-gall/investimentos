import { DataSource } from 'typeorm';
import { Purchase } from './purchase.entity';

export const photoProviders = [
  {
    provide: 'Purchase',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Purchase),
    inject: ['DATA_SOURCE'],
  },
];
