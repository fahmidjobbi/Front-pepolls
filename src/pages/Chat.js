/*el boss import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

import './Chat.css';

const Chat = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pusher, setPusher] = useState(null);
  const [channel, setChannel] = useState(null);

  const { v4: uuidv4 } = require('uuid');
  const token = localStorage.getItem('access');
  const senderUsername = localStorage.getItem('username');
  const [receiverUsername, setReceiverUsername] = useState('');


  useEffect(() => {
    fetch('http://localhost:5000/api/v1/auth/users')
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data;
        setUsers(filteredUsers);
        const receiverUsername = filteredUsers[0].username; // par exemple, pour sélectionner le premier utilisateur de la liste
        // faire quelque chose avec receiverUsername ici
        setReceiverUsername(receiverUsername); // définit le receiverUsername dans le scope global
      })
      .catch(error => console.error(error));
  }, []);


  // Function to handle message submission
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    
    // Create a new message object
    const newMessage = {
      sender_username: senderUsername,
      receiver_username: receiverUsername,
      content: message
    };
    
    // Send the new message to the server
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      });

      const data = await response.json();
      console.log(data);

      // Add the new message to the existing messages
      setMessages([...messages, newMessage]);

    } catch (error) {
      console.error(error);
    }
    
    setMessage('');
  };

  // UseEffect hook to set up Pusher and subscribe to the channel
  useEffect(() => {
    // Initialize Pusher and subscribe to the appropriate channel
    const pusher_client = new Pusher('4f5e11ecf9fcc3689db0', {
      cluster: 'sa1',
      encrypted: true,
      authEndpoint: 'http://localhost:5000/api/v1/auth/pusher/auth',
      auth: {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          user_id:senderUsername,
          channel_name: `private-chat-${senderUsername}-${receiverUsername}`,
        },
      },
    });

    const channel = pusher_client.subscribe(`private-chat-${senderUsername}-${receiverUsername}`);

    // Fetch the initial messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/show_messages/${senderUsername}/${receiverUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    // Listen for new-message events and update the messages state
    channel.bind('new-message', (data) => {
      // Add the new message to the existing messages
      setMessages([...messages, data]);
      console.log("New message received: ", data);
    });
    
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('connected to channel');
    });

    // Set the pusher and channel states
    setPusher(pusher_client);
    setChannel(channel);

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher_client.unsubscribe(`private-chat-${senderUsername}-${receiverUsername}`);
      console.log('disconnected from channel');
    };
  }, [ receiverUsername, senderUsername, token, messages]);

  // Render the chat component

  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setReceiverUsername(user.username);
  };

  const handleMessageChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement sending message
    setMessageText('');
  };

  return (
    <div className="chat">
    <div className="user-list">
      {users.map(user => (
        <div
          key={user.id}
          className={`user ${selectedUser && selectedUser.id === user.id ? 'selected' : ''}`}
          onClick={() => handleUserClick(user)}
        >
          <img src={`http://localhost:5000/${user.url_image}`} alt="Profile" className='profile-image' />
          {user.username}
        </div>
      ))}
    </div>
    <div className="conversation">
      {selectedUser && (
        <>
          <div className="conversation-header">
            Conversation avec {selectedUser.name}
          </div>
          <div className="conversation-messages">
            {Array.isArray(messages) && messages.map((message) => (
              <div key={message._id} className={`message ${message.sender_username === senderUsername ? 'from-me' : 'from-user'}`}>
                <span>{message.sender_username}</span>
                {message.content}
              </div>
            ))}
          </div>
          <form className="conversation-form" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              value={message} onChange={(event) => setMessage(event.target.value)}
              placeholder={`Envoyer un message à ${selectedUser.name}`}
            />
            <button type="submit">Envoyer</button>
          </form>
        </>
      )}
    </div>
  </div> 
  );
};

export default Chat;

*/
/* el 3ez
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const Chat = ({ senderId, receiverUsername, senderUsername }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pusher, setPusher] = useState(null);
  const [channel, setChannel] = useState(null);
  const { v4: uuidv4 } = require('uuid');
  const token = localStorage.getItem('access');

  const handleMessageSubmit = async (event) => {
    event.preventDefault();

    const newMessage = {
      sender_username: senderUsername,
      receiver_username: receiverUsername,
      content: message
    };
    
    setMessages((prevMessages) => {
      if (Array.isArray(prevMessages)) {
        return [...prevMessages, newMessage];
      } else {
        return [newMessage];
      }
    });
    
    setMessage('');
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initialize Pusher and subscribe to the appropriate channel
    const pusher_client = new Pusher('4f5e11ecf9fcc3689db0', {
      cluster: 'sa1',
      encrypted: true,
      authEndpoint: 'http://localhost:5000/api/v1/auth/pusher/auth',
      auth: {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          user_id: senderId,
          channel_name: `private-chat-${senderUsername}-${receiverUsername}`,
        },
      },
    });

    const channel = pusher_client.subscribe(`private-chat-${senderUsername}-${receiverUsername}`);

    // Fetch the initial messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/show_messages/${senderUsername}/${receiverUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    // Listen for new-message events and update the messages state
   
    channel.bind('new-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log("New message received: ", data);
    });
    
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('connected to channel');
    });
    

    // Set the pusher and channel states
    setPusher(pusher_client);
    setChannel(channel);

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher_client.unsubscribe(`private-chat-${senderUsername}-${receiverUsername}`);
      console.log('disconnected from channel');
    };
  }, [senderId, receiverUsername, senderUsername, token]);

  return (
    <div>
     <h1>Chat with {receiverUsername}</h1>
      
        {Array.isArray(messages) && messages.map((message) => (
          <li key={message._id}>
            <span>{message.sender_username}  </span>
            {message.content}
          </li>
        ))}
      
      <form onSubmit={handleMessageSubmit}>
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>

  );
  
};

export default Chat;*/
/*      el hamdolelhh 
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const Chat = ({ senderId, receiverUsername, senderUsername }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pusher, setPusher] = useState(null);
  const [channel, setChannel] = useState(null);
  const { v4: uuidv4 } = require('uuid');
  const token = localStorage.getItem('access');

  const handleMessageSubmit = async (event) => {
    event.preventDefault();

    const newMessage = {
      sender_username: senderUsername,
      receiver_username: receiverUsername,
      content: message
    };
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      });

      const data = await response.json();
      console.log(data);

      // Ajouter le nouveau message aux messages existants
      setMessages([...messages, newMessage]);

    } catch (error) {
      console.error(error);
    }
    
    setMessage('');
  };

  useEffect(() => {
    // Initialize Pusher and subscribe to the appropriate channel
    const pusher_client = new Pusher('4f5e11ecf9fcc3689db0', {
      cluster: 'sa1',
      encrypted: true,
      authEndpoint: 'http://localhost:5000/api/v1/auth/pusher/auth',
      auth: {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          user_id: senderId,
          channel_name: `private-chat-${senderUsername}-${receiverUsername}`,
        },
      },
    });

    const channel = pusher_client.subscribe(`private-chat-${senderUsername}-${receiverUsername}`);

    // Fetch the initial messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/show_messages/${senderUsername}/${receiverUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    // Listen for new-message events and update the messages state
   
    channel.bind('new-message', (data) => {
      // Ajouter le nouveau message aux messages existants
      setMessages([...messages, data]);
      console.log("New message received: ", data);
    });
    
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('connected to channel');
    });
    

    // Set the pusher and channel states
    setPusher(pusher_client);
    setChannel(channel);

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher_client.unsubscribe(`private-chat-${senderUsername}-${receiverUsername}`);
      console.log('disconnected from channel');
    };
  }, [senderId, receiverUsername, senderUsername, token, messages]);

  return (
    <div>
     <h1>Chat with {receiverUsername}</h1>
      
        {Array.isArray(messages) && messages.map((message) => (
          <li key={message._id}>
            <span>{message.sender_username}</span>
            {message.content}
          </li>
        ))}
      
      <form onSubmit={handleMessageSubmit}>
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>

  );
  
};

export default Chat;*/
/*
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pusher, setPusher] = useState(null);
  const [receiverUsername, setReceiverUsername] = useState(null);
  const [channel, setChannel] = useState(null);
  const { v4: uuidv4 } = require('uuid');
  const token = localStorage.getItem('access');
  const senderUsername = localStorage.getItem('username');

  // Function to handle message submission
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    
    // Create a new message object
    const newMessage = {
      sender_username: senderUsername,
      receiver_username: receiverUsername,
      content: message
    };
    
    // Send the new message to the server
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      });

      const data = await response.json();
      console.log(data);

      // Add the new message to the existing messages
      setMessages([...messages, newMessage]);

    } catch (error) {
      console.error(error);
    }
    
    setMessage('');
  };

  // UseEffect hook to set up Pusher and subscribe to the channel
  useEffect(() => {
    // Initialize Pusher and subscribe to the appropriate channel
    const pusher_client = new Pusher('4f5e11ecf9fcc3689db0', {
      cluster: 'sa1',
      encrypted: true,
      authEndpoint: 'http://localhost:5000/api/v1/auth/pusher/auth',
      auth: {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          user_id:senderUsername,
          channel_name: `private-chat-${senderUsername}-${receiverUsername}`,
        },
      },
    });

    const channel = pusher_client.subscribe(`private-chat-${senderUsername}-${receiverUsername}`);

    // Fetch the initial messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/show_messages/${senderUsername}/${receiverUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    // Listen for new-message events and update the messages state
    channel.bind('new-message', (data) => {
      // Add the new message to the existing messages
      setMessages([...messages, data]);
      console.log("New message received: ", data);
    });
    
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('connected to channel');
    });

    // Set the pusher and channel states
    setPusher(pusher_client);
    setChannel(channel);

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher_client.unsubscribe(`private-chat-${senderUsername}-${receiverUsername}`);
      console.log('disconnected from channel');
    };
  }, [ receiverUsername, senderUsername, token, messages]);

  // Render the chat component
  return (
    <div>
     <h1>Chat with {receiverUsername}</h1>
     <input type="text" value={receiverUsername} onChange={(event) => setReceiverUsername(event.target.value)} />

        {Array.isArray(messages) && messages.map((message) => (
          <li key={message._id}>
            <span>{message.sender_username}</span>
            {message.content}
          </li>
        ))}
      
      <form onSubmit={handleMessageSubmit}>
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>

  );
  
};

export default Chat;

*/  




