import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Phone from './Phone.jsx';
import Password from './Password.jsx';

import {login} from '../actions/user.js';

const preventDefault = e => {
  e.preventDefault();
  e.stopPropagation();
};

export const LoginPage = ({error, login}) => 
  <div>
    {error && <div className="error">{error}</div>}
    <form onSubmit={(e) => {preventDefault(e); login();}} >
      <Phone />
      <Password />
      <input type="submit" value="Войти" />
    </form>
  </div>;

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string
};


const mapStateToProps = state => ({
  error: state.getIn(['messages', 'loginError'])
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);