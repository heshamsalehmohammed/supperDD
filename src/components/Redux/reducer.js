const initialState = {};

function addReducer(state = initialState, action) {
  const GlobalUniqueId = action?.payload?.GlobalUniqueId;
  switch (action.type) {
    case 'UPDATE_DATA_LIST':
      return {
        ...state,
        [GlobalUniqueId]: {
          ...state[GlobalUniqueId],
          dataList: action.payload.dataList,
        },
      };
    case 'DESELECT_ALL':
      return {
        ...state,
        [GlobalUniqueId]: {
          ...state[GlobalUniqueId],
          dataList: state[GlobalUniqueId].dataList.map((dl) => ({
            ...dl,
            isSelected: false,
          })),
        },
      };
    case 'SELECT_ALL':
      return {
        ...state,
        [GlobalUniqueId]: {
          ...state[GlobalUniqueId],
          dataList: state[GlobalUniqueId].dataList.map((dl) => ({
            ...dl,
            isSelected: true,
          })),
        },
      };
    case 'SET_UNIQUE_KEY':
      return {
        ...state,
        [GlobalUniqueId]: {
          ...state[GlobalUniqueId],
          uniqueKey: action.payload.uniqueKey,
        },
      };
    default:
      return state;
  }
}

export default addReducer;
