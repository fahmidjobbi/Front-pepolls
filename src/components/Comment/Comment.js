
/*
import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaPaperPlane } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useToasts } from 'react-toast-notifications';
import './Comment.css'
const Comment = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const { addToast } = useToasts();

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
  }, [])

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } else {
      const pubId = props.pubId;
      const content = commentContent;
      fetch('http://127.0.0.1:5000/api/v1/auth/add_comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pub_id: pubId, content: content })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setCommentContent('');
        fetchComments(pubId);
        addToast('Comment added', { appearance: 'success', autoDismiss: true,
        autoDismissTimeout: 1000,
        style: { marginTop: "65px" } });
        fetchComments(props.pubId);
      
      })
      .catch(error => console.error(error));
    }
  };

  const fetchComments = (pubId) => {
    fetch(`http://127.0.0.1:5000/api/v1/auth/show_comment/${pubId}`)
      .then(response => response.json())
      .then(data => {
        const comments = data.comments;
        const updatedComments = comments.map(comment => {
          return {
            ...comment,
            image_url: ''
          }
        });
        Promise.all(updatedComments.map(comment => {
          return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${comment.username}`)
            .then(response => response.json())
            .then(data => {
              comment.image_url = `http://localhost:5000/${data.image_url}`;
            })
            .catch(error => console.error(error));
        })).then(() => {
          setComments(updatedComments);
        })
      })
      .catch(error => console.error(error));
  };
  

  useEffect(() => {
    const pubId = props.pubId;
    fetchComments(pubId);
  }, [props.pubId]);

 
  const handleCommentDelete = (commentId) => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } else {
      fetch(`http://127.0.0.1:5000/api/v1/auth/delete_comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error('An error occurred while deleting the comment');
        }
      })
      .then(data => {
        console.log(data.message);
        addToast('Comment deleted', { appearance: 'success', autoDismiss: true,
        autoDismissTimeout: 1000,
        style: { marginTop: "65px" } });
        fetchComments(props.pubId);
      })
      .catch(error => {
        console.error(error);
        addToast('Error deleting comment', { appearance: 'error', autoDismiss: true,
        autoDismissTimeout: 500,
        style: { marginTop: "65px" }});
      });
    }
  };
  return (
    <div>
      <div className='comment-container'>
        <div className='comment-form'>
          
          <form onSubmit={handleCommentSubmit}>
            <div className='comment-input-container'>
            {userData && (
            <div>
              <img src={`http://localhost:5000/${userData.url_image}`} className='comment' alt="Profile" style={{ width: '50px', height: '50px' }} />
            </div>
          )}
              <textarea className='comment-textarea' placeholder="Enter your comment" rows="3" cols="70" value={commentContent} onChange={(event) => setCommentContent(event.target.value)} />
              <button type="submit" className='comment-send-button'><FaPaperPlane /></button>
             

            </div>
          </form>
          <div className='comment-List'>
            {comments && comments.map(comment => (
              <div key={comment._id} >
                <div className='comment-input-container'>
                <img src={comment.image_url} alt="Profile" className='comment' style={{ width: '50px', height: '50px' }} />
 <p className='comment-textarea'>{comment.username} : {comment.content} {comment.created_at}</p>
                  <button onClick={() => handleCommentDelete(comment._id)} className='comment-delete-button'><FaTrashAlt /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
 
  
};

export default Comment;*/
import React, { useEffect, useState } from 'react';
import { FaPaperPlane, FaTrashAlt, FaComment,FaTimes} from 'react-icons/fa';
import { Profil, Button, Form } from '../index';

import img1 from '../../images/comment.svg'
import img2 from '../../images/close.svg'
import img3 from '../../images/bigclose.svg'



import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import './Comment.css'
const Comment = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const { addToast } = useToasts();
  const [showComments, setShowComments] = useState(false);
  const [pub, setPub] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const username = localStorage.getItem('username');

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
  }, [])

  useEffect(() => {
    const pubId = props.pubId;
    fetch(`http://127.0.0.1:5000/api/v1/auth/pub/${pubId}`)
      .then(response => response.json())
      .then(data => {
        const pub = JSON.parse(data.pub);
        setPub(pub);
      })
      .catch(error => console.error(error));
    fetchComments(pubId);
  }, [props.pubId]);
  

  
