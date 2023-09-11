/*
import React, { useState, useEffect } from 'react';
  import { Inputs, Button, Title, Form } from '../components/index';
  import { Link, useNavigate } from 'react-router-dom';
  import './Edit.css';
  const Edit = () => {
    const [img, setImg] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [url_image, setImage] = useState('');
    const token = localStorage.getItem('access');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
   
  
    useEffect(() => {
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
            setName(user.name);
            setSurname(user.surname);
            setUsername(user.username);
            setPassword(user.password); 
            setBirthday(user.birthday);
            setImage(user.url_image);
            setGender(user.gender);
          })
          .catch(error => console.error(error));
      }
    }, [token, navigate]);
  
    const handleChange = (event) => {
      const selectedFile = event.target.files[0];
      setImg(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl); 
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const userOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          birthday: birthday,
          gender: gender,
          password:password
        })
      };
  
      const formData = new FormData();
      if (img) {
        formData.append('img', img);
      }
  
      const imageOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      };
  
      const response = await Promise.all([
        fetch('http://127.0.0.1:5000/api/v1/auth/updateuser', userOptions),
        fetch('http://127.0.0.1:5000/api/v1/auth/updateimg', imageOptions)
      ]);
  
      const data = await Promise.all(response.map(res => res.json()));
  
      console.log(data[0], data[1]);
      alert("user updated")
  
      navigate('/Home');
    };
  
    return (
      <div style={{ marginBottom: 30 }}>
        <Form onSubmit={handleSubmit}>
          <center>
            <label style={{ textAlign: 'center' }}>
              <Title title="Edit my profile" />
            </label>
            <div className='cercle' style={{backgroundImage: `url(${imageUrl || "http://127.0.0.1:5000/" + url_image})`}}>

              <label htmlFor="upload-input">
                <i class="bi bi-file-plus color"></i>
              </label>
              <input
                id="upload-input"
                className="upload-input"
                type="file"
                style={{
                  display: 'none',
                  cursor: 'pointer',
                }}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: '#1D2C59', textAlign: 'center', fontSize: '13px' }}>
              Upload your profile picture
            </p>
  
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <label className='edit-label'> Username</label>
          <Inputs
  
  type="text"
  placeholder="Your username"
  className="form-control inpt"
  width={100}
  value={username}
  onChange={(event) => setUsername(event.target.value)}
/>
<label className='edit-label'> Password</label>

      <Inputs
        type="text"
        placeholder="Your password"
        className="form-control inpt"
        width={100}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
            <label className='edit-label'> Surname</label>

          <Inputs
            type="text"
            placeholder="Your surname"
            className="form-control inpt"
            width={100}
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
                <label className='edit-label'>Name</label>

           <Inputs
            type="text"
            placeholder="Your name"
            className="form-control  inpt"
            width={100}
            
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
                <label className='edit-label'> Date of birth</label>

        <Inputs
          type="text"
          placeholder="Your date of birth : YYYY-MM-DD"
          className="form-control inpt width={450}"
          width={100}
         

          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          />
        <label className='edit-label'> Gender</label>

          <select
            className="form-control list"
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)} 
          >
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
          <Link to ="/Home">
          <Button
            className="btn btn-primary"
           
            height={40}
            text="Save Chasnges"
            fontSize={15}
            onClick={handleSubmit}
          />
          </Link>
          <Link to="/">
          <Button
            className="btn btn-light"
            marginTop={5}
            text="Cancel ?"
          />
        </Link>
         
        </center>
      </Form>
      </div>
    );
  };
  
  export default Edit;
 
  *//*import React, { useState, useEffect } from 'react';
  import { Inputs, Button, Title, Form } from '../components/index';
  import { Link, useNavigate } from 'react-router-dom';
  import moment from 'moment';

  import './Edit.css';
  const Edit = () => {
    const [img, setImg] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [url_image, setImage] = useState('');
    const token = localStorage.getItem('access');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
   
  
    useEffect(() => {
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
            setName(user.name);
            setSurname(user.surname);
            setUsername(user.username);
            setPassword(user.password); 
            setBirthday(user.birthday);
            setImage(user.url_image);
            setGender(user.gender);
          })
          .catch(error => console.error(error));
      }
    }, [token, navigate]);
  
    const handleChange = (event) => {
      const selectedFile = event.target.files[0];
      setImg(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl); 
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const userOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          birthday: birthday,
          gender: gender,
          password:password
        })
      };
  
      const formData = new FormData();
      if (img) {
        formData.append('img', img);
      }
  
      const imageOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      };
  
      const response = await Promise.all([
        fetch('http://127.0.0.1:5000/api/v1/auth/updateuser', userOptions),
        fetch('http://127.0.0.1:5000/api/v1/auth/updateimg', imageOptions)
      ]);
  
      const data = await Promise.all(response.map(res => res.json()));
  
      console.log(data[0], data[1]);
      alert("user updated")
  
      navigate('/Home');
    };
  
    return (
      <div style={{ marginBottom: 30 }}>
        <Form onSubmit={handleSubmit}>
          <center>
            <label style={{ textAlign: 'center' }}>
              <Title title="Edit my profile" />
            </label>
            <div className='cercle' style={{backgroundImage: `url(${imageUrl || "http://127.0.0.1:5000/" + url_image})`}}>

              <label htmlFor="upload-input">
                <i class="bi bi-file-plus color"></i>
              </label>
              <input
                id="upload-input"
                className="upload-input"
                type="file"
                style={{
                  display: 'none',
                  cursor: 'pointer',
                }}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: '#1D2C59', textAlign: 'center', fontSize: '13px' }}>
              Upload your profile picture
            </p>
  
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <label className='edit-label'> Username</label>
          <Inputs
  
  type="text"
  placeholder="Your username"
  className="form-control inpt"
  width={100}
  value={username}
  onChange={(event) => setUsername(event.target.value)}
/>
<label className='edit-label'> Password</label>

      <Inputs
        type="text"
        placeholder="Your password"
        className="form-control inpt"
        width={100}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
            <label className='edit-label'> Surname</label>

          <Inputs
            type="text"
            placeholder="Your surname"
            className="form-control inpt"
            width={100}
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
                <label className='edit-label'>Name</label>

           <Inputs
            type="text"
            placeholder="Your name"
            className="form-control  inpt"
            width={100}
            
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
                <label className='edit-label'> Date of birth</label>

        <Inputs
          type="text"
          placeholder="Your date of birth : YYYY-MM-DD"
          className="form-control inpt width={450}"
          width={100}
         

          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          />
        <label className='edit-label'> Gender</label>

          <select
            className="form-control list"
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)} 
          >
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
          <Link to ="/Home">
          <Button
            className="btn btn-primary"
           
            height={40}
            text="Save Chasnges"
            fontSize={15}
            onClick={handleSubmit}
          />
          </Link>
          <Link to="/">
          <Button
            className="btn btn-light"
            marginTop={5}
            text="Cancel ?"
          />
        </Link>
         
        </center>
      </Form>
      </div>
    );
  };
  
  export default Edit;
 */ 
  import React, { useState, useEffect } from 'react';
  import { Inputs, Button, Title, Form } from '../components/index';
  import { Link, useNavigate } from 'react-router-dom';
  import moment from 'moment';
  import { useToasts } from "react-toast-notifications"; 

  import './Edit.css';

  const Edit = () => {
    const [img, setImg] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [url_image, setImage] = useState('');
    const token = localStorage.getItem('access');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const { addToast } = useToasts();

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
      const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setImg(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setImageUrl(objectUrl); 
      };
    
      const handleChangeName = (event) => {
        setName(event.target.value);
        setNameError('');
      };
      
    const handleSurnameChange = (event) => {
      setSurname(event.target.value);
      setSurnameError('');
    };
    const handleChangeUsername = (event) => {
      setUsername(event.target.value);
      setUsernameError('');
    };
    
    const handleChangeBirthday = (event) => {
      setBirthday(event.target.value);
      setBirthdayError('');
    };
    
    const handleChangeGender = (event) => {
      setGender(event.target.value);
      setGenderError('');
    };
    
     useEffect(() => {
        const token = localStorage.getItem('access');
        if (!token) {
          navigate('/');
        }
      }, []);
  
    useEffect(() => {
    
        fetch('http://127.0.0.1:5000/api/v1/auth/usershow', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(data => {

            const user = JSON.parse(data.user);
            const userBirthday = user.birthday["$date"]; // Get the timestamp
            const birthdayDate = new Date(userBirthday); // Convert to a Date object
            const year = birthdayDate.getFullYear().toString(); // Get the year as string
            const month = (birthdayDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month as string, padded with leading zero if necessary
            const day = birthdayDate.getDate().toString().padStart(2, '0'); // Get the day as string, padded with leading zero if necessary
            const birthdayString = `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
            setName(user.name);
            setSurname(user.surname);
            setUsername(user.username);
            setBirthday(birthdayString); // Stockage de la date dans l'état de votre application
            setImage(user.url_image);
            setGender(user.gender);
          })
          .catch(error => console.error(error));
      }
    , [token, navigate]);
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      // Vérifier les autres champs de saisie
      const validName = /^[a-zA-Z\s]+$/;
      const validDate = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    
      let errorFound = false;
     
      if (!name || !validName.test(name)) {
        setNameError('Please enter a valid name');
        errorFound = true;
      } else {
        setNameError('');
      }
    
      if (!surname || !validName.test(surname)) {
        setSurnameError('Please enter a valid surname');
        errorFound = true;
      } else {
        setSurnameError('');
      }
    
      if (!username) {
        setUsernameError('Please enter a valid username');
        errorFound = true;
      } else {
        setUsernameError('');
      }
    
      if (!birthday || !validDate.test(birthday)) {
        setBirthdayError('Please enter a valid date (YYYY-MM-DD)');
        errorFound = true;
      } else {
        setBirthdayError('');
      }
    
      if (!gender) {
        setGenderError('Please select a valid gender');
        errorFound = true;
      } else {
        setGenderError('');
      }
    
      if (errorFound) {
        setIsLoading(false);
        return;
      }
    
      const userOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          birthday: birthday,
          gender: gender
     })
      };
  
      const formData = new FormData();
      if (img) {
        formData.append('img', img);
      }
  
      const imageOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      };
  
      const response = await Promise.all([
        fetch('http://127.0.0.1:5000/api/v1/auth/updateuser', userOptions),
        fetch('http://127.0.0.1:5000/api/v1/auth/updateimg', imageOptions)
      ]);
  
      const data = await Promise.all(response.map(res => res.json()));
  
      console.log(data[0], data[1]);
      addToast('User created successfully', { appearance: 'success', autoDismiss: true,
      autoDismissTimeout: 1000,
      style: { marginTop: "65px" },});
  
      navigate('/Home');
      window.location.reload();
    };
  
    return (
      <div style={{ marginBottom: 30 }}>
        <Form onSubmit={handleSubmit}>
          <center>
            <label style={{ textAlign: 'center' }}>
              <Title title="Edit my profile" />
            </label>
            <div className='cercle' style={{backgroundImage: `url(${imageUrl || "http://127.0.0.1:5000/" + url_image})`}}>

              <label htmlFor="upload-input">
              <i class="bi bi-pencil color"></i>
              </label>
              <input
                id="upload-input"
                className="upload-input"
                type="file"
                style={{
                  display: 'none',
                  cursor: 'pointer',
                }}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: '#1D2C59', textAlign: 'center', fontSize: '13px' }}>
              Upload new profile picture
            </p>
  
          <label className='edit-label'> Username</label>
          <Inputs
  
  type="text"
  placeholder="Your username"
  className="form-control inpt"
  width={100}
  value={username}
  onChange={handleChangeUsername}
/>
{usernameError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {usernameError}
  </div>
  )}
  

            <label className='edit-label'> Surname</label>

          <Inputs
            type="text"
            placeholder="Your surname"
            className="form-control inpt"
            width={100}
            value={surname}
            onChange={handleSurnameChange}
          />
          {surnameError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {surnameError}
  </div>
  )}
                <label className='edit-label'>Name</label>

           <Inputs
            type="text"
            placeholder="Your name"
            className="form-control  inpt"
            width={100}
            
            value={name}
            onChange={handleChangeName}
          />
           {nameError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {nameError}
  </div>
  )}
                <label className='edit-label'> Date of birth</label>

        <Inputs
          type="text"
          placeholder="Your date of birth : YYYY-MM-DD"
          className="form-control inpt width={450}"
          width={100}
         

          value={birthday}
          onChange={handleChangeBirthday}
          />
          {birthdayError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {birthdayError}
  </div>
  )}
        <label className='edit-label'> Gender</label>

          <select
            className="form-control list"
            id="gender"
            value={gender}
            onChange={handleChangeGender} 
          >
            <option disabled>Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
          {genderError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {genderError}
  </div>
  )}
          <Link to ="/Home">
         
          <Button
            className="btn btn-primary"
            height={40}
            text="Save Changes"
            fontSize={15}
            onClick={handleSubmit}
          />
          </Link>
          <Link to="/Home">
          <Button
            className="btn btn-light"
            marginTop={5}
            p="Cancel ?"
          />
        </Link>
         
        </center>
      </Form>
      </div>
    );
  };
  
  export default Edit;
 