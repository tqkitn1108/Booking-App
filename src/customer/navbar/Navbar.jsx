import "./navbar.css";
import "./navbar-responsive.css";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css'; // optional
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
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
    user.userImage ? <img className="nav-user-img" src={user.userImage} /> :
      (<div className="nav-user-img" style={{ backgroundColor, color: "#fff" }}>
        {getInitials(name)}
      </div>)
  );
  const handleLogoutClick = (logoutType) => {
    if (logoutType === 'navigate') {
      // Perform any logout actions if needed
      // For now, let's navigate to the Bookings page
      navigate(`/bookings`);
    } else if (logoutType === 'setUserFalse') {
      authContext.handleLogout();
    }
  };
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <div className="home-navbar">
      <div className="home-nav-container">
        <span className="home-nav-logo" onClick={handleLogoClick}>TravelBK</span>
        {userFullName ? (
          <div className="nav-items">
            <div className="nav-items-icon">
              <div className="nav-icon">VND</div>
              <div className="nav-icon">VN</div>
              <div className="nav-icon">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
              <div className="nav-icon">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <a href="/business/register" className="nav-icon"
                style={{ textDecoration: 'none' }} target="not_blank">
                Đăng chỗ nghỉ của quý vị
              </a>
            </div>
            <HeadlessTippy
              placement="bottom"
              trigger="click"
              interactive="true"
              appendTo={() => document.body}
              render={attrs => (
                <div className="" tabIndex="-1" {...attrs}>
                  <div className="nav-menu-logout">
                    <div className="nav-user-logout" onClick={() => handleLogoutClick('navigate')}>
                      <div className="user-logout-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.541 21.325l-9.588-10a4.923 4.923 0 1 1 6.95-6.976l1.567 1.566a.75.75 0 0 0 1.06 0l1.566-1.566a4.923 4.923 0 0 1 6.963 6.962l-9.6 10.014h1.082zm-1.082 1.038a.75.75 0 0 0 1.082 0l9.59-10.003a6.418 6.418 0 0 0-.012-9.07 6.423 6.423 0 0 0-9.083-.001L11.47 4.854h1.06l-1.566-1.566a6.423 6.423 0 1 0-9.082 9.086l9.577 9.99z"></path></svg>
                      </div>
                      <div className="user-logout-text">Lịch sử đặt phòng</div>
                    </div>
                    <div className="nav-user-logout" onClick={() => handleLogoutClick('setUserFalse')}>
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
        ) :
          (
            <div className="nav-items">
              <div className="nav-items-icon">
                <div className="nav-icon">VND</div>
                <div className="nav-icon">VN</div>
                <div className="nav-icon">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </div>
                <a href="/business/register" className="nav-icon"
                  style={{ textDecoration: 'none' }} target="not_blank">
                  Đăng chỗ nghỉ của quý vị
                </a>
              </div>
              <div className="nav-items-btn">
                <button className="nav-button" onClick={() => navigate("/signup")}>Đăng ký</button>
                <button className="nav-button" onClick={() => navigate("/login")}>Đăng nhập</button>
                <button className="nav-button" onClick={() => navigate("/login")}>
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar