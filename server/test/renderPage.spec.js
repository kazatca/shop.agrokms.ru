import {expect} from 'chai';
import {load} from 'cheerio';
import db from '../src/db';
import {init} from './dbInit.js';

import renderPage from '../src/renderPage';

const [coffee, burger] = require('./mocks/products.json');

describe('renderPage func', function() {
  beforeEach(init);

  it('basic', () => renderPage('/').then(page => {
    const $ = load(page);
    
    expect(page.match(/<!DOCTYPE html>/)).to.be.ok;
    expect(page.match(/window\.__INIT_STATE__ = '\["\~\#iM"/)).to.be.ok;
    expect($('[data-reactroot]')).to.be.ok;
  }));

  it('storefront at /', ()=> {
    return db.model('Product').bulkCreate([coffee, burger])
    .then(() => renderPage('/'))
    .then(page => {
      const $ = load(page);
      
      expect($('[data-reactroot]')).to.be.ok;
      expect($('.product').length).to.eql(2);
      expect($('.product:nth-child(1) .name').text()).to.eql('Coffee');
      expect($('.product:nth-child(2) .name').text()).to.eql('Burger');
    });
  });

  it('title', () => renderPage('/').then(page => {
    const $ = load(page);
    
    expect($('title').text()).to.eql('Storefront');
  }));
});