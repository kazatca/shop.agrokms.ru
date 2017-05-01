import {expect} from 'chai';
import {load} from 'cheerio';
import db from '../src/db';
import {init} from './dbInit.js';

import renderPage from '../src/renderPage';

const [coffee, burger] = require('./mocks/products.json');

describe('renderPage func', function() {
  beforeEach(init);

  it('basic', () => renderPage('/').then(({status, body}) => {
    expect(status).to.eql(200);

    const $ = load(body);
    
    expect(body.match(/<!DOCTYPE html>/)).to.be.ok;
    expect(body.match(/window\.__INIT_STATE__ = '\["\~\#iM"/)).to.be.ok;
    expect($('[data-reactroot]')).to.be.ok;
  }));

  it('storefront at /', ()=> {
    return db.model('Product').bulkCreate([coffee, burger])
    .then(() => renderPage('/'))
    .then(({body}) => {
      const $ = load(body);
      
      expect($('[data-reactroot]')).to.be.ok;
      expect($('.product').length).to.eql(2);
      expect($('.product:nth-child(1) .name').text()).to.eql('Coffee');
      expect($('.product:nth-child(2) .name').text()).to.eql('Burger');
    });
  });

  it('title', () => renderPage('/').then(({body}) => {
    const $ = load(body);
    
    expect($('title').text()).to.eql('Магазин');
  }));

  it('got 404', () => renderPage('/life-on-mars').then(({status, body}) => {
    expect(body).to.not.ok;
    expect(status).to.eql(404);
  }));
});