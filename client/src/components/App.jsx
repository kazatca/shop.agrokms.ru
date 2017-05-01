import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';

import {ConnectedRouter} from 'react-router-redux';

import NotFound from './NotFound.jsx';
import CheckoutPage from './CheckoutPage.jsx';
import StoreFront from './StoreFront.jsx';
import Category from './Category.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AboutPage from './AboutPage.jsx';
import ThanksPage from './ThanksPage.jsx';
import LoginPage from './LoginPage.jsx';
import OrdersPage from './OrdersPage.jsx';
import ChangePasswordPage from './ChangePasswordPage.jsx';

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
          <Switch>
            <Route exact path="/" component={StoreFrontPage} />
            <Route path="/category/:id" component={Category} />
            <Route path="/cart" component={CheckoutPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/thanks" component={ThanksPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/change-password" component={ChangePasswordPage} />
            
            <Route path="*" component={NotFound} />
          </Switch>
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