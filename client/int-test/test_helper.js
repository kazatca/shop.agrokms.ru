import {config} from 'dotenv';

config({
  path: './int-test/.env'
});

process.env.NODE_ENV = 'test';
