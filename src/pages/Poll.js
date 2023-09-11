/*
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Title, Button, Sidebar, Form } from '../components';
import exit from '../images/exit.svg'

import './Poll.css';

const Poll = () => {
  const [topic, setTopic] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [pubId, setPubId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { addToast } = useToasts();

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };


  
  const handleDelete = () => {
    setImageUrl(null);
    setImage(null);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access');
    const userOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        topic: topic,
        caption: caption,
        pub_id: pubId
      }),
    };
  
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/create_pub', userOptions);
    const data = await response.json();
    const pubId = data.pub_id;
    setPubId(pubId);
  
    const formData = new FormData();
    formData.append('pub_id', pubId);
    formData.append('image', image);

    const imageOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
  
    const imageResponse = await fetch('http://127.0.0.1:5000/api/v1/auth/pubimg', imageOptions);
    const imageData = await imageResponse.json();
    
    const imageUrl = `C:/Users/yamina/pepolls-ai/Back-end/src${imageData.url_image}`;
    const newImageUrl = imageUrl.replace(/\//g, '\\');
        console.log(newImageUrl);
    

    const imagePath = newImageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    console.log(imagePath);

    formData.append('image', imageUrl);
  
    const modelOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    };
  
    const modelResponse = await fetch('http://127.0.0.1:5000/api/v1/auth/model', modelOptions);
    const modelData = await modelResponse.json();
    console.log(modelData);
  
    if (response.ok && imageResponse.ok && modelResponse.ok) {
      addToast('Publication created successfully!', { appearance: 'success', autoDismiss: true,
      autoDismissTimeout: 1000, });
      navigate('/Home');
    } else {
      addToast('An error occurred while creating the publication! ', { appearance: 'error' ,  autoDismiss: true,
      autoDismissTimeout: 5000,
       }); // <-- add the success message});
    }
  };
  

  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <div>
        

        <Sidebar />
        
      </div>

     
      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            
            <Form width={600} height={500} marginTop={30}>
            <div className='header'>
              
              <Title title="Create poll " />
              <select className=" topic"onChange={(e) => setTopic(e.target.value)}>
              <option value="">Add topic</option>
              <option value="Family">Family👪</option> 
            <option value="Announces">Announces 📣</option> 
            <option value="Anime">Anime 📺</option>
            <option value="Books">Books📖</option>
            <option value="Startups">Startups🚀</option>
           

              </select>
             
          </div>
          
        <textarea className="imginpt" rows="3" cols="70" placeholder="Ask your friends what's on your mind?"          onChange={(e) => setCaption(e.target.value)}
/>
<div className="image-container">
      <div className="pubimage" style={{ backgroundImage: `url(${imageUrl})` }}>
        {image && (
          <i className="bi bi-trash" onClick={handleDelete}></i>




)}
        {!image && (
          <div className="upload-container">
            <label htmlFor="file-input">
              <i className="bi bi-upload"></i>
            </label>
            <input
              id="file-input"
              type="file"
              style={{
                opacity: 0,
                position: "absolute",
                cursor: "pointer",
              }}
              onChange={handleChange}
            />
          </div>
        )}
    </div>
</div>
<Button
            className="btn btn-primary "
            width={120}
            height={40}
            text="Palace poll"
            fontSize={15}
            onClick={handleSubmit}
          />
                   <Link to="/Home">
          <Button
            className="btn btn-light"
            width={120}
            height={40}
            fontSize={14}
            marginLeft={5}
            p="cancel ?"

          />
        </Link>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll; */ 
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Title, Button, Sidebar, Form } from '../components';

import exit from '../images/exit.svg'

import './Poll.css';

