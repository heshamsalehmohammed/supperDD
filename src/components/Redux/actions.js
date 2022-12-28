import {UPDATE_DATA_LIST, SELECT_ALL, DESELECT_ALL ,SET_UNIQUE_KEY} from './actionTypes';

export function updateDataList(dataList,GlobalUniqueId) {
  return {
    type: UPDATE_DATA_LIST,
    payload: {
      dataList,
      GlobalUniqueId
    },
  };
}

export function deselectAll(GlobalUniqueId) {
  return {
    type: DESELECT_ALL,
    payload: {
      GlobalUniqueId
    },
  };
}

export function selectAll(GlobalUniqueId) {
  return {
    type: SELECT_ALL,
    payload: {
      GlobalUniqueId
    },
  };
}


export function setUniqueKey(uniqueKey){
  return {
    type: SET_UNIQUE_KEY,
    payload: {
      uniqueKey,
    },
  };
}