import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetch} from './actions/remote.js';
import {get} from './api.js';

export default (url, params = {}) => Inner => {
  class HOC extends Component{
    static propTypes = {
      fetch: PropTypes.func.isRequired
    }
    componentWillMount(){
      this.props.fetch();
    }

    render(){
      const {fetch, ...props} = this.props;  // eslint-disable-line no-unused-vars
      return <Inner {...props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetch(url, params))
  });

  return connect(null, mapDispatchToProps)(HOC);
}; 

export const fetcher = store => next => action => {
  get(action.url);
  return next(action);
};