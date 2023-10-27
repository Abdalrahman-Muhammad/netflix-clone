import axios from "axios";

import { BASE_URL } from "../../constants/urls";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(`${BASE_URL}/lists`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    dispatch(getListsFailure(error));
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());

  try {
    const res = await axios.post(`${BASE_URL}/lists`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (error) {
    dispatch(createListFailure(error));
  }
};
// export const updateMovie = async (movie, dispatch) => {
//   dispatch(updateMovieStart());

//   try {
//     const res = await axios.put(`${BASE_URL}/movies/${movie._id}`, movie, {
//       headers: {
//         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
//       },
//     });
//     dispatch(updateMovieSuccess(res.data));
//   } catch (error) {
//     dispatch(updateMovieFailure(error));
//   }
// };

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete(`${BASE_URL}/lists/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure(error));
  }
};