/*

import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

import './Chat.css';

const Chat = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pusher, setPusher] = useState(null);
  const [channel, setChannel] = useState(null);

  const { v4: uuidv4 } = require('uuid');
  const token = localStorage.getItem('access');
  const senderUsername = localStorage.getItem('username');
  const [receiverUsername, setReceiverUsername] = useState('');


  useEffect(() => {
    fetch('http://localhost:5000/api/v1/auth/users')
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data;
        setUsers(filteredUsers);
        const receiverUsername = filteredUsers[0].username; // par exemple, pour sélectionner le premier utilisateur de la liste
        // faire quelque chose avec receiverUsername ici
        setReceiverUsername(receiverUsername); // définit le receiverUsername dans le scope global
      })
      .catch(error => console.error(error));
  }, []);


  // Function to handle message submission
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    
    // Create a new message object
    const newMessage = {
      sender_username: senderUsername,
      receiver_username: receiverUsername,
      content: message
    };
    
    // Send the new message to the server
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      });

      const data = await response.json();
      console.log(data);

      // Add the new message to the existing messages
      setMessages([...messages, newMessage]);

    } catch (error) {
      console.error(error);
    }
    
    setMessage('');
  };

  // UseEffect hook to set up Pusher and subscribe to the channel
  useEffect(() => {
    // Initialize Pusher and subscribe to the appropriate channel
    const pusher_client = new Pusher('4f5e11ecf9fcc3689db0', {
      cluster: 'sa1',
      encrypted: true,
      authEndpoint: 'http://localhost:5000/api/v1/auth/pusher/auth',
      auth: {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          user_id:senderUsername,
          channel_name: `private-chat-${senderUsername}-${receiverUsername}`,
        },
      },
    });

    const channel = pusher_client.subscribe(`private-chat-${senderUsername}-${receiverUsername}`);

    // Fetch the initial messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/show_messages/${senderUsername}/${receiverUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    // Listen for new-message events and update the messages state
    channel.bind('new-message', (data) => {
      // Add the new message to the existing messages
      setMessages([...messages, data]);
      console.log("New message received: ", data);
    });
    
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('connected to channel');
    });

    // Set the pusher and channel states
    setPusher(pusher_client);
    setChannel(channel);

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher_client.unsubscribe(`private-chat-${senderUsername}-${receiverUsername}`);
      console.log('disconnected from channel');
    };
  }, [ receiverUsername, senderUsername, token, messages]);

  // Render the chat component

  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setReceiverUsername(user.username);
  };

  const handleMessageChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement sending message
    setMessageText('');
  };

  return (
    <div className="chat">
    <div className="user-list">
      {users.map(user => (
        <div
          key={user.id}
          className={`user ${selectedUser && selectedUser.id === user.id ? 'selected' : ''}`}
          onClick={() => handleUserClick(user)}
        >
          <img src={`http://localhost:5000/${user.url_image}`} alt="Profile" className='profile-image' />
          {user.username}
        </div>
      ))}
    </div>
    <div className="conversation">
      {selectedUser && (
        <>
          <div className="conversation-header">
            Conversation avec {selectedUser.name}
          </div>
          <div className="conversation-messages">
            {Array.isArray(messages) && messages.map((message) => (
              <div key={message._id} className={`message ${message.sender_username === senderUsername ? 'from-me' : 'from-user'}`}>
                <span>{message.sender_username}</span>
                {message.content}
              </div>
            ))}
          </div>
          <form className="conversation-form" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              value={message} onChange={(event) => setMessage(event.target.value)}
              placeholder={`Envoyer un message à ${selectedUser.name}`}
            />
            <button type="submit">Envoyer</button>
          </form>
        </>
      )}
    </div>
  </div> 
  );
};

export default Chat;*/
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import{ Sidebar , Button , Form ,Inputs , Profil } from '../components/index';
import { Link } from 'react-router-dom';
import topic from '../images/topic.svg';
import explore from '../images/explore.svg';
import plus from '../images/plus.svg';
import logout from '../images/logout.svg';
import { useToasts } from "react-toast-notifications";

