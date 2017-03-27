import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setPhone} from '../actions/user.js';

export class PhoneDummy extends Component {
  static propTypes = {
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired
  };

  render() {
    return (
      <input 
        type="text"
        className="phone"
        value={this.props.phone} 
        onChange={e => this.props.setPhone(e.target.value)} />    
    );
  }
}

const mapStateToProps = state => {
  return {
    phone: state.get('user').get('phone')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhone: phone => dispatch(setPhone(phone))
  };
};

const Phone = connect(mapStateToProps, mapDispatchToProps)(PhoneDummy);
export default Phone;

