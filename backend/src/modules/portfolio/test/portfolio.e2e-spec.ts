import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PortfolioModule } from '../portfolio.module';

import { DatabaseModule } from 'src/core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserModule } from 'src/modules/user/user.module';
import slugify from 'slugify';
import { User } from 'src/modules/user/model/user.entity';
import { CreatePurchaseDto } from 'src/modules/purchase/dto/create-purchase.dto';
import { Purchase } from 'src/modules/purchase/model/purchase.entity';

async function clearDatabase(dataSource: DataSource) {
  await dataSource.query(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
      END LOOP;
    END $$;
  `);
}

async function promoteUserToAdmin(dataSource: DataSource, userId: number) {
  await dataSource.query(
    `
    UPDATE "user"
    SET role = 'ADMIN'
    WHERE id = $1;
  `,
    [userId],
  );
}

describe('[Portfolio Module]', () => {
  let app: INestApplication;
  const admin: CreateUserDto = {
    email: 'admin@email.com',
    name: 'admin',
    password: '123123',
  };

  const userDto: CreateUserDto = {
    email: 'user1@email.com',
    name: 'user',
    password: '123123',
  };
  const purchaseDto: CreatePurchaseDto = {
    assetIdentifier: 'aab',
    capital: 1500.01,
    price: 15,
  };

  let token = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        PortfolioModule,
        UserModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  beforeEach(async () => {
    await clearDatabase(app.get(DataSource));

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(admin);
    await promoteUserToAdmin(app.get(DataSource), response.body.id);

    await request(app.getHttpServer()).post('/users').send(userDto);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: userDto.email,
        password: userDto.password,
      });
    token = loginResponse.body.token;
  });

  it('shold create a slug correctly', async () => {
    const title = 'portfolio com nome GRANDE para o slug ficar legal hehe';
    const createPortfolioResponse = await request(app.getHttpServer())
      .put('/users/add-portfolio')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title,
      });
    await request(app.getHttpServer())
      .put('/users/add-portfolio')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title,
      });
    expect(createPortfolioResponse.body.portfolios.length).toBe(1);

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const bySlugResponse = await request(app.getHttpServer())
      .get(`/portfolios/${slug}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const bySlugResponse2 = await request(app.getHttpServer())
      .get(`/portfolios/${slug}-1`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(bySlugResponse.body.slug).toBe(slug);
    expect(bySlugResponse2.body.slug).toBe(`${slug}-1`);
  });

  it('shold validate a purchase addition to the portfolio', async () => {
    const title = 'portfolio com nome GRANDE para o slug ficar legal hehe';
    const createPortfolioResponse = await request(app.getHttpServer())
      .put('/users/add-portfolio')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title,
      });
    const userWithNewPortfolio: User = createPortfolioResponse.body;
    expect(userWithNewPortfolio.portfolios.length).toBe(1);

    const porfolio = userWithNewPortfolio.portfolios[0];
    const addPurchaseResponse = await request(app.getHttpServer())
      .put(`/portfolios/${porfolio.id}/add-purchase`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(addPurchaseResponse.body.message).toContain(
      'assetIdentifier should not be empty',
    );
    expect(addPurchaseResponse.body.message).toContain(
      'price must be a number conforming to the specified constraints',
    );
    expect(addPurchaseResponse.body.message).toContain(
      'price should not be empty',
    );
    expect(addPurchaseResponse.body.message).toContain(
      'capital must be a number conforming to the specified constraints',
    );
    expect(addPurchaseResponse.body.message).toContain(
      'capital should not be empty',
    );
  });

  it('(PUT) /portfolios/:id/add-purchase & (DELETE) /portfolios/:id/remove-purchase/:purchaseId', async () => {
    const title = 'portfolio com nome GRANDE para o slug ficar legal hehe';
    const createPortfolioResponse = await request(app.getHttpServer())
      .put('/users/add-portfolio')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title,
      });
    const userWithNewPortfolio: User = createPortfolioResponse.body;
    expect(userWithNewPortfolio.portfolios.length).toBe(1);
    const porfolio = userWithNewPortfolio.portfolios[0];

    const addPurchaseResponse = await request(app.getHttpServer())
      .put(`/portfolios/${porfolio.id}/add-purchase`)
      .set('Authorization', `Bearer ${token}`)
      .send(purchaseDto);
    expect(addPurchaseResponse.body.purchases.length).toBe(1);

    const purchase: Purchase = addPurchaseResponse.body.purchases[0];
    const removePurchaseResponse = await request(app.getHttpServer())
      .delete(`/portfolios/${porfolio.id}/remove-purchase/${purchase.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(removePurchaseResponse.body.purchases.length).toBe(0);
  });
});
