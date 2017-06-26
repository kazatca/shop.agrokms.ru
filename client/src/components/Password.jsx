import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setPassword} from '../actions/user.js';

export const Password = ({password, setPassword}) =>
  <div>
    <input 
      type="password" 
      className="password"
      value={password} 
      onChange={e => setPassword(e.target.value)} />
  </div>;

Password.propTypes = {
  password: PropTypes.string,
  setPassword: PropTypes.func
};

const mapStateToProps = state => ({
  password: state.getIn(['user', 'password'], '')
});

const mapDispatchToProps = dispatch => ({
  setPassword: password => dispatch(setPassword(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);