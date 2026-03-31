import { CDN_URL } from '../utils/constants'; //if we can using name export so we can use name import using{this}

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    location,
    areaName,
    costForTwo,
  } = resData?.info;

  return (
    <div className="res-card">
      <div className="res-img">
        <img src={CDN_URL + cloudinaryImageId} alt={resData.resName} />
        {/* <div class="offer">₹75 OFF ABOVE ₹249</div> */}
      </div>
      <div className="res-info">
        <h3>{name}</h3>
        <span className="rating">{avgRating} • </span>
        <b className="time-bold">{resData.info.sla.slaString}</b>
        <p className="cuisine">{cuisines.join(', ')}</p>
        <p className="location">{location}</p>
        <p className="location">{areaName}</p>
      </div>
      <div>{/* <h3 className="res-info">{costForTwo}</h3> */}</div>
    </div>
  );
};

export default RestaurantCard;
