import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setPassword} from '../actions/user.js';

export class PasswordDummy extends Component {
  static propTypes = {
    password: PropTypes.string,
    setPassword: PropTypes.func
  };

  render() {
    return (
      <div>
        <input 
          type="password" 
          className="password"
          value={this.props.password} 
          onChange={e => this.props.setPassword(e.target.value)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    password: state.getIn(['user', 'password'], '')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPassword: password => dispatch(setPassword(password))
  };
};

const Password = connect(mapStateToProps, mapDispatchToProps)(PasswordDummy);
export default Password;