import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Explore from "../../components/explore/Explore";
import PropertyType from "../../components/property-type/PropertyType";
import Trending from "../../components/trending/Trending";
import TripPlanner from "../../components/trip-planner/TripPlanner";
import FeaturedHome from "../../components/featuredHome/FeaturedHome";
import "./home.css"
import {
    faUmbrellaBeach,
    faMountainSun,
    faCity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="home">
                <div className="home-container">
                    <h1 className="home-title">Tìm theo loại chỗ nghỉ ở Hà Nội</h1>
                    <PropertyType />
                    <h1 className="home-title">Điểm đến đang thịnh hành</h1>
                    <h3 className="home-describe">Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này</h3>
                    <Trending />
                    <h1 className="home-title">Khám phá Việt Nam</h1>
                    <h3 className="home-describe">Các điểm đến phổ biến này có nhiều điều chờ đón bạn</h3>
                    <Explore />
                    <h1 className="home-title">Lên kế hoạch dễ dàng và nhanh chóng</h1>
                    <h3 className="home-describe">Khám phá các điểm đến hàng đầu theo cách bạn thích ở Việt Nam</h3>
                    <div className="choices">
                        <div className="choice-item border">
                            <FontAwesomeIcon icon={faUmbrellaBeach} />
                            <div className="choice-item-text">Bãi biển</div>
                        </div>
                        <div className="choice-item">
                            <FontAwesomeIcon icon={faMountainSun} />
                            <div className="choice-item-text">Thiên nhiên</div>
                        </div>
                        <div className="choice-item">
                            <FontAwesomeIcon icon={faCity} />
                            <div className="choice-item-text">Thành phố</div>
                        </div>
                    </div>
                    <TripPlanner />
                    <FeaturedHome />
                </div>
            </div>
        </div>
    )
}

export default Home