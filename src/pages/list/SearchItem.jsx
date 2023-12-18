import "./searchItem.css";

const SearchItem = ({name, photos, address, rating, star}) => {
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
  function RatingComponent({ rating }) {
    let textToShow;

    if (rating >= 9.0) {
      textToShow = "Tuyệt hảo";
    } else if (rating >= 8.0) {
      textToShow = "Rất tốt";
    } else if (rating >= 7.0) {
      textToShow = "Tốt";
    } else if (rating >= 6.0) {
      textToShow = "Dễ chịu";
    } else textToShow = "Bình thường"

    return textToShow;
  }
  function mapSearchString(str) {
    return "https://www.google.com/maps/place/" + str.split(' ').join('+');
  }
  return (
    <div className="searchItem">
      <img
        src={photos}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <div className="Title">
          <h1 className="siTitle">{name}</h1>
          <div className="star">
            {renderStars(star)}
          </div>
        </div>
        <div className="siDistance">
          <a id="diachi" href={mapSearchString(address)} target="_blank" rel="noopener noreferrer">{address}</a>
          <a href={mapSearchString(address)} target="_blank" rel="noopener noreferrer">Xem tren ban do</a>
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
          <RatingComponent className="nhanXet" rating={rating}></RatingComponent>
          <button>{rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Liên hệ</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
