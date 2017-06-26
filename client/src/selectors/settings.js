import {createSelector} from 'reselect';

export const getSettings = createSelector(
  [
    (state, path) => state.getIn(['settings'].concat(path))
  ],
  settings => {
    if(!settings){
      return settings;
    }
    return settings.toJS();
  }
);