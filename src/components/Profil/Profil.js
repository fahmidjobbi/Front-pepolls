import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profil.css';
import profil_img from '../../images/bleu back.png';


const Profil = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } else {
      fetch('http://127.0.0.1:5000/api/v1/auth/usershow', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        const user = JSON.parse(data.user);
        setUserData(user);
      })
      .catch(error => console.error(error));
    }
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  localStorage.setItem("username",userData.username);

  return (
    <div className="details">
      {!imageError && (
        <img 
          src={`http://localhost:5000/${userData.url_image}`} 
          alt="Profile" 
          className="profile-image" 
          onError={handleImageError}
        />
      )}
      {imageError && (
        <img 
          src={profil_img} 
          alt="Profile" 
          className="profile-image" 
        />
      )}
      <div >
        <h5 className="name">{userData.username}</h5>
        <p className="username">{userData.name} {userData.surname}</p>
      </div>
    </div>
  );
};

export default Profil;
