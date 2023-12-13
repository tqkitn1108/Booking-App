import "./list.css"
import { hotels } from "../../data/hotelsData.js"

const Test = () => {
  // var value = 3;
  const renderStars = (value) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < value ? '#FFD700' : '#C0C0C0' }}>
          &#9733; {/* Dấu sao */}
        </span>
      );
    }
    return stars;
  };
  return (
    <>
      {hotels.map(hotel =>
      (<div className="searchItem">
        <img
          src={hotel.photos[2]}
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <div className="Title">
            <h1 className="siTitle">{hotel.name}</h1>
            <div className="star">
            {renderStars(hotel.star)}
            </div>
          </div>
          <div className="siDistance">
            <a id="diachi" href="">{hotel.address}</a>
            <a href="">Xem tren ban do</a>
          </div>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">
            Studio Apartment with Air conditioning
          </span>
          <span className="siFeatures">
            Entire studio • 1 bathroom • 21m² 1 full bed
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>{hotel.rating}</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">$112</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div>
      )
      )}
    </>
  )
};

export default Test;