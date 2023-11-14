import {
    faBed,
    faCalendarDays,
    faSuitcaseRolling,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
    faLandmark,
    faXmark,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useState } from 'react';


const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1, 
        children: 0,
        room: 1,
    });
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev, 
                [name]: operation === "i"  ? options[name] + 1 : options[name] - 1
            };
        });
    };
    return (
        <div className="header">
            <div className={type === "list" ? "header-container list-mode" : "header-container"}>
                <div className="header-list">
                    <div className="header-list-item active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Lưu trú</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Chuyến bay</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faSuitcaseRolling} />
                        <span>Chuyến bay + Khách sạn</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Thuê xe</span>
                    </div>
                    <div className="header-list-item">
                    <FontAwesomeIcon icon={faLandmark} />
                        <span>Địa điểm tham quan</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxi sân bay</span>
                    </div>
                </div>
                { type !== "list" && 
                <>
                    <h1 className="header-title">Tìm chỗ nghỉ tiếp theo</h1>
                    <p className="header-describe">
                        Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
                    </p>
                </>} 
                    <div className="header-search">
                        <div className="header-search-item-box">
                            <div className="header-search-item">
                                <div className="header-search-text">
                                    <FontAwesomeIcon icon={faBed} className="header-icon"/>
                                    <input type="text" placeholder="Bạn muốn đến đâu?" className="header-search-input"/>
                                </div>
                                <FontAwesomeIcon icon={faXmark} className="header-icon-close"/>
                            </div>
                        </div>
                        <div className="header-search-item-box">
                            <div className="header-search-item">
                                <div className="header-search-text">
                                    <FontAwesomeIcon icon={faCalendarDays} onClick={()=>setOpenDate(!openDate)} className="header-icon curpter"/>
                                    <span className="header-search-text" onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                                    {openDate && <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className="date"
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="header-search-item-box">
                            <div className="header-search-item">
                                <div className="header-search-text">
                                    <FontAwesomeIcon icon={faPerson} onClick={()=>setOpenOptions(!openOptions)} className="header-icon curpter"/>
                                    <span className="header-search-text" onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} người lớn - ${options.children} trẻ con - ${options.room} phòng`}</span>
                                        {openOptions && <div className="options">
                                            <div className="option-item">
                                                <span className="option-text">Người lớn</span>
                                                <div className="option-counter">
                                                    <button disabled={options.adult <= 1} className="option-counter-btn" onClick={()=>handleOption("adult", "d")}>-</button>
                                                    <span className="option-counter-number">{options.adult}</span>
                                                    <button className="option-counter-btn" onClick={()=>handleOption("adult", "i")}>+</button>
                                                </div>
                                            </div>
                                            <div className="option-item">
                                                <span className="option-text">Trẻ em</span>
                                                <div className="option-counter">
                                                    <button disabled={options.children <= 0} className="option-counter-btn" onClick={()=>handleOption("children", "d")}>-</button>
                                                    <span className="option-counter-number">{options.children}</span>
                                                    <button className="option-counter-btn" onClick={()=>handleOption("children", "i")}>+</button>
                                                </div>
                                            </div>
                                            <div className="option-item">
                                                <span className="option-text">Phòng</span>
                                                <div className="option-counter">
                                                    <button disabled={options.room <= 1} className="option-counter-btn" onClick={()=>handleOption("room", "d")}>-</button>
                                                    <span className="option-counter-number">{options.room}</span>
                                                    <button className="option-counter-btn" onClick={()=>handleOption("room", "i")}>+</button>
                                                </div>
                                            </div>
                                            <button className="option-end" onClick={()=>setOpenOptions(!openOptions)}>Xong</button>
                                        </div>}
                                </div>
                                <FontAwesomeIcon icon={faChevronDown} className="option-icon-down" onClick={()=>setOpenOptions(!openOptions)}/>
                            </div>
                        </div>
                        <div className="header-search-item">
                            <button className="header-btn">Tìm</button>
                        </div>
                    </div>          
            </div>
        </div>
    );
};

export default Header;
