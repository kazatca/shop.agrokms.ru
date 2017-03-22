import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import {Route} from 'react-router';
import {
  ConnectedRouter, 
  routerReducer, 
  routerMiddleware, 
  push
} from 'react-router-redux';
import {createMemoryHistory as createHistory} from 'history';

import {combineReducers} from '../src/reducer';
import cartReducer from '../src/reducers/cart';

const MainPage = () => {
  return (
    <div className="main">Main page</div>
  );
};

const AboutPage = () => {
  return (
    <div className="about">About</div>
  );
};


describe('Router + redux', function() {
  it('basic', ()=>{
    const history = createHistory();

    const store = createStore(
      routerReducer, 
      applyMiddleware(routerMiddleware(history))
    );

    const app = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={MainPage} /> 
            <Route path="/about" component={AboutPage} />
          </div>
        </ConnectedRouter>
      </Provider>
    );

    expect(app.find('.main').length).to.eql(1);
    expect(app.find('.about').length).to.eql(0);

    store.dispatch(push('/about'));

    expect(app.find('.main').length).to.eql(0);
    expect(app.find('.about').length).to.eql(1);
  });

  it('combineReducers', ()=>{
    const history = createHistory();

    const store = createStore(
      combineReducers({
        cart: cartReducer,
        router: routerReducer
      }), 
      applyMiddleware(routerMiddleware(history))
    );

    const app = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={MainPage} /> 
            <Route path="/about" component={AboutPage} />
          </div>
        </ConnectedRouter>
      </Provider>
    );

    expect(app.find('.main').length).to.eql(1);
    expect(app.find('.about').length).to.eql(0);

    store.dispatch(push('/about'));

    expect(app.find('.main').length).to.eql(0);
    expect(app.find('.about').length).to.eql(1);
  });
});