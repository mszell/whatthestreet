import { fromJS } from 'immutable';

import { LANES } from '../constants';

const initialState = fromJS({
  id: 0,
  neighborhood: '',
  name: '',
  length: 0,
  area: 0,
  cumulativeArea: 0,
  laneRailParking: {
    id: 0,
    neighborhood: '',
    name: '',
    length: 0,
    area: 0,
    cumulativeArea: 0
  }
});

export default function laneReducer(state = initialState, action) {
  switch (action.type) {
    case LANES.SET_LANE:
      return state
      .set('id', action.id)
      .set('neighborhood', action.neighborhood)
      .set('name', action.name)
      .set('length', action.length)
      .set('area', action.area)
      .set('cumulativeArea', action.cumulativeArea);
    case LANES.SET_LANE_RAILPARKING:
      return state
      .setIn(['laneRailParking','id'], action.id)
      .setIn(['laneRailParking','neighborhood'], action.neighborhood)
      .setIn(['laneRailParking','name'], action.name)
      .setIn(['laneRailParking','length'], action.length)
      .setIn(['laneRailParking','area'], action.area)
      .setIn(['laneRailParking','cumulativeArea'], action.cumulativeArea);
    case LANES.CLEAR_LANE:
      return initialState;
    default:
      return state;
  }
}
