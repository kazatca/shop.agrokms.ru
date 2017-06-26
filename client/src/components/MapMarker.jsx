import React from 'react';
import PropTypes from 'prop-types';

const MapMarker = ({text, ...props}) => <p className="marker" {...props}>{text}</p>;

MapMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default MapMarker;