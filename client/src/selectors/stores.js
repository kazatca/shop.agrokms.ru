import {createSelector} from 'reselect';

const getStores = state => state.get('stores');

export const getMarkers = createSelector(
  [getStores],
  stores => stores.map(store => {
    const [lat, lng] = store.coords.split(',').map(value => value.trim()*1);
    return {
      text: store.address,
      lat,
      lng
    };
  }).toArray()
);
