const initialState = {
  dataList: [],
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
    default:
      return state;
  }
}

export default addReducer;
