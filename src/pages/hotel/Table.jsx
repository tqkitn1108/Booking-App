import React, {useState} from 'react';
import './Table.css';
import SplitButton from './SplitButton';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
const Table = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    
    console.log(`Option clicked: ${option}`);
    // You can perform additional actions based on the selected option
  };

return(
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
      <tr key="dong1">
        <div className='Studio'>
        <h1>Studio có ban công</h1>
        <p>1 giường đôi lớn<SingleBedIcon/></p>
        </div>
        <td>
        <PersonIcon /> <PersonIcon /> + <PersonIcon/>
        </td>
        <td>VND 2,898,000</td>
        <td>Hoàn tiền 100% trong vòng 24h sau đặt cọc</td>
        <td>
        <SplitButton/>
        </td>
        <td>
          <button>Đặt ngay</button>
        </td>
      </tr>
      <tr key="dong2">
        <div className='Studio'>
        <h1>Căn hộ 1 phòng ngủ</h1>
        <p>1 giường đôi lớn <SingleBedIcon/></p>
        </div>
        <td>
        <PersonIcon /> <PersonIcon /> + <PersonIcon/>
        </td>
        <td>VND 3.118.000</td>
        <td>Hoàn tiền 100% trong vòng 24h sau đặt cọc</td>
        <td>
        <SplitButton/>
        </td>
        <td>
          <button>Đặt ngay</button>
        </td>
      </tr>
      <tr key="dong3">
        <div className='Studio'>
        <h1>Căn hộ 2 phòng ngủ</h1>
        <p>Phòng ngủ 1: 1 giường đôi lớn<SingleBedIcon/></p>
        <p>Phòng ngủ 2: 1 giường đôi lớn<SingleBedIcon/><SingleBedIcon/></p>
        </div>
        <td>
            <PersonIcon/>x4 +<PersonIcon/><PersonIcon/>
        </td>
        <td>VND 3.640.000</td>
        <td>Hoàn tiền 100% trong vòng 24h sau đặt cọc</td>
        <td>
        <SplitButton/>
        </td>
        <td>
          <button>Đặt ngay</button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
);
};

export default Table;