const Poll = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [pubId, setPubId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [captionError, setCaptionError] = useState(null);
  const [topicError, setTopicError] = useState(null);
  const { addToast } = useToasts();
  const [isPostValid, setIsPostValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };


  
  const handleDelete = () => {
    setImageUrl(null);
    setImage(null);
  };

  const validatePost = () => {
    let valid = true;
    let errors = {};
    
    if (!topic) {
      errors.topic = 'Please select a topic';
      valid = false;
    }
    
    if (!caption || caption.length < 3) {
      errors.caption = 'Caption should be at least 3 characters long';
      valid = false;
    } else if (caption.length > 500) {
      errors.caption = 'Poll should not exceed 500 characters';
      valid = false;
    }
    
    
    setTopicError(errors.topic || '');
    setCaptionError(errors.caption || '');
    setIsPostValid(valid);
    
    return valid;
  };
  
  const handleTopicChange = (event) => {
    setTopic(event.target.value);
    setTopicError('');
  };
  
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
    setCaptionError('');
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
      
    const isValid = validatePost();
      
    if (!isValid) {
      return;
    }
      
    setIsLoading(true);
      
    const token = localStorage.getItem('access');
    let pubId;
    const userOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        topic: topic,
        caption: caption,
        pub_id: pubId
      }),
    };
    
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/create_pub', userOptions);
    const data = await response.json();
    pubId = data.pub_id;
    setPubId(pubId);
    if (response.ok) {
      addToast('Poll created successfully', { appearance: 'success', autoDismiss: true,
      autoDismissTimeout: 1000,
      style: { marginTop: "65px" },});
      navigate('/Home');
      localStorage.removeItem('token');    }
    const formData = new FormData();
    formData.append('pub_id', pubId);
    formData.append('image', image);
    
    const imageOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    
    const imageResponse = await fetch('http://127.0.0.1:5000/api/v1/auth/pubimg', imageOptions);
    const imageData = await imageResponse.json();
    
    const imageUrl = `C:/Users/dell/Desktop/pepolls-ai/pepolls-ai-main/Back-end/src${imageData.url_image}`;
    const newImageUrl = imageUrl.replace(/\//g, '\\');
    console.log(newImageUrl);
    
    const imagePath = newImageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    console.log(imagePath);
    
    formData.append('image', imageUrl);
    
    const modelOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    };
    
    const modelResponse = await fetch('http://127.0.0.1:5000/api/v1/auth/model', modelOptions);
    const modelData = await modelResponse.json();
    console.log(modelData);
    
    setIsLoading(false);
    
   
  

  };
  
  
  const [showModal, setShowModal] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <div>
        

        <Sidebar />
        
      </div>

     
      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            
            <Form marginTop={30}>
            <div className='header'>
              
              <Title title="Create poll " />
              <select className=" topic"onChange={handleTopicChange}>
              <option value="">Add topic</option>
              <option value="family">family👪</option> 
            <option value="announces">announces 📣</option> 
            <option value="anime">anime 📺</option>
            <option value="books">books📖</option>
            <option value="startup">startup🚀</option>
           

              </select>
              
             
          </div>
          
        <textarea className="imginpt" rows="3" cols="70" placeholder="Ask your friends what's on your mind?"          onChange={handleCaptionChange}
/>

<div className="image-container">
      <div className="pubimage" style={{ backgroundImage: `url(${imageUrl})` }}>
        {image && (
          <i className="bi bi-trash" onClick={handleDelete}></i>




)}
        {!image && (
          <div className="upload-container">
            <label htmlFor="file-input">
              <i className="bi bi-upload"></i>
            </label>
            <input
              id="file-input"
              type="file"
              style={{
                opacity: 0,
                position: "absolute",
                cursor: "pointer",
              }}
              onChange={handleChange}
            />
          </div>
        )}
    </div>
</div>
{topicError && (
  <div className="text-danger" style={{ textAlign: "center", fontSize:12}}>
  {topicError}
  </div>
  )}
  {captionError && (
  <div className="text-danger" style={{  textAlign: "center", fontSize:12}}>
  {captionError}
  </div>
  )}
<Button
            className="btn btn-primary "
            width={120}
            height={40}
            text="Palace poll"
            fontSize={15}
            onClick={handleSubmit}
          />
                   <Link to="/Home">
          <Button
            className="btn btn-light"
            width={120}
            height={40}
            fontSize={14}
            marginLeft={5}
            p="cancel ?"

          />
        </Link>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll;  
