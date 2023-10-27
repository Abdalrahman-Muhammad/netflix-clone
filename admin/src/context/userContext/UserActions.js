export const getUsersStart = () => ({
  type: "GET_USERS_START",
});
export const getUsersSuccess = (users) => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});
export const getUsersFailure = (error) => ({
  type: "GET_USERS_FAILURE",
  payload: error,
});

export const deleteUserStart = () => ({
  type: "DELETE_USER_START",
});

export const deleteUserSuccess = (userId) => ({
  type: "DELETE_USER_SUCCESS",
  payload: userId,
});

export const deleteUserFailure = (error) => ({
  type: "DELETE_USER_FAILURE",
  payload: error,
});