import bleu from '../images/bleu back.png'
import './Chat.css';
import { FaPaperPlane} from 'react-icons/fa';


const Chat = () => {
const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pusher, setPusher] = useState(null);
  const [channel, setChannel] = useState(null);
  const [receiverInfo, setReceiverInfo] = useState(null);

  const { v4: uuidv4 } = require('uuid');
  const token = localStorage.getItem('access');
  const senderUsername = localStorage.getItem('username');
  const [receiverUsername, setReceiverUsername] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('access');
   
  };
  const { addToast } = useToasts();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/auth/users')
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data;
        setUsers(filteredUsers);
        const receiverUsername = filteredUsers[0].username;
        setReceiverUsername(receiverUsername);
        setSelectedUser(filteredUsers[0]); // Sélectionne le premier utilisateur par défaut
      })
      .catch(error => console.error(error));
  }, []);
  
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() === '') {
      addToast('Message cannot be empty', { appearance: 'error' , autoDismiss: true,
      autoDismissTimeout: 2000,
      style: { marginTop: '10px' }});
      return;
    }

    if (message.length > 500) {
      addToast('Message cannot exceed 500 characters', { appearance: 'error', autoDismiss: true,
      autoDismissTimeout: 2000,
      style: { marginTop: '10px' } });
      return;
    }
    // Create a new message object
    const newMessage = {
      sender_username: senderUsername,
      receiver_username: receiverUsername,
      content: message
    };
    
    // Send the new message to the server
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      });

      const data = await response.json();
      console.log(data);

      // Add the new message to the existing messages
      setMessages([...messages, newMessage]);

    } catch (error) {
      console.error(error);
    }
    
    setMessage('');
  };
  
 
  // UseEffect hook to set up Pusher and subscribe to the channel
  useEffect(() => {
    // Initialize Pusher and subscribe to the appropriate channel
    const pusher_client = new Pusher('38f395cdd5d2c51d6925', {
      cluster: 'sa1',
      encrypted: true,
      authEndpoint: 'http://localhost:5000/api/v1/auth/pusher/auth',
      auth: {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          user_id:senderUsername,
          channel_name: `private-chat-${senderUsername}-${receiverUsername}`,
        },
      },
    });

    const channel = pusher_client.subscribe(`private-chat-${senderUsername}-${receiverUsername}`);

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/show_messages/${senderUsername}/${receiverUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchMessages();
  

    // Listen for new-message events and update the messages state
    channel.bind('new-message', (data) => {
      // Add the new message to the existing messages
      setMessages([...messages, data]);
      console.log("New message received: ", data);
    });
    
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('connected to channel');
    });

    // Set the pusher and channel states
    setPusher(pusher_client);
    setChannel(channel);

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher_client.unsubscribe(`private-chat-${senderUsername}-${receiverUsername}`);
      console.log('disconnected from channel');
    };
  }, [ receiverUsername, senderUsername, token, messages]);

  // Render the chat component

  
  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setReceiverUsername(user.username);
    setReceiverInfo(user);
  };
  
  

  

  return (
    <div >


<nav className="sidebar-chat sidebar">
      

      <Link to="/Topics">
        <img src={topic} alt="Manage your topics" />
      </Link>

      

      <Link to="/Poll">
        <img src={plus} alt="Place a poll" />
      </Link>
      <Link to="/Home">
        <img src={explore} alt="Explore" />
      </Link>

      <Link to="/" onClick={handleLogout}>
        <img src={logout} alt="Logout" />
      </Link>
    </nav>
    <div className="chat-container">
    <div className="chat">
      
    <div className="user-list">
    <div className="user-list-header">Chats</div>
  
    {users.map(user => (
  // Vérifie si l'utilisateur actuel n'est pas l'expéditeur (user.username !== senderUsername)
  // avant de l'afficher dans la liste des utilisateurs
  user.username !== senderUsername && (
    <div
      key={user.id}
      className={`user ${selectedUser && selectedUser.id === user.id ? 'selected' : ''}`}
      onClick={() => handleUserClick(user)}
    >
      {user.url_image ? (
        <img src={`http://localhost:5000/${user.url_image}`} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = bleu; }} />
      ) : (
        <img src={bleu} alt="Profile" />
      )}
      <span>{user.username}</span>
    </div>
  )
))}



