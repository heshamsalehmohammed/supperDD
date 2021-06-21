import {UPDATE_DATA_LIST, SELECT_ALL, DESELECT_ALL ,SET_UNIQUE_KEY} from './actionTypes';

export function updateDataList(dataList) {
  return {
    type: UPDATE_DATA_LIST,
    payload: {
      dataList: dataList,
    },
  };
}

export function deselectAll() {
  return {
    type: DESELECT_ALL,
  };
}

export function selectAll() {
  return {
    type: SELECT_ALL,
  };
}


export function setUniqueKey(uniqueKey){
  return {
    type: SET_UNIQUE_KEY,
    payload: {
      uniqueKey: uniqueKey,
    },
  };
}