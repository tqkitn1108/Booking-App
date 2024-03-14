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
import "./header-responsive.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useState, useEffect, useRef } from "react";
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { destinations } from '../../data/destinationData';
import { useLocation, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import SuggestItem from "./SuggestItem";
import api from "../../api/AxiosConfig";

const Header = ({ showTitle }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [destInput, setDestInput] = useState('');
    const [defaultText, setDefaultText] = useState(true);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (destInput === null || destInput.trim() === '') {
            setErrorMessage('Vui lòng nhập điểm đến để bắt đầu tìm kiếm.');
        } else {
            setErrorMessage('');
        }
        if (destInput.trim() === '') {
            // Nếu chưa nhập địa chỉ
            setErrorMessage('Vui lòng nhập điểm đến để bắt đầu tìm kiếm.');
            setButtonClicked(true); // Đánh dấu rằng người dùng đã nhấn nút
        } else {
            // Xử lý tìm kiếm khi có đủ điều kiện
            const location = searchSuggestions?.[0] ? encodeURIComponent(searchSuggestions[0].name) : encodeURIComponent(destInput);
            setDestInput(decodeURIComponent(location));
            setShowResult(false);
            inputRef.current.blur();
            if (defaultText) {
                navigate(`/hotels/search?location=${location}&page=0&size=3&adults=${options.adult}&children=${options.children}&noRooms=${options.room}`);
            } else {
                const checkIn = format(date[0].startDate, 'yyyy-MM-dd');
                const checkOut = format(date[0].endDate, 'yyyy-MM-dd');
                navigate(`/hotels/search?location=${location}&page=0&size=3&checkIn=${checkIn}&checkOut=${checkOut}&adults=${options.adult}&children=${options.children}&noRooms=${options.room}`);
            }
        }
    };
    useEffect(() => {
        if (location.pathname !== '/') {
            setDestInput(searchParams.get('location') || '');
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
        }
    }, []);

    const FUSE_OPTIONS = {
        // includeScore: true,
        shouldSort: true,
        threshold: 0.5,
        isCaseSensitive: false,
        keys: ['name']
    };

    useEffect(() => {
        if (!destInput.trim()) {
            setSearchSuggestions([]);
            return;
        }
        const timeoutId = setTimeout(() => {
            api.get(`/hotels/search-by-name?name=${encodeURIComponent(destInput)}`)
                .then(response => {
                    const fuse = new Fuse([...destinations, ...response.data], FUSE_OPTIONS);

                    const results = fuse.search(destInput);
                    const suggested = results.map(result => result.item);
                    setSearchSuggestions(suggested);
                });
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [destInput]);

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

    const componentRef = useRef(null);
    const componentRef2 = useRef(null);
    const componentRef3 = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setOpenDate(false);
            }
            if (componentRef2.current && !componentRef2.current.contains(event.target)) {
                setOpenOptions(false);
            }
            if (componentRef3.current && !componentRef3.current.contains(event.target)) {
                setErrorMessage(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const inputRef = useRef();
    const handleClear = () => {
        setDestInput('');
        setSearchSuggestions([]);
        inputRef.current.focus();
    }

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

    const handleClickSuggestion = (dest, id) => {
        if (!!id) {
            navigate(`/hotels/${id}`);
        }
        setDestInput(dest);
        setSearchSuggestions([])
        setShowResult(false);
    }

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
                {showTitle &&
                    <div className="title-banner">
                        <h1 className="header-title">Tìm chỗ nghỉ tiếp theo</h1>
                        <p className="header-describe">
                            Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
                        </p>
                    </div>}
                <div>
                    <form className="header-search" action="" onSubmit={handleSearch}>
                        <HeadlessTippy
                            placement="bottom"
                            interactive="true"
                            appendTo={() => document.body}
                            visible={showResult && searchSuggestions.length > 0}
                            render={attrs => (
                                <div className="search-result" tabIndex="-1" {...attrs}>
                                    <div className="search-result-text">Điểm đến được ưa thích gần đây</div>
                                    {searchSuggestions.map((searchSuggestion, index) => (
                                        <SuggestItem key={index} handleClickSuggestion={handleClickSuggestion} searchSuggestion={searchSuggestion} />
                                    ))}
                                </div>
                            )}
                            onClickOutside={handleHideResult}
                        >
                            <div className="header-search-item-box">
                                <div className="header-search-item">
                                    <div className="header-search-text">
                                        <span className="header-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path></svg>
                                        </span>
                                        <input
                                            ref={inputRef}
                                            value={destInput}
                                            type="text"
                                            placeholder="Bạn muốn đến đâu?"
                                            spellCheck={false}
                                            onChange={(event) => setDestInput(event.target.value)}
                                            onFocus={() => setShowResult(true)}
                                            className="header-search-input"
                                        />
                                        {errorMessage && buttonClicked && <div className="error-message" ref={componentRef3}><div className="icon-up"><FontAwesomeIcon icon={faCaretUp} /></div>{errorMessage}</div>}
                                    </div>
                                    {!!destInput && (
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            onClick={handleClear}
                                            className="header-icon-close"
                                        />
                                    )}
                                </div>
                            </div>
                        </HeadlessTippy>
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
                            />}
                        </div>
                        <div className="header-search-item-box" ref={componentRef2}>
                            <div className="header-search-item" onClick={() => setOpenOptions(!openOptions)}>
                                <div className="header-search-text">
                                    <span className="header-icon" >
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
                        <button className="header-btn" type="submit">Tìm kiếm</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Header;