import React, {PropTypes} from 'react';

import {Provider} from 'react-redux';

import {Route} from 'react-router';
import {NavLink} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import Cart from './Cart';
import StoreFront from './StoreFront';
import Order from './Order.jsx';

const StoreFrontPage = props => {
  return (
    <div>
      <Cart />
      <StoreFront />
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="about">o.O</div>
  );
};


const App = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <NavLink to="/">StoreFront</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/order">Checkout</NavLink>
          <NavLink to="/about">About</NavLink>
          <Route exact path="/" component={StoreFrontPage} />
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={AboutPage} />
          <Route path="/order" component={Order} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default App;