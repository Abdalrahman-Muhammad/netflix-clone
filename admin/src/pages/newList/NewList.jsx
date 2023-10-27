import { useContext, useEffect, useState } from "react";
import "./newList.css";

import storage from "../../firebase";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";

import { ListContext } from "../../context/listContext/ListContext";
import { MoviesContext } from "../../context/movieContext/MovieContext";
import { createList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

export const NewList = () => {
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MoviesContext);
  // const storage = getStorage();
  const [list, setList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);
  console.log(movies);
  const handleChange = (e) => {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({
      ...list,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" id="type" onClick={handleChange}>
              <option>type</option>
              <option value="movie">movie</option>
              <option value="series">series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>content</label>
            <select
              multiple
              name="content"
              id="content"
              onClick={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleSubmit} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
};
