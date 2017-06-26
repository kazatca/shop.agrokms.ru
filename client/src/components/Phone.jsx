import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import {connect} from 'react-redux';

import {setPhone} from '../actions/user.js';

export const mask = (maskString, phone) => {
  phone = phone.split('');
  return maskString
    .split('')
    .reduce((result, wc) => result.concat(wc == '9'? [phone.shift()]: [wc]), [])
    .concat(phone)
    .join('');
};

export const unmask = (maskString, phone) => {
  phone = phone.split('');
  return maskString
    .split('')
    .reduce((result, wc) => {
      const value = phone.shift();
      return result.concat(wc == '9'? [value]: []);
    }, [])
    .concat(phone)
    .join('');
};

export const Phone = ({phone, setPhone, maskString, maskChar}) =>
  <InputMask
    type="text"
    className="phone"
    mask={phone => mask(maskString, phone)}
    maskChar={maskChar}
    value={mask(maskString, phone)} 
    onChange={e => setPhone(unmask(maskString, e.target.value))} />;

Phone.propTypes = {
  phone: PropTypes.string,
  setPhone: PropTypes.func.isRequired,
  maskString: PropTypes.string,
  maskChar: PropTypes.string
};

Phone.defaultProps = {
  phone: '',
  maskString: '',
  maskChar: '_'
};

const mapStateToProps = state => ({
  phone: state.getIn(['user', 'phone'], ''),
  maskString: state.getIn(['settings', 'phone', 'mask'], ''),
  maskChar: state.getIn(['settings', 'phone', 'maskChar'], '_')
});

const mapDispatchToProps = dispatch => ({
  setPhone: phone => dispatch(setPhone(phone))
});

export default connect(mapStateToProps, mapDispatchToProps)(Phone);

