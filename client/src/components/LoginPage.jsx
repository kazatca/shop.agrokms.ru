import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Phone from './Phone.jsx';
import Password from './Password.jsx';

import {login} from '../actions/user.js';

export class LoginPageDummy extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.login(e)}>
          <Phone />
          <Password />
          <input type="submit" value="Войти" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (e) => {
      e.preventDefault();
      e.stopPropagation();
      return dispatch(login());
    }
  };
};

const LoginPage = connect(null, mapDispatchToProps)(LoginPageDummy);
export default LoginPage;