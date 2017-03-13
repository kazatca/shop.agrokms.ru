import React, {Component, PropTypes} from 'react';

export default class Money extends Component {

  static propTypes = {
    validate: (props) => {
      if (props.format && !/:money/.test(props.format)) {
        return new Error('Invalid money format');
      }
    },
    format: PropTypes.string,
    children: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    format: ':money р.',
    className: ''
  };

  format(){
    return this.props.format.replace(/:money/, this.props.children);
  }

  render() {
    return (
      <div className={`money ${this.props.className}`}>
        {this.format()}
      </div>
    );
  }
}

