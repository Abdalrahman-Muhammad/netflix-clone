import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./list.scss";
import { ListItem } from "../listItem/ListItem";
import { useRef, useState } from "react";

const List = ({ list }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);

      listRef.current.style.transform = `translateX(${distance - 230}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIos
          style={{ display: !isMoved && "none" }}
          className="sliderArrow left"
          onClick={() => handleClick("left")}
        />
        <div ref={listRef} className="container">
          {list.content.map((item, i) => (
            <ListItem index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIos
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export { List };
