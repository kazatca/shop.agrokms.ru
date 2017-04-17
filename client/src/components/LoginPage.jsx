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
        <Phone />
        <Password />
        <button onClick={() => this.props.login()}>Войти</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login())
  };
};

const LoginPage = connect(null, mapDispatchToProps)(LoginPageDummy);
export default LoginPage;