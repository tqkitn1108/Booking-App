import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useParams } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import api from "../../../api/AxiosConfig";

const Sidebar = ({ hideSideBar }) => {
  const { dispatch } = useContext(DarkModeContext);
  const { hotelId } = useParams();
  const [hotelImg, setHotelImg] = useState("");
  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/business/hotels/${hotelId}`);
        setHotelImg(response.data.photos[0])
        setHotelName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    }
    if (hotelId) {
      loadData();
    }
  }, []);
  return (
    <div className="sidebar">
      <div className="top">
        {hideSideBar ?
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Booking.com</span>
          </Link> : (
            <div className="avatar-with-hotelName">
              <img className="avatar" src={hotelImg} alt="Avatar" />
              <div className="hotelName">{hotelName}</div>
            </div>
          )
        }
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/business/hotels" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          {!hideSideBar && (
            <>
              <p className="title">LISTS</p>
              <Link to="/business/bookings" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Đặt phòng</span>
                </li>
              </Link>
              <Link to="/business/hotels" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Hotels</span>
                </li>
              </Link>
              <Link to="/business/rooms" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Rooms</span>
                </li>
              </Link>
              <li>
                <LocalShippingIcon className="icon" />
                <span>Delivery</span>
              </li>
              <p className="title">USEFUL</p>
              <li>
                <InsertChartIcon className="icon" />
                <span>Stats</span>
              </li>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Notifications</span>
              </li>
            </>)}
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
