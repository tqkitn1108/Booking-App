import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import HeadlessTippy from '@tippyjs/react/headless';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const authContext = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userFullName, setUserFullName] = useState(user?.userFullName);

  const getInitials = (name) => {
    const firstWord = name.split(' ')[0];
    return firstWord ? firstWord[0].toUpperCase() : '';
  };
  const getRandomColor = () => {
    const predefinedColors = ["#b16e4b", "#f24444", "#f39c12", "#1abc9c", "#f35ea3"];

    const randomColorIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomColorIndex];
  };
  const avatarBackgroundColor = getRandomColor();

  const renderAvatar = (name, backgroundColor) => (
    <div className="nav-user-img" style={{ backgroundColor, color: "#fff" }}>
      {getInitials(name)}
    </div>
  );
  const handleLogoutClick = () => {
    authContext.handleLogout();
  };

  return (
    <div className="business-navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <HeadlessTippy
              placement="bottom"
              trigger="click"
              interactive="true"
              appendTo={() => document.body}
              render={attrs => (
                <div className="" tabIndex="-1" {...attrs}>
                  <div className="nav-menu-logout">
                    <div className="nav-user-logout" onClick={() => handleLogoutClick()}>
                      <div className="user-logout-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M1.19 66.83l20 20a4.002 4.002 0 1 0 5.66-5.66L13.67 68H88a4 4 0 0 0 0-8H13.67l13.18-13.17a4.002 4.002 0 1 0-5.66-5.66l-20 20c-.183.186-.35.387-.5.6 0 0 0 .11-.08.16a3 3 0 0 0-.28.53 2.25 2.25 0 0 0-.08.24 3 3 0 0 0-.15.51 3.94 3.94 0 0 0 0 1.58c.036.174.086.344.15.51.022.081.049.162.08.24.076.182.17.357.28.52 0 .06.05.11.08.16.15.216.317.42.5.61zm31.13 35c20.876 19.722 53.787 18.787 73.509-2.089 14.874-15.743 18.432-39.058 8.931-58.521-10.77-22.12-42-37.41-69.52-24a52 52 0 0 0-12.91 8.93 4.004 4.004 0 0 1-5.49-5.83 60.002 60.002 0 0 1 14.9-10.29C67.26-2.37 106.48 6 122 37.74c14.519 29.787 2.142 65.704-27.645 80.223-22.44 10.938-49.308 6.839-67.465-10.293a4 4 0 0 1 5.48-5.82z"></path></svg>
                      </div>
                      <div className="user-logout-text">Đăng xuất</div>
                    </div>
                  </div>
                </div>
              )}
            >
              <div className="nav-user-button">
                {renderAvatar(userFullName, avatarBackgroundColor)}
                <span className="nav-user-account">{userFullName}</span>
              </div>
            </HeadlessTippy>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
