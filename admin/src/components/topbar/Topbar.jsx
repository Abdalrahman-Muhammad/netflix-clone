import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext.js";
import { logout } from "../../context/authContext/AuthAction.js";
import {
  Language,
  Logout,
  NotificationsNone,
  Settings,
} from "@mui/icons-material";
import "./topbar.css";
export const Topbar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">En</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <Logout
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            />
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="topAvatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
