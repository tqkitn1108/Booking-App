import "./navbar.css";
import {
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const authContext = useAuth();
    const { user } = authContext;
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
                    {user ? user.fullName : (
                        <div className="nav-items">
                            <button className="nav-button" onClick={() => navigate("/signup")}>Đăng ký</button>
                            <button className="nav-button" onClick={() => navigate("/login")}>Đăng nhập</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar