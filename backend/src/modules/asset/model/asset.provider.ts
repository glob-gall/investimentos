import { DataSource } from 'typeorm';
import { Asset } from './asset.entity';

export const photoProviders = [
  {
    provide: 'Asset',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Asset),
    inject: ['DATA_SOURCE'],
  },
];
