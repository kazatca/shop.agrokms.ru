/* global $ */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setAddress} from '../actions/user.js';

export class AddressDadataDummy extends Component{
  static propTypes = {
    address: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
    dadata_key: PropTypes.string.isRequired
  };
  
  componentDidMount(){
    $(this.refs.address).suggestions({
      token: this.props.dadata_key,
      type: 'ADDRESS',
      constraints: {
        locations: { kladr_id: "2701000000000" },
        deletable: false
      },
      restrict_value: false,
      count: 5,
      onSelect: res => console.log(res)
    });
  }

  render(){
    return (
      <input 
        type="text"
        ref="address"
        className="address"
        value={this.props.address}
        onChange={e => this.props.setAddress(e.target.value)}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.get('user').get('address'),
    dadata_key: state.getIn(['creds', 'dadata_key'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddress: address => dispatch(setAddress(address))
  };
};

const AddressDadata = connect(mapStateToProps, mapDispatchToProps)(AddressDadataDummy);
export default AddressDadata;