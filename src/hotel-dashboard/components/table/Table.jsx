import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../../../api/AxiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingList = () => {
  const { hotelId } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/bookings/hotels/${hotelId}`);
        setBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell id">Mã đặt phòng</TableCell>
            <TableCell className="tableCell">Người đặt</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Ngày nhận phòng</TableCell>
            <TableCell className="tableCell">Ngày trả phòng</TableCell>
            <TableCell className="tableCell">Danh sách phòng</TableCell>
            <TableCell className="tableCell">Giá (VND)</TableCell>
            <TableCell className="tableCell">Phương thức thanh toán</TableCell>
            <TableCell className="tableCell status-column">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="tableCell">{booking.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img className="image" src={booking.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
                  {booking.fullName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{booking.email}</TableCell>
              <TableCell className="tableCell">{booking.checkInDate}</TableCell>
              <TableCell className="tableCell">{booking.checkOutDate}</TableCell>
              <TableCell className="tableCell">{booking.rooms.map(room => room.roomNumber).join(", ")}</TableCell>
              <TableCell className="tableCell">{booking.totalPrice.toLocaleString('vi-VN')}</TableCell>
              <TableCell className="tableCell">Thanh toán tại chỗ nghỉ</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${booking.bookingStatus}`}>{booking.bookingStatus}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingList;
