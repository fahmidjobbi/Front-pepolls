/*import React, { useState, useEffect ,useRef} from 'react';
import { Form, Button, Comment } from '../index';
import './ShowPoll.css';
import img1 from '../../images/trend.png'
import img2 from '../../images/yes.png'
import img3 from '../../images/no.png'
import back from '../../images/bleu back.png'

const ShowPoll = () => {
  const [pubs, setPubs] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [pubsWithImg, setPubsWithImg] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/all_pubs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPubs(data);
        } else {
          console.log('Invalid data format:', data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const prevPubsRef = useRef();
  useEffect(() => {
    if (Array.isArray(pubs) && prevPubsRef.current !== pubs) {
      const promises = pubs.map(pub => {
        const { username } = pub;
        return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${username}`)
          .then(response => response.json())
          .then(data => {
            const userImageUrl = data.image_url;
            return { ...pub, userImageUrl };
          })
          .catch(error => {
            console.log(error);
            return pub;
          });
      });
      Promise.all(promises).then(updatedPubs => {
        setPubs(updatedPubs);
        prevPubsRef.current = updatedPubs;
      });
    }
  }, [pubs]);


  const handleInteraction = (pubId, interactionType) => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/user_vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        pub_id: pubId,
        interaction: interactionType
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle success response
        if (interactionType === 'vote_yes_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_yes_count`]: true,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        } else if(interactionType === 'vote_no_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_no_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_no_count`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        }
        else if (interactionType === 'trend') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_trend`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_trend`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
            });
          }
        }
      })
      .catch(error => console.log(error));
  };
  
  return (
    <div>
      {Array.isArray(pubs) && pubs.map(pub => (
        <Form marginTop={40} key={pub.pub_id}>
          <div className='user-info'>
          {pub.userImageUrl ? (
  <img
    src={`http://localhost:5000/${pub.userImageUrl}`}
    alt="Profile"
    className='profile-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />
) : (
  <img
    src={back}
    alt="Profile"
    className='profile-image'
  />
)}

            <div className='block-info'>
            <p className='name'>{pub.username}</p>
            <div className='topic-time'>
              <p className='username'>{pub.topic}</p> :
              <p className='username'>{pub.topicmodel}</p>
              <p className='username'>{pub.original_username}</p>
            
            </div>
            </div>
          </div>
           
            <p >{pub.caption}</p>
            {pub.url_image ? (
  <img
    src={`http://localhost:5000/${pub.url_image}`}
    alt="Poll"
    className='polls-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />
) : (
  <img
    src={back}
    alt="polls-image"
    className='polls-image'
  />
)}

            <Button
  className={buttonStates[`${pub.pub_id}_you_and_trend`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_trend`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  p={buttonStates[`${pub.pub_id}_you_and_trend`] ? pub.trend === 0 ? `You` : `you and ${pub.trend}` : `trend ${pub.trend}`}
  onClick={() => handleInteraction(pub.pub_id, 'trend')}
  imgSrc={img1}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_yes_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img2}
  p={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? pub.vote_yes_count === 0 ? `You` :`you and ${pub.vote_yes_count}` :  `Yes ${pub.vote_yes_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_yes_count')}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_no_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img3}
  p={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? pub.vote_no_count === 0 ? `You` :`you and ${pub.vote_no_count}` : `No ${pub.vote_no_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_no_count')}
/>


        </Form>
       
      ))}
      
    </div>
  );
};

export default ShowPoll*/
/*
import React, { useState, useEffect ,useRef} from 'react';
import { Form, Button, Comment } from '../index';

import './ShowPoll.css';
import img1 from '../../images/trend.svg'
import img2 from '../../images/yes.svg'
import img3 from '../../images/no.svg'
import img4 from '../../images/shares.svg'

import back from '../../images/bleu back.png'

const ShowPoll = () => {
  const [pubs, setPubs] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [pubsWithImg, setPubsWithImg] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/all_pubs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPubs(data);
        } else {
          console.log('Invalid data format:', data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const prevPubsRef = useRef();
  useEffect(() => {
    if (Array.isArray(pubs) && prevPubsRef.current !== pubs) {
      const promises = pubs.map(pub => {
        const { username } = pub;
        return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${username}`)
          .then(response => response.json())
          .then(data => {
            const userImageUrl = data.image_url;
            return { ...pub, userImageUrl };
          })
          .catch(error => {
            console.log(error);
            return pub;
          });
      });
      Promise.all(promises).then(updatedPubs => {
        setPubs(updatedPubs);
        prevPubsRef.current = updatedPubs;
      });
    }
  }, [pubs]);


  const handleInteraction = (pubId, interactionType) => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/user_vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        pub_id: pubId,
        interaction: interactionType
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle success response
        if (interactionType === 'vote_yes_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_yes_count`]: true,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        } else if(interactionType === 'vote_no_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_no_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_no_count`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        }
        else if (interactionType === 'trend') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_trend`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_trend`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
            });
          }
        }
      })
      .catch(error => console.log(error));
  };
  
  return (
    <div>
      {Array.isArray(pubs) && pubs.map(pub => (
        <Form marginTop={40} key={pub.pub_id}>
          <div className='user-info'>
          {pub.userImageUrl ? (
  <img
  
    src={`http://localhost:5000/${pub.userImageUrl}`}
    alt="user-image"
    className='user-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />
) : (
  <img
    src={back}
    alt="user-image"
    className='user-image'
  />
)}

            <div className='block-info'>
            <p className='name'>{pub.username}</p>
            <div className='topic-time'>
              <p className='username'>{pub.topic}</p> :
              <p className='username'>{pub.topicmodel}</p>
              <p className='username'>{pub.original_username}</p>
            
            </div>
            </div>
          </div>
           
          <p className='cap' style={{textAlign: "left"}}>{pub.caption}</p>
           
          <img
    src={`http://localhost:5000/${pub.url_image}`}
    alt="Poll"
    className='polls-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />

 

            <Button
  className={buttonStates[`${pub.pub_id}_you_and_trend`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_trend`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  p={buttonStates[`${pub.pub_id}_you_and_trend`] ? pub.trend === 0 ? `You` : `you and ${pub.trend}` : `trend ${pub.trend}`}
  onClick={() => handleInteraction(pub.pub_id, 'trend')}
  imgSrc={img1}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_yes_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img2}
  p={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? pub.vote_yes_count === 0 ? `You` :`you and ${pub.vote_yes_count}` :  `Yes ${pub.vote_yes_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_yes_count')}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_no_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img3}
  p={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? pub.vote_no_count === 0 ? `You` :`you and ${pub.vote_no_count}` : `No ${pub.vote_no_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_no_count')}
/>



<Comment pubId={pub.pub_id} />
        </Form>
       
      ))}
      
    </div>
  );
};

export default ShowPoll;*/
/*import React, { useState, useEffect ,useRef} from 'react';
import { Form, Button, Comment } from '../index';
import './ShowPoll.css';
import img1 from '../../images/trend.png'
import img2 from '../../images/yes.png'
import img3 from '../../images/no.png'
import back from '../../images/bleu back.png'

const ShowPoll = () => {
  const [pubs, setPubs] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [pubsWithImg, setPubsWithImg] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/all_pubs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPubs(data);
        } else {
          console.log('Invalid data format:', data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const prevPubsRef = useRef();
  useEffect(() => {
    if (Array.isArray(pubs) && prevPubsRef.current !== pubs) {
      const promises = pubs.map(pub => {
        const { username } = pub;
        return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${username}`)
          .then(response => response.json())
          .then(data => {
            const userImageUrl = data.image_url;
            return { ...pub, userImageUrl };
          })
          .catch(error => {
            console.log(error);
            return pub;
          });
      });
      Promise.all(promises).then(updatedPubs => {
        setPubs(updatedPubs);
        prevPubsRef.current = updatedPubs;
      });
    }
  }, [pubs]);


  const handleInteraction = (pubId, interactionType) => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/user_vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        pub_id: pubId,
        interaction: interactionType
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle success response
        if (interactionType === 'vote_yes_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_yes_count`]: true,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        } else if(interactionType === 'vote_no_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_no_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_no_count`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        }
        else if (interactionType === 'trend') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_trend`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_trend`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
            });
          }
        }
      })
      .catch(error => console.log(error));
  };
  
  return (
    <div>
      {Array.isArray(pubs) && pubs.map(pub => (
        <Form marginTop={40} key={pub.pub_id}>
          <div className='user-info'>
          {pub.userImageUrl ? (
  <img
    src={`http://localhost:5000/${pub.userImageUrl}`}
    alt="Profile"
    className='profile-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />
) : (
  <img
    src={back}
    alt="Profile"
    className='profile-image'
  />
)}

            <div className='block-info'>
            <p className='name'>{pub.username}</p>
            <div className='topic-time'>
              <p className='username'>{pub.topic}</p> :
              <p className='username'>{pub.topicmodel}</p>
              <p className='username'>{pub.original_username}</p>
            
            </div>
            </div>
          </div>
           
            <p >{pub.caption}</p>
            {pub.url_image ? (
  <img
    src={`http://localhost:5000/${pub.url_image}`}
    alt="Poll"
    className='polls-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />
) : (
  <img
    src={back}
    alt="polls-image"
    className='polls-image'
  />
)}

            <Button
  className={buttonStates[`${pub.pub_id}_you_and_trend`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_trend`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  p={buttonStates[`${pub.pub_id}_you_and_trend`] ? pub.trend === 0 ? `You` : `you and ${pub.trend}` : `trend ${pub.trend}`}
  onClick={() => handleInteraction(pub.pub_id, 'trend')}
  imgSrc={img1}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_yes_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img2}
  p={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? pub.vote_yes_count === 0 ? `You` :`you and ${pub.vote_yes_count}` :  `Yes ${pub.vote_yes_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_yes_count')}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_no_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img3}
  p={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? pub.vote_no_count === 0 ? `You` :`you and ${pub.vote_no_count}` : `No ${pub.vote_no_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_no_count')}
/>


        </Form>
       
      ))}
      
    </div>
  );
};

export default ShowPoll*/
/*
import React, { useState, useEffect ,useRef} from 'react';
import { Form, Button, Comment } from '../index';

import './ShowPoll.css';
import img1 from '../../images/trend.svg'
import img2 from '../../images/yes.svg'
import img3 from '../../images/no.svg'
import img4 from '../../images/shares.svg'

import back from '../../images/bleu back.png'

const ShowPoll = () => {
  const [pubs, setPubs] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [pubsWithImg, setPubsWithImg] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/all_pubs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPubs(data);
        } else {
          console.log('Invalid data format:', data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const prevPubsRef = useRef();
  useEffect(() => {
    if (Array.isArray(pubs) && prevPubsRef.current !== pubs) {
      const promises = pubs.map(pub => {
        const { username } = pub;
        return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${username}`)
          .then(response => response.json())
          .then(data => {
            const userImageUrl = data.image_url;
            return { ...pub, userImageUrl };
          })
          .catch(error => {
            console.log(error);
            return pub;
          });
      });
      Promise.all(promises).then(updatedPubs => {
        setPubs(updatedPubs);
        prevPubsRef.current = updatedPubs;
      });
    }
  }, [pubs]);


  const handleInteraction = (pubId, interactionType) => {
    const token = localStorage.getItem('access');
    fetch('http://127.0.0.1:5000/api/v1/auth/user_vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        pub_id: pubId,
        interaction: interactionType
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle success response
        if (interactionType === 'vote_yes_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_yes_count`]: true,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        } else if(interactionType === 'vote_no_count') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_vote_no_count`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_vote_no_count`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_trend`]: false,
              [`${pubId}_you_and_trend`]: false,
            });
          }
        }
        else if (interactionType === 'trend') {
          if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_trend`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_trend`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
            });
          }
        }
      })
      .catch(error => console.log(error));
  };
  
  return (
    <div>
      {Array.isArray(pubs) && pubs.map(pub => (
        <Form marginTop={40} key={pub.pub_id}>
          <div className='user-info'>
          {pub.userImageUrl ? (
  <img
  
    src={`http://localhost:5000/${pub.userImageUrl}`}
    alt="user-image"
    className='user-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />
) : (
  <img
    src={back}
    alt="user-image"
    className='user-image'
  />
)}

            <div className='block-info'>
            <p className='name'>{pub.username}</p>
            <div className='topic-time'>
              <p className='username'>{pub.topic}</p> :
              <p className='username'>{pub.topicmodel}</p>
              <p className='username'>{pub.original_username}</p>
            
            </div>
            </div>
          </div>
           
          <p className='cap' style={{textAlign: "left"}}>{pub.caption}</p>
           
          <img
    src={`http://localhost:5000/${pub.url_image}`}
    alt="Poll"
    className='polls-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />

 

            <Button
  className={buttonStates[`${pub.pub_id}_you_and_trend`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_trend`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  p={buttonStates[`${pub.pub_id}_you_and_trend`] ? pub.trend === 0 ? `You` : `you and ${pub.trend}` : `trend ${pub.trend}`}
  onClick={() => handleInteraction(pub.pub_id, 'trend')}
  imgSrc={img1}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_yes_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img2}
  p={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? pub.vote_yes_count === 0 ? `You` :`you and ${pub.vote_yes_count}` :  `Yes ${pub.vote_yes_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_yes_count')}
/>


<Button
  className={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? "btn btn-light selected" : buttonStates[`${pub.pub_id}_vote_no_count`] ? "btn btn-light" : "btn btn-light unselected"}
  width={100}
  height={40}
  imgSrc={img3}
  p={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? pub.vote_no_count === 0 ? `You` :`you and ${pub.vote_no_count}` : `No ${pub.vote_no_count}`}
  onClick={() => handleInteraction(pub.pub_id, 'vote_no_count')}
/>



<Comment pubId={pub.pub_id} />
        </Form>
       
      ))}
      
    </div>
  );
};

export default ShowPoll;*/
import React, { useState, useEffect ,useRef} from 'react';
import { Form, Button, Comment } from '../index';

