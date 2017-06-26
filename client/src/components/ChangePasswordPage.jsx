import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Password from './Password.jsx';
import {changePassword} from '../actions/user.js';

const ChangePasswordPage =({changePassword}) =>
  <div>
    <Password />
    <button onClick={changePassword}>Изменить пароль</button>
  </div>;

ChangePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  changePassword: () => dispatch(changePassword())
});

export default connect(null, mapDispatchToProps)(ChangePasswordPage);