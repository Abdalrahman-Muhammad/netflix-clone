export const getListsStart = () => ({
  type: "GET_LISTS_START",
});
export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});
export const getListsFailure = (error) => ({
  type: "GET_LISTS_FAILURE",
  payload: error,
});

export const createListStart = () => ({
  type: "CREATE_LIST_START",
});
export const createListSuccess = (list) => ({
  type: "CREATE_LIST_SUCCESS",
  payload: list,
});
export const createListFailure = (error) => ({
  type: "CREATE_LIST_FAILURE",
  payload: error,
});
export const updateListStart = () => ({
  type: "UPDATE_LIST_START",
});
export const updateListSuccess = (movie) => ({
  type: "UPDATE_LIST_SUCCESS",
  payload: movie,
});
export const updateListFailure = (error) => ({
  type: "UPDATE_LIST_FAILURE",
  payload: error,
});

export const deleteListStart = () => ({
  type: "DELETE_LIST_START",
});

export const deleteListSuccess = (listId) => ({
  type: "DELETE_LIST_SUCCESS",
  payload: listId,
});

export const deleteListFailure = (error) => ({
  type: "DELETE_LIST_FAILURE",
  payload: error,
});
