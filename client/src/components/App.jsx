import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {NavLink} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import Cart from './Cart';
import StoreFront from './StoreFront';
import Order from './Order.jsx';
import '../scss/main.scss';
import '../scss/header.scss';
import '../scss/menu.scss';


const StoreFrontPage = props => {
  return (
    <div>
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
          <div className="header">
            <div className="logo col-sm-3">LOGO</div>
            <div className="menu col-sm-9">
              <div>
                <NavLink exact to="/">Магазин</NavLink>
                <NavLink to="/cart">Корзина</NavLink>
                <NavLink to="/about">Контакты</NavLink>
              </div>
            </div>
          </div>
          <div className="container">
            <Route exact path="/" component={StoreFrontPage} />
            <Route path="/cart" component={Cart} />
            <Route path="/about" component={AboutPage} />
            <Route path="/order" component={Order} />
          </div>
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