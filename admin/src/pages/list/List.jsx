import { Link, useLocation } from "react-router-dom";
import "./list.css";
import { useState } from "react";

export const List = () => {
  // const { dispatch } = useContext(MoviesContext);
  const { state } = useLocation();
  const [list, setList] = useState(state);

  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder={list.title}
            />
            <label>type</label>
            <input
              type="text"
              name="year"
              onChange={handleChange}
              placeholder={list.type}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              onChange={handleChange}
              placeholder={list.genre}
            />
          </div>
          <div className="productFormRight">
            <button onClick={handleSubmit} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
