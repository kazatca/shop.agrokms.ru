import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {set as setStatus} from '../actions/status.js';

export class NotFoundDummy extends Component {
  static propTypes = {
    setStatus: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.props.setStatus();
  }

  render() {
    return (<div>not found</div>);
  }
}
const mapDispatchToProps = dispatch => ({
  setStatus: () => dispatch(setStatus(404))
});

const NotFound = connect(null, mapDispatchToProps)(NotFoundDummy);
export default NotFound;