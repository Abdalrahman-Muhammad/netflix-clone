const moviesReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_START":
      return {
        isFetching: true,
        error: false,
        movies: [],
      };
    case "GET_MOVIES_SUCCESS":
      return {
        isFetching: false,
        error: false,
        movies: action.payload,
      };
    case "GET_MOVIES_FAILURE":
      return {
        isFetching: false,
        error: action.payload,
        movies: [],
      };

    case "CREATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
      };

    case "CREATE_MOVIE_SUCCESS":
      return {
        movies: [...state.movies, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case "UPDATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
      };

    case "UPDATE_MOVIE_SUCCESS":
      return {
        movies: state.movies.map(
          (movie) => movie._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case "DELETE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "DELETE_MOVIE_SUCCESS":
      return {
        isFetching: false,
        error: false,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
      };

    case "DELETE_MOVIE_FAILURE":
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
export default moviesReducer;
