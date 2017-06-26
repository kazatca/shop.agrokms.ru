import React from 'react';
import PropTypes from 'prop-types';

const format = (formatString, value) => formatString.replace(/:money/, (value/100).toFixed(0));

const Money = ({formatString, children, className}) =>
  <div className={`money ${className}`}>
    {format(formatString, children)}
  </div>;

Money.propTypes = {
  validate: ({formatString}) => {
    if(!/:money/.test(formatString)) {
      return new Error('Invalid money formatString. Placeholder :money not found.');
    }
  },
  formatString: PropTypes.string,
  children: PropTypes.number.isRequired,
  className: PropTypes.string
};

Money.defaultProps = {
  formatString: ':money р.',
  className: ''
};

export default Money;