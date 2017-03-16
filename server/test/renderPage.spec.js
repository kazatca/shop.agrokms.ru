import {expect} from 'chai';
import {load} from 'cheerio';
import renderPage from '../src/renderPage';

describe('renderPage func', function() {
  it('basic', ()=> {
    const page = renderPage('/');
    const $ = load(page);
    
    expect(page.match(/<!DOCTYPE html>/)).to.be.ok;
    expect(page.match(/window\.__INIT_STATE__ = \["\~\#iM"/)).to.be.ok;
    expect($('[data-reactroot]')).to.be.ok;
  });
});