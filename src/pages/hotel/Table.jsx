import React, { useState } from 'react';
import './table.css'
import {
    faPeopleArrows
  
  } from "@fortawesome/free-solid-svg-icons";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Table = () => {
  const data = [
    {
      roomType: 'Suite có Ban công',
      guestCapacity: '2',
      price: 'Hiển thị giá',
    },
    {
      roomType: 'Suite Nhin Ra Ho',
      guestCapacity: '3',
      price: 'Hiển thị giá',
    },
    {
      roomType: 'Suite Junior',
      guestCapacity: '3',
      price: 'Hiển thị giá',
    },
    {
      roomType: 'Suite Deluxe',
      guestCapacity: '4',
      price: 'Hiển thị giá',
    },
  ];
  const [showPrice, setShowPrice] = useState(false);

  const handleTogglePrice = () => {
    setShowPrice((prevState) => !prevState);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="room-type">Loại chỗ nghỉ</th>
          <th className="guest-capacity">Số lượng khách</th>
          <th className="price"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((room) => (
          <tr key={room.roomType}>
            
            <td>{room.roomType}</td>
            <td>{room.guestCapacity}</td>
            
            <td className="price">
              <button onClick={handleTogglePrice}>
                {showPrice ? '100000000' : room.price}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
