import {
    faBed,
    faSuitcaseRolling,
    faCar,
    faPlane,
    faTaxi,
    faLandmark,
    faXmark,
    faChevronDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useState, useEffect, useRef } from "react";
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

const Header = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState (true);
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const headerBtnRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() === '') {
            setErrorMessage('Vui lòng nhập điểm đến để bắt đầu tìm kiếm.');
        } else {
            setErrorMessage('');
        }
    };
    const handleButtonClick = () => {
        setButtonClicked(true);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonClicked && !event.target.closest('.header-btn')) {
                setButtonClicked(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [buttonClicked]);
    
    const handleHideResult = () => {
        setShowResult(false);
        setButtonClicked(false);
    };
    
    const componentRef3 = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (componentRef3.current && !componentRef3.current.contains(event.target)) {
                setErrorMessage(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const inputRef = useRef()
    const handleClear = () => {
        setInputValue(''); 
        setSearchResult([]);
        inputRef.current.focus();
    }
    
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);
    const componentRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setOpenDate(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1, 
        children: 0,
        room: 1,
    });
    const componentRef2 = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (componentRef2.current && !componentRef2.current.contains(event.target)) {
                setOpenOptions(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
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
            <div className="header-container">
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
                <h1 className="header-title">Tìm chỗ nghỉ tiếp theo</h1>
                <p className="header-describe">
                    Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
                </p>
                    <div>
                        <form className="header-search" action="" onSubmit={handleSubmit}>
                            <HeadlessTippy
                                placement="bottom"
                                interactive="true"
                                visible={showResult && searchResult.length > 0}
                                render={attrs => (
                                <div className="search-result" tabIndex="-1" {...attrs}>
                                    <div className="search-result-text">Điểm đến được ưa thích gần đây</div>
                                    <div className="search-result-place">
                                        <div className="search-result-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm1.5 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0zM12 1.5a6.75 6.75 0 0 1 6.75 6.75c0 2.537-3.537 9.406-6.75 14.25-3.214-4.844-6.75-11.713-6.75-14.25A6.75 6.75 0 0 1 12 1.5zM12 0a8.25 8.25 0 0 0-8.25 8.25c0 2.965 3.594 9.945 7 15.08a1.5 1.5 0 0 0 2.5 0c3.406-5.135 7-12.115 7-15.08A8.25 8.25 0 0 0 12 0z"></path></svg>
                                        </div>
                                        <div className="search-result-title">Phú Quốc</div>
                                    </div>
                                    <div className="search-result-place">
                                        <div className="search-result-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm1.5 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0zM12 1.5a6.75 6.75 0 0 1 6.75 6.75c0 2.537-3.537 9.406-6.75 14.25-3.214-4.844-6.75-11.713-6.75-14.25A6.75 6.75 0 0 1 12 1.5zM12 0a8.25 8.25 0 0 0-8.25 8.25c0 2.965 3.594 9.945 7 15.08a1.5 1.5 0 0 0 2.5 0c3.406-5.135 7-12.115 7-15.08A8.25 8.25 0 0 0 12 0z"></path></svg>
                                        </div>
                                        <div className="search-result-title">Phú Quốc</div>
                                    </div>
                                    <div className="search-result-place">
                                        <div className="search-result-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm1.5 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0zM12 1.5a6.75 6.75 0 0 1 6.75 6.75c0 2.537-3.537 9.406-6.75 14.25-3.214-4.844-6.75-11.713-6.75-14.25A6.75 6.75 0 0 1 12 1.5zM12 0a8.25 8.25 0 0 0-8.25 8.25c0 2.965 3.594 9.945 7 15.08a1.5 1.5 0 0 0 2.5 0c3.406-5.135 7-12.115 7-15.08A8.25 8.25 0 0 0 12 0z"></path></svg>
                                        </div>
                                        <div className="search-result-title">Phú Quốc</div>
                                    </div>
                                </div>
                                )}
                                onClickOutside={handleHideResult}
                            >
                            <div className="header-search-item-box">
                                <div className="header-search-item">
                                    <div className="header-search-text">
                                        <span className="header-icon">
                                            <svg onChange={(event) => setInputValue(event.target.value)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path></svg>
                                        </span>
                                        <input 
                                            ref={inputRef}
                                            value={inputValue} 
                                            type="text" 
                                            placeholder="Bạn muốn đến đâu?" 
                                            spellCheck={false} 
                                            onChange={(event) => setInputValue(event.target.value)} 
                                            onFocus={() => setShowResult(true)}
                                            className="header-search-input"
                                        /> 
                                        {errorMessage && buttonClicked && <div className="error-message" ref={componentRef3}><div className="icon-up"><FontAwesomeIcon icon={faCaretUp} /></div>{errorMessage}</div>}
                                    </div>
                                    {!!inputValue && (
                                        <FontAwesomeIcon 
                                            icon={faXmark} 
                                            onClick={() => handleClear()} 
                                            className="header-icon-close"
                                        />   
                                    )}
                                </div>
                            </div>
                            </HeadlessTippy>
                            <div className="header-search-item-box" ref={componentRef}>
                                <div className="header-search-item">
                                    <div className="header-search-text" >
                                        <span className="header-icon curpter" onClick={()=>setOpenDate(!openDate)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zM18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6zM5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zM12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5z"></path></svg>
                                        </span>
                                        
                                        <span className="header-option-text" onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate, "EEE, dd/MM/yyyy", { locale: vi })} - ${format(date[0].endDate, "EEE, dd/MM/yyyy", { locale: vi })}`}</span>
                                        {openDate && <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDate([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={date}
                                            className="date"
                                            minDate={new Date()}
                                            />
                                        }      
                                    </div>
                                </div>
                            </div>
                            <div className="header-search-item-box" ref={componentRef2}>
                                <div className="header-search-item">
                                    <div className="header-search-text">
                                        <span className="header-icon curpter" onClick={()=>setOpenOptions(!openOptions)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0zM3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0z"></path></svg>
                                        </span>
                                        <span className="header-option-text curpter" onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} người lớn - ${options.children} trẻ em - ${options.room} phòng`}</span>
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
                                    <div className="option-icon-down">
                                        <FontAwesomeIcon icon={faChevronDown} onClick={()=>setOpenOptions(!openOptions)}/>
                                    </div>
                                </div>
                            </div>
                            <button className="header-btn" onClick={handleButtonClick}  ref={headerBtnRef}>Tìm kiếm</button>
                        </form>
                    </div>          
            </div>
        </div>
    );
};

export default Header;
