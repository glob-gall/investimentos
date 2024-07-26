import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'app-investimentos',
        password: 'strongPasswordXD',
        database: 'app-investimentos',
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: ['../../modules/user/model/*.entity.ts'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
