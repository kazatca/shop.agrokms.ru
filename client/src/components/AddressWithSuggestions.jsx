import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';

import {setAddress} from '../actions/user.js';
import {getAddresses as getSuggestedAddresses, clear as clearSuggestions} from '../actions/suggestions.js';

export class AddressDummy extends Component{
  static propTypes = {
    address: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
    suggestedAddresses: PropTypes.array,
    loadSuggestions: PropTypes.func,
    clearSuggestions: PropTypes.func
  };

  render(){
    return (
      <Autosuggest 
        suggestions={this.props.suggestedAddresses}
        onSuggestionsFetchRequested={({value}) => this.props.setAddress(value)}
        onSuggestionsClearRequested={() => this.props.clearSuggestions()}
        renderSuggestion={suggestion => (<div>{suggestion.label}</div>)}
        getSuggestionValue={suggestion => suggestion.value}
        inputProps={{
          className: 'address',
          value: this.props.address,
          onChange: (e, {newValue, method}) => {
            if(['type', 'enter', 'click'].indexOf(method) == -1){
              return;
            }
            if(method == 'type'){
              this.props.loadSuggestions(newValue);
            }
            this.props.setAddress(newValue);
          }
        }}/>        
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.get('user').get('address', ''),
    suggestedAddresses: state.getIn(['suggestions', 'addresses'], [])
      .map(item => ({value: item.value, label: item.value}))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddress: address => dispatch(setAddress(address)),
    loadSuggestions: address => dispatch(getSuggestedAddresses(address)),
    clearSuggestions: () => clearSuggestions()
  };
};

const AddressWithSuggestions = connect(mapStateToProps, mapDispatchToProps)(AddressDummy);
export default AddressWithSuggestions;