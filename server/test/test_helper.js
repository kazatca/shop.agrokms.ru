import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';
import {config} from 'dotenv';

config({
  path: './test/.env'
});

process.env.NODE_ENV = 'test';

chai.use(chaiImmutable);
chai.use(chaiAsPromised);
