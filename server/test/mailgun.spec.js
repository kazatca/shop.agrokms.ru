import {send} from '../src/services/mailgun.js';
import {expect} from 'chai';

xdescribe('Mailgun service', function() {
  it('basic', () => 
    send('kazatca@gmail.com', 'Mailgun test', 'Its working')
    
    .then(json => {
      console.log(json);
      expect(json).to.have.property('id');
      expect(json).to.have.property('message', 'Queued. Thank you.');
    })
  );
});