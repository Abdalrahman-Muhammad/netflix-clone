import { Link, useLocation } from "react-router-dom";
import "./movie.css";

import { Upload } from "@mui/icons-material";
import { useState } from "react";
import storage from "../../firebase";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MoviesContext } from "../../context/movieContext/MovieContext";

export const Movie = () => {
  const { dispatch } = useContext(MoviesContext);
  // const { movieId: id } = useParams();
  const { state } = useLocation();

  const [movie, setMovie] = useState(state);

  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  // const upload = (items) => {
  //   items.forEach((item) => {
  //     const fileName = new Date().getTime() + item.label + item.file.name;
  //     const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
  //           setMovie((prev) => {
  //             return { ...prev, [item.label]: url };
  //           });
  //           setUploaded((prev) => prev + 1);
  //         });
  //       }
  //     );
  //   });
  // };
  const upload = (items) => {
    items.forEach((item) => {
      if (item && item.file && item.label) {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setMovie((prev) => {
                return { ...prev, [item.label]: url };
              });
              setUploaded((prev) => prev + 1);
            });
          }
        );
      } else {
        console.log("Invalid item:", item);
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie, dispatch);
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={state.img} alt="" className="productInfoImg" />
            <span className="productName">{state.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{state._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{state.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">years:</span>
              <span className="productInfoValue">{state.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{state.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={state.title}
            />
            <label>Movie Description</label>
            <input
              type="text"
              name="desc"
              onChange={handleChange}
              value={state.desc}
            />
            <label>Year</label>
            <input
              type="text"
              name="year"
              onChange={handleChange}
              value={state.year}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              onChange={handleChange}
              value={state.genre}
            />
            <label>Limit</label>
            <input
              type="text"
              name="limit"
              onChange={handleChange}
              value={state.limit}
            />
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              placeholder={state.trailer}
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              name="video"
              placeholder={state.video}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={state.img} alt="" className="productUploadImg" />
              <label className="productUploadLabel" htmlFor="file">
                <Upload />
                <div>Image</div>
              </label>
              <input
                type="file"
                id="file"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="productUpload">
              <img src={state.imgTitle} alt="" className="productUploadImg" />
              <label className="productUploadLabel" htmlFor="imgTitle">
                <Upload />
                <div>Title Image</div>
              </label>
              <input
                type="file"
                name="imgTitle"
                onChange={(e) => setImgTitle(e.target.files[0])}
                id="imgTitle"
                style={{ display: "none" }}
              />
            </div>
            <div className="productUpload">
              <img src={state.imgSm} alt="" className="productUploadImg" />
              <label className="productUploadLabel" htmlFor="imgSm">
                <Upload />
                <div>Thumbnail Image</div>
              </label>
              <input
                name="imgSm"
                onChange={(e) => setImgSm(e.target.files[0])}
                type="file"
                id="imgSm"
                style={{ display: "none" }}
              />
            </div>
            {uploaded === 5 ? (
              <button onClick={handleSubmit} className="productButton">
                Update
              </button>
            ) : (
              <button onClick={handleUpload} className="productButton">
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
