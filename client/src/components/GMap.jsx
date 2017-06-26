import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import {connect} from 'react-redux';

import {getStores} from '../selectors/stores.js';
import MapMarker from './MapMarker.jsx';

// next props are exposed at maps
// "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
// "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
// "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
// "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
// "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
const createMapOptions = maps => ({
  zoomControlOptions: {
    position: maps.ControlPosition.RIGHT_CENTER,
    style: maps.ZoomControlStyle.SMALL
  },
  mapTypeControlOptions: {
    position: maps.ControlPosition.TOP_RIGHT
  },
  mapTypeControl: true
});

const GMap = ({center, zoom, markers, apiKey}) =>
  <div className="map">
    <GoogleMap
      bootstrapURLKeys={{
        key: apiKey,
        language: 'ru'    
      }}
      center={center}
      options={createMapOptions}
      defaultZoom={zoom}
    >
      {markers.map(marker => <MapMarker key={marker.text} {...marker}/>)}
    </GoogleMap>
  </div>;

GMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  zoom: PropTypes.number,
  markers: PropTypes.array,
  apiKey: PropTypes.string.isRequired
};

GMap.defaultProps = {
  center: {lat: 50.570747, lng: 137.016390},
  zoom: 14,
  markers: []
};

const mapStateToProps = state => ({
  apiKey: state.getIn(['settings', 'gmap', 'apiKey']),
  markers: getStores(state)
});

export default connect(mapStateToProps)(GMap);

