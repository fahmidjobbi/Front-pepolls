import React from 'react';
import { Link } from 'react-router-dom';
import { Profil } from '../index';
import topic from '../../images/topic.svg';
import explore from '../../images/explore.svg';
import plus from '../../images/plus.svg';
import logout from '../../images/logout.svg';
import './sidebar.css';


const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('access');
   
  };

  return (
    <nav className="sidebar">
      <div className="profil-sidebar">
        <Profil fontSize={11} />
      </div>

      <Link to="/Topics">
        <img src={topic} alt="Manage your topics" />
        <span>Manage Your topics</span>
      </Link>

      

      <Link to="/Poll">
        <img src={plus} alt="Place a poll" />
        <span>Place a poll</span>
      </Link>
      <Link to="/Home">
        <img src={explore} alt="Explore" />
        <span>Explore</span>
      </Link>

      <Link to="/" onClick={handleLogout}>
        <img src={logout} alt="Logout" />
        <span>Logout</span>
      </Link>
      
    </nav>
  );
};

export default Sidebar;
