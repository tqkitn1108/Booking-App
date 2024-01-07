import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import BookingList from "../../components/table/Table";
import api from "../../../api/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Single = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    async function renderHotelDetails() {
      try {
        const response = await api.get(`/business/hotels/${hotelId}`);
        setHotel(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    renderHotelDetails();
  }, [])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => navigate(`/business/hotels/form?hotelId=${hotelId}`)}>Chỉnh sửa thông tin</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={hotel.photos?.[0]}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{hotel.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{hotel.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{hotel.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{hotel.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Việt Nam</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Các đặt phòng gần đây</h1>
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default Single;
