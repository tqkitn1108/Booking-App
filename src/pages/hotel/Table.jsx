import React, { useState } from 'react';
import './table.css';
import SplitButton from './SplitButton';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
const Table = ({ roomTypes }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {

    console.log(`Option clicked: ${option}`);
    // You can perform additional actions based on the selected option
  };

  return (
    <div className='containerT'>
      <table striped>
        <thead>
          <tr>
            <th>Loại phòng</th>
            <th>Số lượng khách</th>
            <th>Giá cho 2 đêm </th>
            <th>Điều kiện hủy bỏ</th>
            <th>Chọn số lượng</th>
            <th>Đặt ngay</th>
          </tr>
        </thead>
        <tbody>
          {roomTypes?.map((roomType, index) =>
          (<tr key={index}>
            <div className='Studio'>
              <h1>{roomType.title}</h1>
              {roomType.beds.map((bed, i) => <p key={i}>{bed}<SingleBedIcon /></p>)}
            </div>
            <td>
              {new Array(roomType.capacity).fill(1).map((_, i) => <PersonIcon key={i} />)}
            </td>
            <td>VND {roomType.pricePerNight}</td>
            <td>Hoàn tiền 100% trong vòng 24h sau đặt cọc</td>
            <td>
              <SplitButton noRooms={roomType.rooms.length}/>
            </td>
            <td  style={{ borderBottomColor: index < roomType.length -1  ? 'your-desired-color' : 'white' }} >
            
            {index === 0 && (
              <button>Đặt ngay</button>
            )}
          </td>
          </tr>))}
     
        </tbody>
      </table>
    </div>
  );
};

export default Table;
