import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setName} from '../actions/user.js';

export const UserName = ({name, setName}) =>
  <input 
    type="text"
    className="username"
    value={name} 
    onChange={({target}) => setName(target.value)} />;

UserName.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  name: state.getIn(['user', 'name'])
});

const mapDispatchToProps = dispatch => ({
  setName: name => dispatch(setName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserName);

