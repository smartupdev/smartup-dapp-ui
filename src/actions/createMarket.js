import { SET_ACTIVE_INDEX } from './actionTypes';

export function setActiveIndex(changeNumber) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_INDEX,
      changeNumber: changeNumber,
    });
  }
}