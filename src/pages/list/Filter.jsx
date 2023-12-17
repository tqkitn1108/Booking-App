import './filter.css'
import { useState } from 'react';
import { filters } from '../../data/filterData';
const Filter = () => {
    // filter range
    const [rangeValue, setRangeValue] = useState(2000000); // Giá trị mặc định của thanh trượt

    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    };
    return (
        <div>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h2 class="lsT">Chọn lọc theo:</h2>
                    </div>
                </div>
                <div className="listWrapper">
                    <div className="listSearch">
                        <h3 className="lsTitle">Ngân sách tối đa của bạn (mỗi đêm)</h3>
                        <div>
                            <label htmlFor="filterRange">VND {(rangeValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</label>
                            <input type="range" id="filterRange" name="filterRange" min="0" max="4000000" value={rangeValue} onChange={handleRangeChange} />
                        </div>
                    </div>
                </div>
                        {filters.map(filter => (
                            <div className="listWrapper">
                            <div className="listSearch">
                                <h3 className="lsTitle">{filter.name} </h3>
                                <div className="lsItem">
                                    {filter.options.map(option => (
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={option.value} id={option.value} />
                                        <label class="form-check-label" for={option.value}>
                                            {option.label}
                                        </label>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            </div>
                        ))}
                    
                
            </div>
        </div>
                                  
)};

export default Filter