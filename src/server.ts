import { config } from 'dotenv';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infra/http/container';
import { app } from '@shared/infra/http/app';
import { dataSource } from '@shared/infra/typeorm';

config();

dataSource.initialize().then(() => {
  app.listen(7000, () => {
    return console.log('Server started on port 7000.');
  });
});