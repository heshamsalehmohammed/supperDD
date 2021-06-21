const initialState = {
  dataList: [],
  uniqueKey: 'Id',
};

function addReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DATA_LIST':
      return {...state, dataList: action.payload.dataList};
    case 'DESELECT_ALL':
      return {
        ...state,
        dataList: state.dataList.map((dl) => ({...dl, isSelected: false})),
      };
    case 'SELECT_ALL':
      return {
        ...state,
        dataList: state.dataList.map((dl) => ({...dl, isSelected: true})),
      };
    case 'SET_UNIQUE_KEY':
      return {
        ...state,
        uniqueKey: action.payload.uniqueKey,
      };
    default:
      return state;
  }
}

export default addReducer;
