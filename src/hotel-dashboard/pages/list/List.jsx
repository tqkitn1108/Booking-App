import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import RoomsDatatable from "../../components/datatable/RoomsDatatable"
import PendingDatatable from "../../components/datatable/PendingDatatable"
import BookingList from "../../components/table/Table"
import { useLocation } from "react-router-dom"

const List = ({ columns, hideSideBar }) => {
  let isHotelList = false;
  let isRoomList = false;
  let isPendingList = false;
  let isBookingList = false;
  const location = useLocation();
  const path = location.pathname;

  if (path.endsWith("hotels")) isHotelList = true;
  else if (path.endsWith("rooms")) isRoomList = true;
  else if (path.endsWith("pending")) isPendingList = true;
  else if (path.endsWith("bookings")) isBookingList = true;
  return (
    <div className="list">
      <Sidebar hideSideBar={hideSideBar} />
      <div className="listContainer">
        <Navbar />
        {isHotelList && <Datatable columns={columns} />}
        {isRoomList && <RoomsDatatable columns={columns} />}
        {isPendingList && <PendingDatatable columns={columns} />}
        {isBookingList && (
          <div className="single">
            <div className="singleContainer">
              <div className="bottom">
                <h1 className="title">Các đặt phòng mới nhất</h1>
                <BookingList />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List