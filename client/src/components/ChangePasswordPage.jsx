import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Password from './Password.jsx';
import {changePassword} from '../actions/user.js';

export class ChangePasswordPageDummy extends Component {
  static propTypes = {
    changePassword: PropTypes.func
  };

  render(){
    return (
      <div>
        <Password />
        <button onClick={() => this.props.changePassword()}>Изменить пароль</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: () => dispatch(changePassword())
  };
};

const ChangePasswordPage = connect(null, mapDispatchToProps)(ChangePasswordPageDummy);
export default ChangePasswordPage;