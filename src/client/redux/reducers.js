import { SET_ARTIST } from './actions';

const initialState = {
  artist: null
};

const setArtist = (state, action) => {
  return Object.assign({}, state, { artist: action.payload });
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTIST:
      return setArtist(state, action);
    default:
      return state;
  }
};

export default rootReducer;
