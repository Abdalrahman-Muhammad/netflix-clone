import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";
import { BASE_URL } from "../../constants/urls";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
