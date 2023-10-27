import axios from "axios";
import {
  getMoviesStart,
  getMoviesFailure,
  getMoviesSuccess,
  deleteMovieStart,
  deleteMovieFailure,
  deleteMovieSuccess,
  createMovieStart,
  createMovieFailure,
  createMovieSuccess,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
} from "./MovieActions";
import { BASE_URL } from "../../constants/urls";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get(`${BASE_URL}/movies`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure(error));
  }
};

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());

  try {
    const res = await axios.post(`${BASE_URL}/movies`, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailure(error));
  }
};
export const updateMovie = async (movie, dispatch) => {
  dispatch(updateMovieStart());

  try {
    const res = await axios.put(`${BASE_URL}/movies/${movie._id}`, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
      },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (error) {
    dispatch(updateMovieFailure(error));
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete(`${BASE_URL}/movies/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure(error));
  }
};
