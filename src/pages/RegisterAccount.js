/*import React, { useState, useEffect } from 'react';
import { Inputs, Button, Title, Form } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from "react-toast-notifications"; 
import './ContinueC.css';
import'./pages.css'

const RegisterAccount = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToasts();
  useEffect(() => {
  if (image) {
  setImageUrl(URL.createObjectURL(image));
  }
  }, [image]);
  
  const handleChange = (event) => {
  setImage(event.target.files[0]);
  setImageError('');
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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    // Vérifier les autres champs de saisie
    const validName = /^[a-zA-Z]+$/;
    const validDate = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  
    let errorFound = false;
    if (!image) {
      setImageError('Please upload an image');
      errorFound = true;
    } else {
      setImageError('');
    }
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
  
    const token = localStorage.getItem('token');
  
    const userOptions = {
      method: 'POST',
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
    formData.append('image', image);
  
    const imageOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
  
    try {
      // Execute the registration API request and wait for its completion
      await fetch('http://127.0.0.1:5000/api/v1/auth/register', userOptions);
  
      // Execute the upload API request
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/upload', imageOptions);
      const data = await response.json();
  
      addToast('user created', {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 4000,
        style: { marginTop: '65px' },
      });
  
      navigate('/');
      window.location.reload();
      localStorage.removeItem('token');
    } catch (error) {
      addToast(error.message, {
        appearance: 'warning',
        autoDismiss: true,
        autoDismissTimeout: 3000,
        style: { marginTop: '65px' },
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  
  return (
      <div> 
     
      <Form onSubmit={handleSubmit} >
    
          <label style={{ textAlign: 'center' }}>
            <Title title="Let's get to know each other " />
          </label>
          {imageError && (
        <div className="text-danger" style={{ textAlign: "center" }}>
          {imageError}
  </div>
  )}
    <center>
         
          <div
            className='cercle'
            style={{
              backgroundImage:`url(${imageUrl})`,
            }}
          >
            <i class="bi bi-file-plus color"></i>
            <input
              className='upload-input'
              type="file"
              style={{
                opacity: 0,
                position: 'absolute',
                cursor: 'pointer',
              }}
              onChange={handleChange}
            />
           
          
          </div>
          </center>
          <p style={{ color: '#1D2C59', textAlign: 'center', fontSize: '13px' }}>
            upload your profile pictures
          </p>
         
          
          <Inputs
            type="text"
            placeholder="Your name"
            className="form-control inpt"
            width={100}
           
            value={name}
            onChange={handleChangeName}
          />
        {nameError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {nameError}
  </div>
  )}

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
          <select
            className="form-control list"
            id="gender"
            value={gender}
            onChange={handleChangeGender} 
          >
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
          {genderError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {genderError}
  </div>
  )}
   <Link to="/">
         
          <Button
            className="btn btn-primary"
           
            text={isLoading ? "Loading..." : "Continue"}
            fontSize={15}
            onClick={handleSubmit}
            
          />
          </Link>
        
         
          <Link to="/">
<Button
         className="btn btn-light"
        
        
         p="Alreday have an account ?"
         text=" Login"
         Link="Login"
       />
</Link>
      </Form>
      </div>
    );
  };
  
  export default RegisterAccount;
  */
  
  
  
  import React, { useState, useEffect } from 'react';
import { Inputs, Button, Title, Form } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from "react-toast-notifications"; 
import './ContinueC.css';
import'./pages.css'

const RegisterAccount = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToasts();
  useEffect(() => {
  if (image) {
  setImageUrl(URL.createObjectURL(image));
  }
  }, [image]);
  
  const handleChange = (event) => {
  setImage(event.target.files[0]);
  setImageError('');
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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  const validateGender = () => {
    if (gender !== "male" && gender !== "female" && gender !== "others") {
      setGenderError("Please select a valid gender");
      return false;
    }
    setGenderError("");
    return true;
  };


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
  const isGenderValid = validateGender();
  if (!isGenderValid) {
    setIsLoading(false);
    return;
  }

  if (errorFound) {
    setIsLoading(false);
    return;
  }

  const token = localStorage.getItem('token');

  const userOptions = {
    method: 'POST',
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
  formData.append('image', image);

  const imageOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };


  try {
    // Execute the registration API request and wait for its completion
    const response1 = await fetch('http://127.0.0.1:5000/api/v1/auth/register', userOptions);
    const data1 = await response1.json();

    if (response1.ok) {
      addToast('User created successfully', { appearance: 'success', autoDismiss: true,
      autoDismissTimeout: 1000,
      style: { marginTop: "65px" },});
      navigate('/');
      window.location.reload();
      localStorage.removeItem('token');    } else {
      if (response1.status === 409) {
        throw new Error('Username is already taken');
      } else {
        throw new Error(`Error: ${await response1.text()}`);
      }
    }

    // Execute the upload API request
    const response2 = await fetch('http://127.0.0.1:5000/api/v1/auth/upload', imageOptions);
    const data2 = await response2.json();

    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    addToast(error.message, { appearance: 'error' ,autoDismiss: true,
    autoDismissTimeout: 1000,
    style: { marginTop: "65px" },});
  }
};

  
  return (
      <div> 
     
      <Form onSubmit={handleSubmit} >
    
          <label>
            <Title title="Let's get to know each other " />
          </label>
          
    <center>
         
          <div
            className='cercle'
            style={{
              backgroundImage:`url(${imageUrl})`,
            }}
          >
            <i class="bi bi-file-plus color"></i>
            <input
              className='upload-input'
              type="file"
              style={{
                opacity: 0,
                position: 'absolute',
                cursor: 'pointer',
              }}
              onChange={handleChange}
            />
           
          
          </div>
          </center>
          <p style={{ color: '#1D2C59', textAlign: 'center', fontSize: '13px' }}>
            upload your profile pictures
          </p>
         
          
          <Inputs
            type="text"
            placeholder="Your name"
            className="form-control inpt"
            width={100}
           
            value={name}
            onChange={handleChangeName}
          />
        {nameError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {nameError}
  </div>
  )}

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
          <select
            className="form-control list"
            id="gender"
            value={gender}
            onChange={handleChangeGender} 
          >
            <option>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
          {genderError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {genderError}
  </div>
  )}
   <Link to="/">
         
          <Button
            className="btn btn-primary"
           
            text={isLoading ? "Loading..." : "Continue"}
            fontSize={15}
            onClick={handleSubmit}
            
          />
          </Link>
        
         
          <Link to="/">
<Button
         className="btn btn-light"
        
        
         p="Alreday have an account ?"
         text=" Login"
         Link="Login"
       />
</Link>
      </Form>
      </div>
    );
  };
  
  export default RegisterAccount;