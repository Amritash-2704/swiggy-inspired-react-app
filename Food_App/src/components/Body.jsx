import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import resList from '../utils/mockData';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
// using default export so we can access normal import

const Body = () => {
  const [resData, setResData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchData, setSearchData] = useState('');

  // console.log(resData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9668818&lng=77.6842253&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
      );
      const json = await data.json();
      const cards = json?.data?.cards || [];

      const restaurants =
        cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      // data?.cards[4].card.card.gridElements.infoWithStyle.restaurants
      // console.log(restaurants);
      setResData(restaurants); // hum yaha pe setResData me orignal data send kr rhe hain
      setFilteredData(restaurants); // or yaha pe v wahi data send kr rhe hai taki hmare orignal data se koi chhend khani na ho
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // //Conditional Rendering
  // if (resData.length === 0) {
  //   return <Shimmer />;
  // }

  const handleSearch = () => {
    const filtered = resData.filter((res) =>
      res.info.name.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const TopRatedRestaurant = () => {
    const filtered = resData.filter((res) => Number(res.info.avgRating) >= 4.3);
    console.log(filtered);
    setFilteredData(filtered); //update state
  };

  const onlineStatus =
    useOnlineStatus(); /**this is showing online or offline status on our app & we are creating using custom hooks */

  if (onlineStatus === false) {
    return <h1>Please check your internet Connection!! </h1>;
  }

  return resData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            placeholder="Search Restaurants..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)} // if u type something in searchbox its calling onChange method a call setSearchData() is taking target.value(value={searchData}) every time value is update and re-render a component (hum jb v searchbox me koi value type karenge to onchange methed k ander setSearchData(setSearchData(e.target.value) es method se (value={searchData}) value k ander jo data hai us data ko lega or update karega state variable(searchData) me or utni hi baar component re render hoga means refresh hoga utni hi baar ))
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          <button
            className="filter-btn"
            onClick={() => {
              TopRatedRestaurant();
            }}
          >
            Top Rated Restaurents
          </button>
        </div>
      </div>
      <div className="res-container">
        {filteredData.map((res) => (
          <Link
            key={res.info.id}
            className="link"
            to={'/restaurant/' + res.info.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <RestaurantCard resData={res} />{' '}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

// Step by Step Flow:
// Typing start kiya → onChange event fire hoga.
// e.target.value me jo nayi value hai, wo setSearchData ko di ja rahi hai.
// setSearchData state update karega → React bolega "state change hua hai, component ko re-render karna hoga".
// Component re-render hoga aur value={searchData} ke wajah se input ke andar updated value show hogi.

// 🔎 Tumhari baat ko tod ke samajho:
// ✅ "onChange call hoga har type par" → bilkul sahi ✔️
// ✅ "setSearchData(e.target.value) state update karega" → sahi ✔️
// ✅ "Har update ke baad component re-render hoga" → bilkul sahi ✔️
// ✅ "Re-render ke time input ka value prop nayi state se bind hoga" → ye bhi 100% sahi hai ✔️
// 🔑 Important Point
// Har re-render me sirf wahi component (Body) dobara execute hota hai, pura app nahi.
// Aur React Virtual DOM diffing (Reconciliation) use karta hai → isliye performance kharab nahi hoti.

{
  /*
  Problem without filteredDat
Agar tum sirf resData use karte aur search/top-rated filter directly setResData() me kar dete:

const handleSearch = () => {
  const filtered = resData.filter((res) =>
    res.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  setResData(filtered); // ❌ Original data lost
};

Ab tumhare paas original API data (resData) nahi rahega.
Agar user Top Rated filter click kare ya search clear kare, to tumhe original full list wapas nahi milega.
Basically filter karne ke baad source data destroy ho jayega → UX problem. 

      Solution: filteredData

const [resData, setResData] = useState([]);      // Original API data
const [filteredData, setFilteredData] = useState([]); // Filtered / Search data

resData → Original API data, kabhi change nahi hota
filteredData → Jo currently UI me show karna hai (search / filter applied)
Tum search ya filter apply karte ho → setFilteredData(filtered)
Original list safe rehta hai, multiple filters / searches easily apply ho sakte hain


=>  .includes(searchData.toLowerCase()) =>
   - includes() ek JavaScript string method hai jo check karta hai ki ek string ke andar doosri string present hai ya nahi.
    Ye true ya false return karta hai.  

  ex :-
   let text = "Domino's Pizza";
   console.log(text.toLowerCase().includes("pizza"));   // true

    let fruit = "Banana";
     console.log(fruit.toLowerCase().includes("nan"));  //true
                	 
*/
}
