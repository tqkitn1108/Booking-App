import "./navbar.css";
import {
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="home-navbar">
            <div className="home-nav-container">
                <span className="logo">Booking.com</span>
                <div className="nav-items">
                    <div className="nav-icon">VND</div>
                    <div className="nav-icon">VN</div>
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </div>
                    <div className="nav-icon">Đăng chỗ nghỉ của quý vị</div>
                    <button className="nav-button" onClick={() => navigate("/signup")}>Đăng ký</button>
                    <button className="nav-button" onClick={() => navigate("/login")}>Đăng nhập</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar