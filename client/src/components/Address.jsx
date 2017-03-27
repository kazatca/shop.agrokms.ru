import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setAddress} from '../actions/user.js';

export class AddressDummy extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired
  };

  render() {
    return (
      <input 
        type="text"
        className="address"
        value={this.props.address}
        onChange={e => this.props.setAddress(e.target.value)}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.get('user').get('address')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddress: address => dispatch(setAddress(address))
  };
};

const Address = connect(mapStateToProps, mapDispatchToProps)(AddressDummy);
export default Address;