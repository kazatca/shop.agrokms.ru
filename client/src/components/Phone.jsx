import React, {Component, PropTypes} from 'react';
import InputMask from 'react-input-mask';
import {connect} from 'react-redux';
import {setPhone} from '../actions/user.js';

export const mask = (mask, phone) => {
  phone = phone.split('');
  return mask
    .split('')
    .reduce((result, wc) => result.concat(wc == '9'? [phone.shift()]: [wc]), [])
    .concat(phone)
    .join('');
};

export const unmask = (mask, phone) => {
  phone = phone.split('');
  return mask
    .split('')
    .reduce((result, wc) => {
      const value = phone.shift();
      return result.concat(wc == '9'? [value]: []);
    }, [])
    .concat(phone)
    .join('');
};

export class PhoneDummy extends Component {
  static propTypes = {
    phone: PropTypes.string,
    setPhone: PropTypes.func.isRequired,
    mask: PropTypes.string,
    maskChar: PropTypes.string
  };

  static defaultProps = {
    phone: '',
    mask: '',
    maskChar: '_'
  };

  mask(phone){
    return mask(this.props.mask, phone);
  }

  unmask(phone){
    return unmask(this.props.mask, phone);
  }

  render() {
    return (
      <InputMask
        type="text"
        className="phone"
        mask={this.props.mask}
        maskChar={this.props.maskChar}
        value={this.mask(this.props.phone)} 
        onChange={e => this.props.setPhone(this.unmask(e.target.value))} />    
    );
  }
}

const mapStateToProps = state => {
  return {
    phone: state.get('user').get('phone', PhoneDummy.defaultProps.phone),
    mask: state.getIn(['settings', 'phone', 'mask'], PhoneDummy.defaultProps.mask),
    maskChar: state.getIn(['settings', 'phone', 'maskChar'], PhoneDummy.defaultProps.maskChar)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhone: phone => dispatch(setPhone(phone))
  };
};

const Phone = connect(mapStateToProps, mapDispatchToProps)(PhoneDummy);
export default Phone;

