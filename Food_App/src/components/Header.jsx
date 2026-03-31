import { useState } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {
  const [btnName, setBtnName] = useState('Login');

  const onlineStatus = useOnlineStatus();

  const handleClick = () => {
    setBtnName(btnName === 'Login' ? 'Logout' : 'Login');
  };

  return (
    <div className="header">
      <div>
        <img className="logo" src={LOGO_URL} alt="Burger Logo" />
        {/* if we can use some import link or access some data from another file like-{LOGO_URL} 
              so we can use curly braces not "LOGO_URL" string */}
      </div>
      <div className="nav-item">
        <ul>
          <li>Online Status: {onlineStatus ? '✅' : '🔴'} </li>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li>Cart</li>
          <button className="login-btn" onClick={handleClick}>
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
