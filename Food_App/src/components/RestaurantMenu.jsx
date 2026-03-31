import { useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';

const RestaurantMenu = () => {
  const [showFullMap, setShowFullMap] = useState({});
  const [allOpen, setAllOpen] = useState(true);

  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  console.log(resInfo);
  const info = resInfo?.cards?.[2]?.card?.card?.info || {};

  if (!resInfo) return <Shimmer />;

  const {
    name,
    city,
    cuisines = [],
    locality,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
    sla = {},
  } = info;

  const itemCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards || [];

  const accesDeals =
    resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || [];

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );

  console.log(categories);
  return (
    <div className="restaurant-container">
      <div>
        <nav className="breadcrumb">
          <a href="/">Home </a>
          <span className="separator"> / </span>
          <a href="/city/bangalore"> {city}</a>
          <span className="separator"> / </span>
          <span>{name}</span>
        </nav>
      </div>
      <div>
        <h1 className="restaurant-title">{name}</h1>
      </div>
      <div className="Order-dine">
        <div className="Order">Order Online</div>
        <div className="dine">Dineout</div>
      </div>
      <div className="restaurant-info-card">
        <div className="rating-price">
          <div>
            <span className="rating">★ </span>
          </div>
          <div>
            <span>
              {avgRatingString} ({totalRatingsString})
            </span>{' '}
            <span>•</span> {costForTwoMessage}
          </div>
        </div>

        <div>
          <p className="menu-dish">{cuisines?.join(', ')}</p>
          <p className="">Outlet: {locality}</p>
          <p className="">{sla.slaString}</p>
        </div>
      </div>

      <div className="deals-container">
        <div className="deals">
          <div>
            <h2>Deals for you</h2>
          </div>
          <div className="button-p-n">
            <button className="button-p">Prev</button>
            <button className="button-n">Next</button>
          </div>
        </div>

        <div className="deal-cs">
          {accesDeals.map((deal) => (
            <div key={deal.info.offerIds} className="deal-card">
              <div className="deal-card-1">{deal.info.header} </div>
              <div className="deal-card-2"> {deal.info.couponCode}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="menu-heading">MENU</div>
      </div>

      <div className="accordion">
        {categories.map((category, index) => {
          const cat = category.card.card;
          return (
            <div key={cat.title} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => setAllOpen(!allOpen)}
              >
                <span>
                  {cat.title} ({cat.itemCards?.length || 0})
                </span>
                <span className="accordion-icon">{allOpen ? '▲' : '▼'}</span>
              </div>

              {allOpen && (
                <div className="accordion-content">
                  {cat.itemCards?.map((item) => {
                    const info = item.card.info;
                    const description = info.description || '';
                    const shortDescription = description.slice(0, 100);

                    return (
                      <div key={info.id} className="menu-item-card">
                        <div className="menu-item-details">
                          <h3 className="menu-item-name">{info.name}</h3>
                          <div className="menu-item-price">
                            ₹
                            {info.price / 100 ||
                              info.defaultPrice / 100 ||
                              'N/A'}
                          </div>
                          <div className="menu-item-rating">
                            <span className="menu-item-rating-star">⭐</span>{' '}
                            {info.ratings?.aggregatedRating?.rating || 'N/A'}{' '}
                            <span>
                              (
                              {info.ratings?.aggregatedRating?.ratingCountV2 ||
                                0}
                              )
                            </span>
                          </div>
                          <p className="menu-item-description">
                            {showFullMap[info.id]
                              ? description
                              : shortDescription}
                            {description.length > 100 && (
                              <button
                                className="more-btn"
                                onClick={() =>
                                  setShowFullMap((prev) => ({
                                    ...prev,
                                    [info.id]: !prev[info.id],
                                  }))
                                }
                              >
                                {showFullMap[info.id] ? ' less' : ' more'}
                              </button>
                            )}
                          </p>
                        </div>

                        <div className="menu-item-image">
                          <div>
                            <img
                              src={
                                info.imageId
                                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${info.imageId}`
                                  : 'default.png'
                              }
                              alt={info.name}
                            />
                          </div>
                          <div>
                            <button className="add-btn">ADD</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
