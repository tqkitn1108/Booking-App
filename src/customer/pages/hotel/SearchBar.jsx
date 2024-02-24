import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from 'react-date-range';
import "./searchBar.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useState, useEffect, useRef } from "react";
import 'tippy.js/dist/tippy.css'; // optional
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar({ setShowRooms }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [defaultText, setDefaultText] = useState(true);
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    if (defaultText) {
      setOpenDate(true);
    } else {
      const checkIn = format(date[0].startDate, 'yyyy-MM-dd');
      const checkOut = format(date[0].endDate, 'yyyy-MM-dd');
      searchParams.set('checkIn', checkIn);
      searchParams.set('checkOut', checkOut);
      searchParams.set('adults', options.adult);
      searchParams.set('children', options.children);
      searchParams.set('noRooms', options.room);
      navigate({ search: `?${searchParams.toString()}` });
      setShowRooms(true);
    }
  };
  useEffect(() => {
    if (searchParams.get('checkIn')) {
      setDefaultText(false);
      setDate([{
        startDate: new Date(searchParams.get('checkIn')),
        endDate: new Date(searchParams.get('checkOut')),
        key: 'selection'
      }]);
    }
    setOptions({
      adult: parseInt(searchParams.get('adults')) || 2,
      children: parseInt(searchParams.get('children')) || 0,
      room: parseInt(searchParams.get('noRooms')) || 1,
    })
  }, [])

  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState(
    [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]
  );
  const handleDateChange = (item) => {
    setDate([item.selection]);
    setDefaultText(false);
  };
  const componentRef = useRef(null);
  const componentRef2 = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setOpenDate(false);
      }
      if (componentRef2.current && !componentRef2.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const handleOption = (event, name, operation) => {
    event.preventDefault();
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      };
    });
  };

  return (
    <form className="header-search" action="" onSubmit={handleSearch}>
      <div className="header-search-item-box" ref={componentRef}>
        <div className="header-search-item" onClick={() => setOpenDate(!openDate)}>
          <div className="header-search-text" >
            <span className="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zM18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6zM5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zM12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5z"></path></svg>
            </span>
            <span className="header-option-text">{defaultText ? `Ngày nhận phòng - Ngày trả phòng` : `${format(date[0].startDate, "EEE, dd/MM/yyyy", { locale: vi })} - ${format(date[0].endDate, "EEE, dd/MM/yyyy", { locale: vi })}`}</span>
          </div>
        </div>
        {openDate && <DateRange
          editableDateInputs={true}
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={date}
          className="date"
          minDate={new Date()}
        />
        }
      </div>
      <div className="header-search-item-box" ref={componentRef2}>
        <div className="header-search-item" onClick={() => setOpenOptions(!openOptions)}>
          <div className="header-search-text">
            <span className="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0zM3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0z"></path></svg>
            </span>
            <span className="header-option-text">{`${options.adult} người lớn - ${options.children} trẻ em - ${options.room} phòng`}</span>
          </div>
          <div className="option-icon-down">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        {openOptions && <div className="options">
          <div className="option-item">
            <span className="option-text">Người lớn</span>
            <div className="option-counter">
              <button disabled={options.adult <= 1} className="option-counter-btn" onClick={(event) => handleOption(event, "adult", "d")}>-</button>
              <span className="option-counter-number">{options.adult}</span>
              <button className="option-counter-btn" onClick={(event) => handleOption(event, "adult", "i")}>+</button>
            </div>
          </div>
          <div className="option-item">
            <span className="option-text">Trẻ em</span>
            <div className="option-counter">
              <button disabled={options.children <= 0} className="option-counter-btn" onClick={(event) => handleOption(event, "children", "d")}>-</button>
              <span className="option-counter-number">{options.children}</span>
              <button className="option-counter-btn" onClick={(event) => handleOption(event, "children", "i")}>+</button>
            </div>
          </div>
          <div className="option-item">
            <span className="option-text">Phòng</span>
            <div className="option-counter">
              <button disabled={options.room <= 1} className="option-counter-btn" onClick={(event) => handleOption(event, "room", "d")}>-</button>
              <span className="option-counter-number">{options.room}</span>
              <button className="option-counter-btn" onClick={(event) => handleOption(event, "room", "i")}>+</button>
            </div>
          </div>
          <button className="option-end" onClick={() => setOpenOptions(!openOptions)}>Xong</button>
        </div>}
      </div>
      <button className="header-btn">Tìm kiếm</button>
    </form>
  )
}
export default SearchBar;