const handleCommentSubmit = (event) => {
  event.preventDefault();
  const token = localStorage.getItem('access');
  if (!token) {
    navigate('/');
  } else {
    const pubId = props.pubId;
    const content = commentContent.trim(); // remove leading and trailing whitespace
    if (content.length === 0) { // check if content is empty
      setErrorMsg('Please enter a comment.');
      return;
    } else if (content.length > 500) { // check if content is too long
      setErrorMsg('Comment is too long (maximum 500 characters).');
      return;
    }
    fetch('http://127.0.0.1:5000/api/v1/auth/add_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ pub_id: pubId, content: content })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      setCommentContent('');
      fetchComments(pubId);
      addToast('Comment added', { appearance: 'success', autoDismiss: true,
        autoDismissTimeout: 1000,
        style: { marginTop: "65px" } });
      fetchComments(props.pubId);
      setErrorMsg('');
    })
    .catch(error => console.error(error));
  }
};

const handleCommentInputChange = (event) => {
  setErrorMsg('');
  setCommentContent(event.target.value);
};


  

  const fetchComments = (pubId) => {
    fetch(`http://127.0.0.1:5000/api/v1/auth/show_comment/${pubId}`)
      .then(response => response.json())
      .then(data => {
        const comments = data.comments;
        const updatedComments = comments.map(comment => {
          return {
            ...comment,
            image_url: ''
          }
        });
        Promise.all(updatedComments.map(comment => {
          return fetch(`http://127.0.0.1:5000/api/v1/auth/user_img/${comment.username}`)
            .then(response => response.json())
            .then(data => {
              comment.image_url = `http://localhost:5000/${data.image_url}`;
            })
            .catch(error => console.error(error));
        })).then(() => {
          setComments(updatedComments);
        })
      })
      .catch(error => console.error(error));
  };
  

  useEffect(() => {
    const pubId = props.pubId;
    fetchComments(pubId);
  }, [props.pubId]);

 
  const handleCommentDelete = (commentId) => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } else {
      fetch(`http://127.0.0.1:5000/api/v1/auth/delete_comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error('An error occurred while deleting the comment');
        }
      })
      .then(data => {
        console.log(data.message);
        addToast('Comment deleted', { appearance: 'success', autoDismiss: true,
        autoDismissTimeout: 1000,
        style: { marginTop: "65px" } });
        fetchComments(props.pubId);
      })
      .catch(error => {
        console.error(error);
        addToast('Error deleting comment', { appearance: 'error', autoDismiss: true,
        autoDismissTimeout: 500,
        style: { marginTop: "65px" }});
      });
    }
  };
  useEffect(() => {
    const root = document.getElementById('root');
    if (showComments) {
      root.classList.add('modal-open');
    } else {
      root.classList.remove('modal-open');
    }
  }, [showComments]);
  
   
         
  return (
    <div className={showComments ? 'modal-open' : ''}>
    <Button
      className="btn btn-react"
      width={100}
      height={40}
      imgSrc={img1}
    p={pub.commnt_count}
      onClick={() => setShowComments(!showComments)}
    />
    <div className='comment-container'>
      <div className='comment-form'>
        <div className='comment-actions'>
          
  

         
        </div>
        {showComments && (
          <div className="blur-background">
=              <div className='comment-header'>
               
                <Button
  className="delete-comment "
  imgSrc={img3}
  onClick={() => setShowComments(false)}

/>  <div className='comment-container2'>

<div className='comment-card post '>

<p className='comment-username2' >{pub.username}</p>
    <p className='post-text'>{pub.caption}</p>
        </div>
<div className='comment-list'>
  {comments && comments.map(comment => (
    <div key={comment._id} className='comment-card'>
       {username === comment.username && (
     <Button
     className='comment-delete'
     onClick={() => handleCommentDelete(comment._id)}
     imgSrc={img2}
   />    )}
      
      <div className='user-comment'>
        <img src={comment.image_url} alt="Profile" className='comment-avatar' />
        <p className='comment-username2'>{comment.username} </p>
      </div>
      
          <p className='comment-text'>{comment.content}   </p>
        </div>
  ))}
  </div>
</div>
</div>

              <form onSubmit={handleCommentSubmit}>
                <div className='comment-input-container comment-input'>
                  {userData && (
                    <div>
                      <img src={`http://localhost:5000/${userData.url_image}`} className="comment-avatar" alt="Profile"  />
                    </div>
                  )}
      <textarea className='comment-textarea' placeholder="Enter your comment" rows="3" cols="70" value={commentContent} onChange={handleCommentInputChange} />
                  <button type="submit" className='comment-send-button'>
                    <FaPaperPlane />
                  </button>

                  {errorMsg && <div className="comment-error">{errorMsg}</div>}

                </div>
              </form>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
}
  

export default Comment;