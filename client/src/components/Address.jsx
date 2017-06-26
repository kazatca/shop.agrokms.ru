import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setAddress} from '../actions/user.js';

const Address = ({address, setAddress}) =>
  <input 
    type="text"
    className="address"
    value={address}
    onChange={e => setAddress(e.target.value)}/>;

Address.propTypes = {
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  address: state.getIn(['user', 'address'])
});

const mapDispatchToProps = dispatch => ({
  setAddress: address => dispatch(setAddress(address))
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
