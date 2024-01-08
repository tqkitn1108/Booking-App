import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import RoomsDatatable from "../../components/datatable/RoomsDatatable"
import BookingsDatatable from "../../components/datatable/BookingsDatatable"
import { useLocation } from "react-router-dom"

const List = ({ columns, hideSideBar }) => {
  let isHotelList = false;
  let isRoomList = false;
  let isBookingList = false;
  const location = useLocation();
  const path = location.pathname;

  if (path.endsWith("hotels")) isHotelList = true;
  else if (path.endsWith("rooms")) isRoomList = true;
  else if (path.endsWith("bookings")) isBookingList = true;
  return (
    <div className="list">
      <Sidebar hideSideBar={hideSideBar} />
      <div className="listContainer">
        <Navbar />
        {isHotelList && <Datatable columns={columns} />}
        {isRoomList && <RoomsDatatable columns={columns} />}
        {isBookingList && <BookingsDatatable columns={columns} />}
      </div>
    </div>
  )
}

export default List