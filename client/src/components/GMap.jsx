import React, {Component, PropTypes} from 'react';
import GoogleMap from 'google-map-react';

const Marker = ({text}) => <p className="marker">{text}</p>;
Marker.propTypes = {
  text: PropTypes.string
};

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

class GMap extends Component {
  static propTypes = {
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    zoom: PropTypes.number,
    markers: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      text: PropTypes.string
    }))
  };

  static defaultProps = {
    center: {lat: 50.570747, lng: 137.016390},
    zoom: 14,
    markers: []
  };

  render() {
    return (
      <div className="map">
        <GoogleMap
          bootstrapURLKeys={{
            /* eslint-disable */
            key: process.env.GMAP_KEY,
            /* eslint-enable */
            language: 'ru'    
          }}
          center={this.props.center}
          options={createMapOptions}
          defaultZoom={this.props.zoom}
        >
          {this.props.markers.map(marker => <Marker key={marker.text} {...marker}/>)}
        </GoogleMap>
      </div>
    );
  }
}

export default GMap;