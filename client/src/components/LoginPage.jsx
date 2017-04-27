import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Phone from './Phone.jsx';
import Password from './Password.jsx';

import {login} from '../actions/user.js';

export class LoginPageDummy extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  render() {
    return (
      <div>
        {
          this.props.error?
          <div className="error">{this.props.error}</div>:
          null
        }
        <form onSubmit={(e) => this.props.login(e)}>
          <Phone />
          <Password />
          <input type="submit" value="Войти" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.getIn(['messages', 'loginError'])
});

const mapDispatchToProps = dispatch => {
  return {
    login: (e) => {
      e.preventDefault();
      e.stopPropagation();
      return dispatch(login());
    }
  };
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageDummy);
export default LoginPage;