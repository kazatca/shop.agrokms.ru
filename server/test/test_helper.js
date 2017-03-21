import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';

import {config} from 'dotenv';

config({
  path: './test/.env'
});

chai.use(chaiImmutable);
chai.use(chaiAsPromised);

