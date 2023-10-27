import { Visibility } from "@mui/icons-material";
import "./widgetSm.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
export const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users?new=true`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzNmOWNkMWI3ZmQxMzAxZDVjOGJjMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5Nzk3MjI5MCwiZXhwIjoxNjk4NDA0MjkwfQ.UGyVXplgXrMs8SaVyvMwCC4G1couPVlE28TMv4cL8sI",
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((newUser) => (
          <li className="widgetSmListItem" key={newUser._id}>
            <img
              src={
                newUser.profilePic ||
                "https://pngset.com/images/person-placeholder-image-free-stencil-balloon-electronics-text-transparent-png-1450459.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">{newUser.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
