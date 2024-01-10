import React, { useEffect, useState } from 'react';
import './table.css';
import SplitButton from './SplitButton';
import { differenceInDays } from 'date-fns';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';

const Table = ({ roomTypes }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stayLength = differenceInDays(new Date(searchParams.get('checkOut')), new Date(searchParams.get('checkIn'))) + 1;
  const [selectedRooms, setSelectedRooms] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleReservation = () => {
    if (totalPrice === 0) setShowMessage(true);
    else
      navigate(`${location.pathname}/reservation${location.search}`,
        {
          state: {
            roomList: Object.values(selectedRooms).reduce((result, arr) => result.concat(arr), []).map(room => room.id),
            stayLength,
            totalPrice
          }
        });
  };

  useEffect(() => {
    setTotalPrice(roomTypes?.reduce((sum, roomType) => {
      if (selectedRooms[roomType.id] === undefined) selectedRooms[roomType.id] = [];
      return sum + selectedRooms[roomType.id].length * roomType.pricePerNight * stayLength;
    }, 0));
    setShowMessage(false);
  }, [selectedRooms]);

  return (
    <div className='containerT'>
      <table striped>
        <thead>
          <tr>
            <th>Loại phòng</th>
            <th>Số lượng khách</th>
            <th>Giá cho {stayLength} đêm</th>
            <th>Điều kiện hủy bỏ</th>
            <th>Chọn số lượng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roomTypes?.map((roomType, index) =>
          (<tr key={roomType.id} className='room-row'>
            <div className='Studio'>
              <h1>{roomType.title}</h1>
              {roomType.beds.map((bed, i) => <p key={i}>{bed}<SingleBedIcon /></p>)}
            </div>
            <td>
              {new Array(roomType.capacity).fill(1).map((_, i) => <PersonIcon key={i} />)}
            </td>
            <td>VND {roomType.pricePerNight * stayLength}</td>
            <td width={'200px'}>Hoàn tiền 100% trong vòng 24h sau đặt cọc</td>
            <td width={'100px'}>
              <SplitButton id={roomType.id} setSelectedRooms={setSelectedRooms} />
            </td>
            <td style={{ borderBottomColor: 'white', borderRightColor: 'white', textAlign: 'center', width: '256px' }} >
              {index === 0 && (
                <div className='price'>
                  {totalPrice > 0 && <span>Tổng giá {stayLength} đêm: VND {totalPrice}</span>}
                  {(showMessage && !totalPrice) && <span style={{color: "red"}}>Vui lòng chọn ít nhất một phòng!</span>}
                  <button onClick={handleReservation}>Đặt ngay</button>
                </div>
              )}
            </td>
          </tr>))}

        </tbody>
      </table>
    </div>
  );
};

export default Table;
