import jsdom from 'jsdom';
// import chai from 'chai';
// import chaiImmutable from 'chai-immutable';


global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// chai.use(chaiImmutable);