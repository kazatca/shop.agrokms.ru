import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {setName} from '../actions/user.js';

export class UserNameDummy extends Component{
  static propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired
  };

  render(){
    return (
      <input 
        type="text"
        className="username"
        value={this.props.name} 
        onChange={e => this.props.setName(e.target.value)} />
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.get('user').get('name')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch(setName(name))
  };
};

const UserName = connect(mapStateToProps, mapDispatchToProps)(UserNameDummy);
export default UserName;

