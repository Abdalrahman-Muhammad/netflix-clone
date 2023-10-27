import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import "./listItem.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movies/find/${item}`, {
          headers: {
            token:
              "Bearer" +
              " " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzNmOWNkMWI3ZmQxMzAxZDVjOGJjMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5Nzk3MjI5MCwiZXhwIjoxNjk4NDA0MjkwfQ.UGyVXplgXrMs8SaVyvMwCC4G1couPVlE28TMv4cL8sI",
          },
        });

        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);
  return (
    movie && (
      <Link to="/watch" state={movie}>
        <div
          style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="listItem"
        >
          <img src={movie.img} alt="" />
          {isHovered && (
            <>
              <video src={movie.trailer} autoPlay={true} loop />
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrow className="icon" />
                  <Add className="icon" />
                  <ThumbUpAltOutlined className="icon" />
                  <ThumbDownAltOutlined className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <span className="limit">+{movie.limit}</span>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">{movie.desc}</div>
                <div className="genre">{movie.genre}</div>
              </div>
            </>
          )}
        </div>
      </Link>
    )
  );
};
export { ListItem };
