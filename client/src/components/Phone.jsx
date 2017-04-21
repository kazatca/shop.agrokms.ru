import React, {Component, PropTypes} from 'react';
import InputMask from 'react-input-mask';
import {connect} from 'react-redux';
import {setPhone} from '../actions/user.js';

export class PhoneDummy extends Component {
  static propTypes = {
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
    mask: PropTypes.string,
    maskChar: PropTypes.string
  };

  render() {
    return (
      <InputMask
        type="text"
        className="phone"
        mask={this.props.mask}
        maskChar={this.props.maskChar}
        value={this.props.phone} 
        onChange={e => this.props.setPhone(e.target.value)} />    
    );
  }
}

const mapStateToProps = state => {
  return {
    phone: state.get('user').get('phone'),
    mask: state.getIn(['settings', 'phone', 'mask'], ''),
    maskChar: state.getIn(['settings', 'phone', 'maskChar'], '_')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhone: phone => dispatch(setPhone(phone))
  };
};

const Phone = connect(mapStateToProps, mapDispatchToProps)(PhoneDummy);
export default Phone;

