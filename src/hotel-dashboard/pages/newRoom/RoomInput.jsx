import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ModalBootstrap from "../../../components/modal/ModalBootstrap";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import api from "../../../api/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const RoomInput = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [bedList, setBedList] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => room.trim());
    const beds = bedList.split(",").map((bed) => bed.trim());
    try {
      console.log({ ...info, rooms, amenities, beds });
      await api.post(`/hotels/${hotelId}/roomTypes`, { ...info, roomNumbers, amenities, beds });
      setModalMessage('Thành công! Quay trở lại trang khách sạn.');
    } catch (err) {
      setModalMessage(err.response);
    }
    setShowModal(true);
  };

  const handleSelectChange = (event) => {
    const options = event.target.options;
    const selectedOptionsArray = Array.from(options).filter((option) => option.selected);
    const selectedValues = selectedOptionsArray.map((option) => option.value);
    setAmenities(selectedValues);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`/business/hotels/${hotelId}`);
  };

  return (
    <div className="new">
      <ModalBootstrap body={modalMessage} showModal={showModal} handleCloseModal={handleCloseModal} />
      <Sidebar hideSideBar={false} />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Kiểu giường</label>
                <input
                  id="beds"
                  type="text"
                  placeholder={"1 king bed, 2 queen beds"}
                  onChange={(e) => setBedList(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Các tiện ích</label>
                <select id="amenities" multiple onChange={handleSelectChange} className="multi-select">
                  <option value={"Ban công"}>Ban công</option>
                  <option value={"Nhìn ra vườn"}>Nhìn ra vườn</option>
                  <option value={"free_wifi"}>Nhìn ra núi</option>
                  <option value={"free_wifi"}>Nhìn ra địa danh nổi tiếng</option>
                  <option value={"free_wifi"}>Nhìn ra thành phố</option>
                  <option value={"free_wifi"}>Điều hòa không khí</option>
                  <option value={"free_wifi"}>Máy pha cà phê</option>
                  <option value={"free_wifi"}>Bồn tắm spa</option>
                </select>
              </div>
              <div className="formInput">
                <label>Danh sách phòng cùng loại</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Các phòng nhập cách nhau bởi dấu phẩy: VD: B101, A202"
                />
              </div>
              <button onClick={handleClick}>Gửi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInput;
