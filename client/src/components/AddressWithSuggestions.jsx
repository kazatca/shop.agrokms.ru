import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';

import {setAddress} from '../actions/user.js';
import {
  getAddresses as getSuggestedAddresses, 
  clear as clearSuggestions
} from '../actions/suggestions.js';

const autosuggestProps = {
  renderSuggestion: ({label}) => (<div>{label}</div>),
  getSuggestionValue: ({value}) => value
};

//todo: use store.subscribe or something better for loadSuggestions call
const Address = props =>
  <Autosuggest 
    {...autosuggestProps}
    suggestions={props.suggestions}
    onSuggestionsFetchRequested={({value}) => props.setAddress(value)}
    onSuggestionsClearRequested={props.clearSuggestions}
    inputProps={{
      className: 'address',
      value: props.address,
      onChange: (e, {newValue, method}) => {
        if(['type', 'enter', 'click'].indexOf(method) == -1){
          return;
        }
        if(method == 'type'){
          props.loadSuggestions(newValue);
        }
        props.setAddress(newValue);
      }
    }}/>;

Address.propTypes = {
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  suggestedAddresses: PropTypes.array,
  loadSuggestions: PropTypes.func,
  clearSuggestions: PropTypes.func
};

const mapStateToProps = state => ({
  address: state.getIn(['user', 'address'], ''),
  suggestions: state.getIn(['suggestions', 'addresses'], [])
    .map(item => ({value: item.value, label: item.value}))
});

const mapDispatchToProps = dispatch => ({
  setAddress: address => dispatch(setAddress(address)),
  loadSuggestions: address => dispatch(getSuggestedAddresses(address)),
  clearSuggestions: () => dispatch(clearSuggestions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
