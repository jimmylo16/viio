import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { expect } from 'chai';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get a JWT then successfully make a call', async () => {
    const registerReq = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'jimmylo1606@hotmail.com',
        password: 'Clave123',
        fullName: 'Jimmy lopez',
      })
      .expect(400);

    const token = registerReq.body.token;

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'jimmylo1606@hotmail.com',
        password: 'Clave123',
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.email).to.equal('jimmylo1606@hotmail.com');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
