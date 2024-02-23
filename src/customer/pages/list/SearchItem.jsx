import "./searchItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export function RatingComponent({ rating }) {
  let textToShow;
  if (rating !== undefined && rating !== null) {
    if (rating >= 9.0) {
      textToShow = "Tuyệt hảo";
    } else if (rating >= 8.0) {
      textToShow = "Rất tốt";
    } else if (rating >= 7.0) {
      textToShow = "Tốt";
    } else if (rating >= 6.0) {
      textToShow = "Dễ chịu";
    } else textToShow = "Bình thường"
  }
  return textToShow;
}

const SearchItem = ({ hotel, location }) => {
  const navigate = useNavigate();

  const renderStars = (value) => {
    const stars = [];
    if (value > 0) {
      for (let i = 0; i < 5; i++) {
        stars.push(
          <span key={i} style={{ color: i < value ? '#FFD700' : '#C0C0C0' }}>
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  function mapSearchString(str) {
    return "https://www.google.com/maps/place/" + str.split(' ').join('+');
  }

  function handleClick(id) {
    navigate(`/hotels/${id}` + location.search);
  }

  return (
    <div className="searchItem">
      <img
        src={hotel.photos[0]}
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
          <a id="address" href={mapSearchString(hotel.address)} target="_blank" rel="noopener noreferrer">{hotel.address}</a>
          <a href={mapSearchString(hotel.address)} target="_blank" rel="noopener noreferrer">Xem trên bản đồ</a>
        </div>
        <span className="siSubtitle">
          {hotel.description}
        </span>
        <span className="siFeatures">
        </span>
        {hotel.facilities?.[0]?.label &&
          <span className="siCancelOp">
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px', fontSize: '16px' }} />
            {hotel.facilities?.[0]?.label}
          </span>}
        {hotel.facilities?.[1]?.label &&
          <span className="siCancelOp">
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px', fontSize: '16px' }} />
            {hotel.facilities?.[1]?.label}
          </span>}
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span className="cmt"><RatingComponent rating={hotel.rating}></RatingComponent></span>
          <button>{hotel.rating.toFixed(1)}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Giá 1 đêm</span>
          <span className="siPrice">{(hotel.minPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={() => handleClick(hotel.id)}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
