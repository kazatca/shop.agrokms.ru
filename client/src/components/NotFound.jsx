import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {set as setStatus} from '../actions/status.js';

class NotFound extends Component {
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

export default connect(null, mapDispatchToProps)(NotFound);