import './ShowPoll.css';
import img1 from '../../images/trend.svg'
import img2 from '../../images/yes.svg'
import img3 from '../../images/no.svg'
import img4 from '../../images/shares.svg'
import img5 from '../../images/close.svg'
import img6 from '../../images/comment.svg'
import Spinner from 'react-spinner-material';

import { useToasts } from 'react-toast-notifications';

import back from '../../images/bleu back.png'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirm-alert-override.css';


const ShowPoll = () => {
  const [pubs, setPubs] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const username = localStorage.getItem('username');
  const [userData, setUserData] = useState(null);
const formData = new FormData();
    formData.append('username', username);
  const { addToast } = useToasts();
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [clickCount,setClickCount] = useState(1);

  
  useEffect(() => {
    const token = localStorage.getItem('access');
  
    // fetch all_pubs API call separately
    fetch('http://127.0.0.1:5000/api/v1/auth/all_pubs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPubs(data);
          
        } else {
          console.log('Invalid all_pubs data format:', data);
        }
      })
      .catch(error => console.log(error));
  
      if (clickCount > 1) {
        // fetch recommendation and recommended-posts API calls in sequence
        fetch('http://127.0.0.1:5000/api/v1/auth/user-data', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(userData => {
            const recommendationToken = userData.token;
            setLoading(true);
    
            return fetch('http://127.0.0.1:5000/api/v1/auth/recommendation', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${recommendationToken}`
              }
            })
              .then(response => response.json())
              .then(recommendationData => {
                return fetch('http://127.0.0.1:5000/api/v1/auth/recommended-posts', {
                  method: 'POST',
                  body: formData
                })
                  .then(response => response.json())
                  .then(recommendedPosts => {
                    console.log('1', userData)
                    console.log('2', recommendationData);
                    localStorage.setItem('user_interests', recommendationData);
                    console.log('3', recommendedPosts);
                  
    
                    setUserData(userData);
                    setRecommendedPosts(recommendedPosts);
                    setLoading(false);
                    setClickCount(0);
                  })
                  .catch(error => console.log(error));
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      }
    }, [clickCount]);

  
    const prevPubsRef = useRef();
    const prevRecommendedPostsRef = useRef();
    
    useEffect(() => {
      const fetchData = async () => {
        if (Array.isArray(pubs) && prevPubsRef.current !== pubs) {
          const pubPromises = pubs.map(pub => {
            const { username } = pub;
            return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${username}`)
              .then(response => response.json())
              .then(data => ({ ...pub, userImageUrl: data.image_url }))
              .catch(error => {
                console.log(error);
                return pub;
              });
          });
          const updatedPubs = await Promise.all(pubPromises);
          setPubs(updatedPubs);
          prevPubsRef.current = updatedPubs;
        }
    
        if (Array.isArray(recommendedPosts) && prevRecommendedPostsRef.current !== recommendedPosts) {
          const postPromises = recommendedPosts.map(post => {
            const { username } = post;
            return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${username}`)
              .then(response => response.json())
              .then(data => ({ ...post, userImageUrl: data.image_url }))
              .catch(error => {
                console.log(error);
                return post;
              });
          });
          const updatedPosts = await Promise.all(postPromises);
          setRecommendedPosts(updatedPosts);
          prevRecommendedPostsRef.current = updatedPosts;
        }
      };
    
      fetchData();
    }, [pubs, recommendedPosts]);
    
  
  
  const handleInteraction = (pubId, interactionType) => {
    const token = localStorage.getItem('access');
    const buttonStateKey = `${pubId}_${interactionType}`;
  
    // Vérifier si l'utilisateur a déjà voté ou non pour cette publication
    if (buttonStates[buttonStateKey]) {
      // L'utilisateur a déjà voté, donc nous devons supprimer l'interaction
      fetch(`http://127.0.0.1:5000/api/v1/auth/user_vote`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          pub_id: pubId,
          interaction: interactionType
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Gérer la réponse réussie
          setButtonStates({
            ...buttonStates,
            [buttonStateKey]: false,
            [`${pubId}_you_and_${interactionType}`]: false,
          });
          if (interactionType === 'vote_yes_count'  || interactionType === 'trend') {
            setClickCount(clickCount - 1);
          }
        })
        .catch(error => console.log(error));
    } else {
      fetch('http://127.0.0.1:5000/api/v1/auth/user_vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          pub_id: pubId,
          interaction: interactionType
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Handle success response
          if (interactionType === 'vote_yes_count') {
            if (buttonStates[`${pubId}_${interactionType}`]) {
              setButtonStates({
                ...buttonStates,
                [`${pubId}_${interactionType}`]: false,
                [`${pubId}_you_and_vote_yes_count`]: false
              });
            } else {
              setButtonStates({
                ...buttonStates,
                [`${pubId}_${interactionType}`]: true,
                [`${pubId}_you_and_vote_yes_count`]: true,
                [`${pubId}_vote_no_count`]: false,
                [`${pubId}_you_and_vote_no_count`]: false,
                [`${pubId}_trend`]: false,
                [`${pubId}_you_and_trend`]: false,
              });
              setClickCount(clickCount + 1);
            }
          } else if (interactionType === 'vote_no_count') {
            if (buttonStates[`${pubId}_${interactionType}`]) {
              setButtonStates({
                ...buttonStates,
                [`${pubId}_${interactionType}`]: false,
                [`${pubId}_you_and_vote_no_count`]: false
              });
            } else {
              setButtonStates({
                ...buttonStates,
                [`${pubId}_${interactionType}`]: true,
                [`${pubId}_you_and_vote_no_count`]: true,
                [`${pubId}_vote_yes_count`]: false,
                [`${pubId}_you_and_vote_yes_count`]: false,
                [`${pubId}_trend`]: false,
                [`${pubId}_you_and_trend`]: false,
              });
              
            }
          } else if (interactionType === 'trend') {
            if (buttonStates[`${pubId}_${interactionType}`]) {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: false,
              [`${pubId}_you_and_trend`]: false
            });
          } else {
            setButtonStates({
              ...buttonStates,
              [`${pubId}_${interactionType}`]: true,
              [`${pubId}_you_and_trend`]: true,
              [`${pubId}_vote_yes_count`]: false,
              [`${pubId}_you_and_vote_yes_count`]: false,
              [`${pubId}_vote_no_count`]: false,
              [`${pubId}_you_and_vote_no_count`]: false,
            });
          }
          setClickCount(clickCount + 1);
        }
        console.log(clickCount)
      })
      .catch(error => console.log(error));
  };}

  const handleDeletePub = (pubId) => {
    const token = localStorage.getItem('access');
    confirmAlert({
     
      message: 'Are you sure you want to delete this Post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Perform the deletion logic
            fetch(`http://127.0.0.1:5000/api/v1/auth/delete_pub/${pubId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
              .then(response => {
                if (response.ok) {
                  setPubs(pubs.filter(pub => pub.pub_id !== pubId));
                  addToast('post deleted', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 1000, style: { marginTop: "65px" } });
                } else {
                  console.log('Failed to delete pub:', response.status);
                }
              })
              .catch(error => console.log(error));
          }
        },
        {
          label: 'No',
          onClick: () => {
            // Do nothing
          }
        }
      ]
    });
  };


    


 
const handleSharePub = (pubId) => {
 
          const token = localStorage.getItem('access');
          fetch(`http://127.0.0.1:5000/api/v1/auth/share_pub/${pubId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              addToast('Poll shared', { appearance: 'success', autoDismiss: true,
        autoDismissTimeout: 1000,
        style: { marginTop: "65px" } });
              // refresh the page
              window.location.reload();
              
            })

            
            .catch(error => console.log(error));
        }
      
      
    
  
       
       
        
  
  return (
    <div>
     
      {Array.isArray(pubs) && pubs.map(pub => (
        <Form marginTop={40} key={pub.pub_id}>
    {username === pub.username && (
<Button
    className="trash"
    imgSrc={img5}
    onClick={() => handleDeletePub(pub.pub_id)}  />       )}





          <div className='user-info'>
          {pub.userImageUrl ? (
  <img
  
    src={`http://localhost:5000/${pub.userImageUrl}`}
    alt="user-image"
    className='user-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}
  />
) : (
  <img
    src={back}
    alt="user-image"
    className='user-image'
  />
)}

<div className='block-info' >    <h6>{pub.username} </h6>    <p> topic : {pub.topic}</p> {pub.original_username && pub.original_username !== pub.username && (
  <p>Shared from {pub.original_username}</p>
)}

</div>       </div>


          

           
            
            
          
           
          <p className='cap' style={{textAlign: "left"}}>{pub.caption}</p>
           
          <div className="pub-image-container">
  <img
    src={`http://localhost:5000/${pub.url_image}`}
    alt="Poll"
    className='polls-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}

  />

  <div className="button-container" >
  <Button
    className={buttonStates[`${pub.pub_id}_you_and_vote_yes_count`] ? " btn-circle   selected" : buttonStates[`${pub.pub_id}_vote_yes_count`] ? " btn-circle" : " btn-circle unselected"}
    
    imgSrc={img2}
    onClick={() => handleInteraction(pub.pub_id, 'vote_yes_count')}
  />

  <Button
    className={buttonStates[`${pub.pub_id}_you_and_vote_no_count`] ? "btn-circle selected" : buttonStates[`${pub.pub_id}_vote_no_count`] ? "btn-circle" : "btn-circle unselected"}
    imgSrc={img3}
    onClick={() => handleInteraction(pub.pub_id, 'vote_no_count')}

  />
</div>

</div>


<div className='bar1'><img src={img1} />  <img src={img2}/>  <img src={img3}/> {` ${pub.trend + pub.vote_yes_count+ pub.vote_no_count}`} {pub.user_vote.map(vote => {
  if (vote.username === username) {
    return 'You voted ';
    ;
  } else {
    return '';
  }
}).join('')} </div>
<div className='bar2'><img src={img4}/>  <img src={img6}/>{` ${pub.shares + pub.comment_count}`} </div>


 
<div className='react-bar'>
<Button
  className={
    buttonStates[`${pub.pub_id}_you_and_trend`] ? "btn btn-react trend selected" : buttonStates[`${pub.pub_id}_trend`] ? "btn btn-react" : "btn btn-react "
  }
  width={100}
  height={40}
  onClick={() => handleInteraction(pub.pub_id, 'trend')}
  imgSrc={img1}
/>


<Comment pubId={pub.pub_id} />


<Button
  className="btn btn-react"
  width={100}
  height={40}
  imgSrc={img4}
  onClick={() =>handleSharePub(pub.pub_id)}
/>

</div>

    
        </Form>
       
      ))}
       


       {loading ? (
  <div className="spinner-container">
    <Spinner radius={60} color={'#3f51b5'} stroke={5} visible={true} />
  </div>
) : (
  <div>
  {Array.isArray(recommendedPosts) && recommendedPosts.map(post => (
  <Form marginTop={40} key={post.pub_id}>
    {username === post.username && (
      <Button
        className="trash"
        imgSrc={img5}
        onClick={() => handleDeletePub(post.pub_id)} />
    )}

    <div className='user-info'>
      {post.userImageUrl ? (
        <img
          src={`http://localhost:5000/${post.userImageUrl}`}
          alt="user-image"
          className='user-image'
        />
      ) : (
        <img
          src={back}
          alt="user-image"
          className='user-image'
        />
      )}

      <div className='block-info'>
        <h6>{post.username}</h6>
        <p>Topic: {post.topic}</p>
        {post.original_username && post.original_username !== post.username && (
          <p>Shared from {post.original_username}</p>
        )}

</div>       </div>


          

           
            
            
          
           
          <p className='cap' style={{textAlign: "left"}}>{post.caption}</p>
           
          <div className="pub-image-container">
  <img
    src={`http://localhost:5000/${post.url_image}`}
    alt="Poll"
    className='polls-image'
    onError={(e) => { e.target.onerror = null; e.target.src = back }}

  />

  <div className="button-container" >
  <Button
    className={buttonStates[`${post.pub_id}_you_and_vote_yes_count`] ? " btn-circle   selected" : buttonStates[`${post.pub_id}_vote_yes_count`] ? " btn-circle" : " btn-circle unselected"}
    
    imgSrc={img2}
    onClick={() => handleInteraction(post.pub_id, 'vote_yes_count')}
  />

  <Button
    className={buttonStates[`${post.pub_id}_you_and_vote_no_count`] ? "btn-circle selected" : buttonStates[`${post.pub_id}_vote_no_count`] ? "btn-circle" : "btn-circle unselected"}
    imgSrc={img3}
    onClick={() => handleInteraction(post.pub_id, 'vote_no_count')}

  />
</div>

</div>


<div className='bar1'><img src={img1} />  <img src={img2}/>  <img src={img3}/> {` ${post.trend + post.vote_yes_count+ post.vote_no_count}`  } {post.user_vote.map(vote => {
  if (vote.username === username) {
    return 'You voted ';
    ;
  } else {
    return '';
  }
}).join('')} 
 </div>
<div className='bar2'><img src={img4}/>  <img src={img6}/>{` ${post.shares + post.comment_count}`} </div>


 
<div className='react-bar'>
<Button
  className={
    buttonStates[`${post.pub_id}_you_and_trend`] ? "btn btn-react trend selected" : buttonStates[`${post.pub_id}_trend`] ? "btn btn-react" : "btn btn-react "
  }
  width={100}
  height={40}
  onClick={() => handleInteraction(post.pub_id, 'trend')}
  imgSrc={img1}
/>


<Comment pubId={post.pub_id} />


<Button
  className="btn btn-react"
  width={100}
  height={40}
  imgSrc={img4}
  onClick={() =>handleSharePub(post.pub_id)}
/>

</div>

    
        </Form>
       
      ))}





       



</div>
)}











       
    </div>

  );
};

export default ShowPoll;