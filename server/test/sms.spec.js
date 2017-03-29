import {expect} from 'chai';
import * as sms from '../src/sms.js';

xdescribe('SMS', function() {
  it('OTP sended', () => 
    sms.sendOTP('+79242283113', '123123')
    .then(res =>{
      expect(res).to.be.a("object");
    })
  );
});