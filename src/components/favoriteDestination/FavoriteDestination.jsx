// favoriteDestinations.jsx

import React, { useState } from 'react';
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import "./FavoriteDestinations.css";

function FavoriteDestinations() {
    const tabsData = {
        regions: [
            // Thêm 19 dữ liệu mẫu
            { name: 'Hanoi', rooms: 150 },
            { name: 'Ho Chi Minh City', rooms: 200 },
            { name: 'Danang', rooms: 120 },
            { name: 'Nha Trang', rooms: 180 },
            { name: 'Hue', rooms: 90 },
            { name: 'Paris', rooms: 300 },
            { name: 'New York', rooms: 250 },
            { name: 'Tokyo', rooms: 180 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Barcelona', rooms: 120 },
            { name: 'London', rooms: 220 },
            { name: 'Berlin', rooms: 160 },
            { name: 'Rome', rooms: 130 },
            { name: 'Cairo', rooms: 100 },
            { name: 'Mumbai', rooms: 170 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Beijing', rooms: 240 },
            { name: 'Moscow', rooms: 110 },
          ],
          cities: [
            { name: 'Paris', rooms: 300 },
            { name: 'New York', rooms: 250 },
            { name: 'Tokyo', rooms: 180 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Barcelona', rooms: 120 },
            { name: 'London', rooms: 220 },
            { name: 'Berlin', rooms: 160 },
            { name: 'Rome', rooms: 130 },
            { name: 'Cairo', rooms: 100 },
            { name: 'Mumbai', rooms: 170 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Beijing', rooms: 240 },
            { name: 'Moscow', rooms: 110 },
            { name: 'Los Angeles', rooms: 280 },
            { name: 'Dubai', rooms: 150 },
            { name: 'Istanbul', rooms: 190 },
            { name: 'Toronto', rooms: 210 },
            { name: 'Rio de Janeiro', rooms: 140 },
            { name: 'Bangkok', rooms: 230 },
          ],
          placesOfInterest: [
            { name: 'Eiffel Tower', rooms: 50 },
            { name: 'Statue of Liberty', rooms: 80 },
            { name: 'Mount Fuji', rooms: 30 },
            { name: 'Sydney Opera House', rooms: 40 },
            { name: 'Sagrada Familia', rooms: 20 },
            { name: 'Great Wall of China', rooms: 60 },
            { name: 'Red Square', rooms: 25 },
            { name: 'Colosseum', rooms: 35 },
            { name: 'Giza Pyramids', rooms: 15 },
            { name: 'Gateway of India', rooms: 45 },
            { name: 'Opera House, Sydney', rooms: 55 },
            { name: 'Forbidden City', rooms: 65 },
            { name: 'Kremlin', rooms: 28 },
            { name: 'Hollywood Sign', rooms: 75 },
            { name: 'Burj Khalifa', rooms: 95 },
            { name: 'Blue Mosque', rooms: 22 },
            { name: 'CN Tower', rooms: 85 },
            { name: 'Christ the Redeemer', rooms: 32 },
            { name: 'Wat Arun', rooms: 42 },
          ],
    };

    const numRows = Math.ceil(tabsData.regions.length / 5);
    const [activeTab, setActiveTab] = useState('regions');

    const handleTabSelect = (key) => {
        setActiveTab(key);
    };

    return (
        <div className="favorite-destinations">
            <h2 className="d-index__header-section">Địa điểm yêu thích</h2>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="favorite-destinations-tabs">
                <Tab eventKey="regions" title={<div className={`tab ${activeTab === 'regions' ? 'active' : ''}`}>
                    <span className="tab-indicator"></span>
                    <span className="tab-label">Khu vực</span>
                </div>}>
                    {/* Nội dung của tab regions */}
                    <div id="regions-content" style={{ display: activeTab === 'regions' ? 'block' : 'none' }}>
                        <Row>
                            {/* ... Nội dung của tab regions */}
                                    {Array.from({ length: 5 }, (_, i) => (
                        <Col key={i}>
                        {tabsData.regions
                            .slice(i * numRows, i * numRows + numRows)
                            .map((item, index) => (
                            <div key={index}>
                                <strong>{item.name}</strong>
                                <div>{`${item.rooms} chỗ nghỉ`}</div>
                            </div>
                            ))}
                        </Col>
                    ))}
                        </Row>
                    </div>
                </Tab>
                <Tab eventKey="cities" title={<div className={`tab ${activeTab === 'cities' ? 'active' : ''}`}>
                    <span className="tab-indicator"></span>
                    <span className="tab-label">Thành phố</span>
                </div>}>
                    {/* Nội dung của tab cities */}
                    <div id="cities-content" style={{ display: activeTab === 'cities' ? 'block' : 'none' }} >
                        <Row>
                            {/* ... Nội dung của tab cities */}
                            {Array.from({ length: 5 }, (_, i) => (
                                <Col key={i}>
                                    {tabsData.cities
                                    .slice(i * numRows, i * numRows + numRows)
                                    .map((item, index) => (
                                    <div key={index}>
                                    <strong>{item.name}</strong>
                                    <div>{`${item.rooms} chỗ nghỉ`}</div>
                                    </div>
                                ))}
                                 </Col>
                            ))}
                        </Row>
                    </div>
                </Tab>
                <Tab eventKey="placesOfInterest" title={<div className={`tab ${activeTab === 'placesOfInterest' ? 'active' : ''}`}>
                    <span className="tab-indicator"></span>
                    <span className="tab-label">Địa điểm quan tâm</span>
                </div>}>
                    {/* Nội dung của tab placesOfInterest */}
                    <div id="placesOfInterest-content" style={{ display: activeTab === 'placesOfInterest' ? 'block' : 'none' }}>
                        <Row>
                            {/* ... Nội dung của tab placesOfInterest */}
                            {Array.from({ length: 5 }, (_, i) =>
                                <Col key={i}>
                                {tabsData.placesOfInterest
                                    .slice(i * numRows, i * numRows + numRows)
                                    .map((item, index) => (
                                     <div key={index}>
                                     <strong>{item.name}</strong>
                                    <div>{`${item.rooms} chỗ nghỉ`}</div>
                                    </div>
                                     ))}
                                </Col>
                         )}
                        </Row>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default FavoriteDestinations;
