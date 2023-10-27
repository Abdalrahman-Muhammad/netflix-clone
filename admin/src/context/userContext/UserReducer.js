const usersReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS_START":
      return {
        isFetching: true,
        error: false,
        users: [],
      };

    case "GET_USERS_SUCCESS":
      return {
        isFetching: false,
        error: false,
        users: action.payload,
      };

    case "GET_USERS_FAILURE":
      return {
        isFetching: false,
        error: action.payload,
        users: [],
      };

    case "DELETE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "DELETE_USER_SUCCESS":
      return {
        isFetching: false,
        error: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case "DELETE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
export default usersReducer;
