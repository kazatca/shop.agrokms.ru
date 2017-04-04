import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router';

import {ConnectedRouter} from 'react-router-redux';

import Cart from './Cart.jsx';
import StoreFront from './StoreFront.jsx';
import Order from './Order.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AboutPage from './AboutPage.jsx';

const StoreFrontPage = props => {
  return (
    <div>
      <StoreFront />
    </div>
  );
};


const App = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Header />
          <div className="content container">
            <Route exact path="/" component={StoreFrontPage} />
            <Route path="/cart" component={Cart} />
            <Route path="/about" component={AboutPage} />
            <Route path="/order" component={Order} />
          </div>
          <Footer />
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