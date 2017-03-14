import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// import mochaClean from 'mocha-clean';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);


// const error = console.error;
// console.error = function(warning/*, ...args*/) {
//   // if (/(Invalid prop|Failed prop type)/.test(warning)) {
//     throw new Error(warning);
//   // }
//   // error.apply(console, [warning, ...args]);
// };