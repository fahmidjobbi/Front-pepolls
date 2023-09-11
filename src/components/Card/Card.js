import React from 'react';
import { Profil, Button, Form } from '../index';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = () => {
  return (
    <div >
      <div className="card">
        <div className="card-element">
          <Profil />
          <Link to="/Edit">
            <Button className="btn btn-light bedit"  p="Edit my profile" Link="EditProfil" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
