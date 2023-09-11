
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar ,Card ,ShowPoll,AdsSponsor,Rights} from '../components';
import Chat from './Chat';



const Home = () => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } 
  }, [])


  return (
    <div>
      <Sidebar/>  
       
       <Card/>
       <AdsSponsor/>
       <Rights/>
       
       


 <div className='pub'>   <ShowPoll/>   </div>    
 



    </div>
  );
};

export default Home;
/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar ,Card ,ShowPoll} from '../components';
import './pages.css'; // import the CSS file for the Home component

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } 
  }, [])

  return (
    <div className='home-container'>
      <Sidebar/>
      <div className='main-container'>
        <Card/>
        <div className='pub'>
          <ShowPoll/>
        </div>
      </div>
    </div>
  );
};

export default Home;*/
