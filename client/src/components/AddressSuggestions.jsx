import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setAddress} from '../actions/user.js';
import {clear} from '../actions/suggestions.js';

const AddressSuggestions = ({addresses, setAddress, clear, cursor}) => 
  addresses && 
  <div className="address-suggestions">
    <ul>
      {addresses.map((address, i) => <li 
        key={address}
        onClick={() => setAddress(address)}
        className={cursor == i ? 'active': ''}
      >{address}</li>)}
    </ul>
    <div className="clear-suggestions" onClick={clear}>x</div>
  </div>;

AddressSuggestions.propTypes = {
  addresses: PropTypes.array,
  setAddress: PropTypes.func.isRequired,
  clear: PropTypes.func,
  cursor: PropTypes.number
};

const mapStateToProps = state => ({
  addresses: state.getIn(['suggestions', 'addresses'], null),
  cursor: state.getIn(['suggestions', 'cursor'], -1)
});

const mapDispatchToProps = dispatch => ({
  setAddress: address => dispatch(setAddress(address)),
  clear: () => dispatch(clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressSuggestions);