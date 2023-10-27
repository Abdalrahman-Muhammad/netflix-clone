const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS_START":
      return {
        isFetching: true,
        error: false,
        lists: [],
      };
    case "GET_LISTS_SUCCESS":
      return {
        isFetching: false,
        error: false,
        lists: action.payload,
      };
    case "GET_LISTS_FAILURE":
      return {
        isFetching: false,
        error: action.payload,
        lists: [],
      };

    case "CREATE_LIST_START":
      return {
        ...state,
        isFetching: true,
      };

    case "CREATE_LIST_SUCCESS":
      return {
        lists: [...state.lists, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case "UPDATE_LIST_START":
      return {
        ...state,
        isFetching: true,
      };

    case "UPDATE_LIST_SUCCESS":
      return {
        lists: state.lists.map(
          (list) => list._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case "DELETE_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "DELETE_LIST_SUCCESS":
      return {
        isFetching: false,
        error: false,
        lists: state.lists.filter((list) => list._id !== action.payload),
      };

    case "DELETE_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default: {
      return { ...state };
    }
  }
};
export default ListReducer;
