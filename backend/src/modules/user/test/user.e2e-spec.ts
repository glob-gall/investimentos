import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../user.module';
import { CreateUserDto } from '../dto/create-user.dto';

import { DatabaseModule } from 'src/core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';

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

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const admin: CreateUserDto = {
    email: 'admin@email.com',
    name: 'admin',
    password: '123123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        UserModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    await clearDatabase(app.get(DataSource));
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(admin);

    await promoteUserToAdmin(app.get(DataSource), response.body.id);
  });

  const user: CreateUserDto = {
    email: 'user1@email.com',
    name: 'user',
    password: '123123',
  };

  it('(POST) /user should create a user', async () => {
    await request(app.getHttpServer()).post('/users').send(user);
  });

  it('(POST) /user should not create a user with email already in use', async () => {
    await request(app.getHttpServer()).post('/users').send(user);

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user);
    expect(response.body.message).toBe('user.email_already_exist');
    expect(response.status).toBe(400);
  });

  it('(POST) /user should not create a user without email,password or name', async () => {
    const withoutName = await request(app.getHttpServer()).post('/users').send({
      email: user.email,
      password: user.password,
    });
    const withoutEmail = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: user.name,
        password: user.password,
      });
    const withoutPassword = await request(app.getHttpServer())
      .post('/users')
      .send({
        email: user.email,
        name: user.name,
      });

    expect(withoutName.body.message).toContain('name should not be empty');
    expect(withoutEmail.body.message).toContain('email must be an email');
    expect(withoutEmail.body.message).toContain('email should not be empty');
    expect(withoutPassword.body.message).toContain(
      'password should not be empty',
    );
  });

  it('(PUT) /user/add-portfolio & (DELETE) /user/remove-portfolio/:id - should create and delete a portfolio', async () => {
    await request(app.getHttpServer()).post('/users').send(user);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: user.email,
        password: user.password,
      });

    const token = loginResponse.body.token;

    const createPortfolioResponse = await request(app.getHttpServer())
      .put('/users/add-portfolio')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'portfolio',
      });
    const userWithNewPortfolio = createPortfolioResponse.body;
    expect(userWithNewPortfolio.portfolios.length).toBe(1);

    const portfolioToRemove = userWithNewPortfolio.portfolios[0];
    const deletePortfolioResponse = await request(app.getHttpServer())
      .delete(`/users/remove-portfolio/${portfolioToRemove.id}`)
      .set('Authorization', `Bearer ${token}`);
    const removedPortfolio = deletePortfolioResponse.body;

    expect(removedPortfolio.title).toBe('portfolio');
  });

  it('(POST) /user should show your on user', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(user);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: user.email,
        password: user.password,
      });

    const token = loginResponse.body.token;

    const userProfileResponse = await request(app.getHttpServer())
      .get(`/users/${createUserResponse.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    const userProfile = userProfileResponse.body;
    expect(userProfile.email).toBe('user1@email.com');
    expect(userProfile.name).toBe('user');
  });
});
