// ACTION TYPES

export const SET_ARTIST = 'SET_ARTIST';

// ACTION CREATORS

export function setArtist(artistInfo) {
  return {
    type: SET_ARTIST,
    payload: artistInfo
  };
}
