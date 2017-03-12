import React, {Component, PropTypes} from 'react';

export default class Price extends Component {

  static propTypes = {
    validate: (props) => {
      if (props.format && !/:price/.test(props.format)) {
        return new Error('Invalid price format');
      }
    },
    format: PropTypes.string,
    price: PropTypes.number.isRequired
  };

  static defaultProps = {
    format: ':price р.'
  };

  format(){
    return this.props.format.replace(/:price/, this.props.price);
  }

  render() {
    return (
      <div className="price">
        {this.format()}
      </div>
    );
  }
}