</div>
      <div className="conversation">
        {selectedUser && (
          <>
          
            <div className="conversation-header">
            Chatting with {selectedUser.username}
            </div>
            <div className="new-div">
  {receiverInfo && (
    <>
      {receiverInfo.url_image ? (
        <img src={`http://localhost:5000/${receiverInfo.url_image}`} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = bleu; }} />
      ) : (
        <img src={bleu} alt="Profile" />
      )}
      <p>{receiverInfo.name} {receiverInfo.surname}</p>
      <p>{receiverInfo.email}</p>
      {/* Ajoutez d'autres informations du destinataire selon vos besoins */}
    </>
  )}
</div>


    <div className="conversation-messages">
    {Array.isArray(messages) && messages.slice().reverse().map((message) => (

    <div
      key={message._id}
      className={`message ${message.sender_username === senderUsername ? 'from-me' : 'from-user'}`}
    >                  
      <span className="message-content">{message.content}</span>
    </div>
  ))}
</div>

            <form className="conversation-form" onSubmit={handleMessageSubmit}>
             

<input
   value={message} onChange={(event) => setMessage(event.target.value)}
   placeholder={`Send a message to ${selectedUser.name}`}
  type="text"
  className="form-control inpt"
  
/>

<button type="submit" className='comment-send-button'>                    <FaPaperPlane />
                  </button>
            </form>
          </>
        )}
      </div>
     

    </div> 
  </div>


</div>
  )  
};

export default Chat;