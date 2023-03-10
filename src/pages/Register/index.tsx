
import React, { useState } from 'react';
// States for registration
import {useNavigate} from 'react-router-dom';
import './Register.css';

import loginart from '../../assets/login-art.png';

const Register = () => {

  const navigate = useNavigate();
  const routeChange = () =>{ 
    const path = '/home'; 
    navigate(path);
  };

  const routeLogin = () =>{
    const path = '/login';
    navigate(path);
  };


  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // send email and password to auth server
  const register = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5501/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

 
  // Handling the name change
  const handleNameRegister = (e: any) => {
    setName(e.target.value);
    setSubmitted(false);
  };

 
  // // Handling the email change
  // const handleEmail = (e:any) => {
  //   // setEmail(e.target.value);
  //   setSubmitted(false);
  // };
 
  // Handling the password change
  const handlePasswordRegister = (e:any) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

 
  // Handling the form submission
  const handleSubmitRegister = (e:any) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      register(name, password);
      // navigate to dashboard
      routeChange();
    }
  };

 
  // Showing success message
  const successMessageRegister = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!</h1>
      </div>
    );
  };

 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className='body'>
      <div className='left' >
        <div className='title'>
          <h1 className='title1'>Design APIs fast,</h1>
          <h1 className='title2'>Manage content easily</h1>
        </div>
        <img src={loginart} className="login-art" alt="logo" />
      </div>
      <div className='right'>
        <div className='register-form'>
          <div>
            <h1>User Registration</h1>
          </div>
          <div className="messages">
            {errorMessage()}
            {successMessageRegister()}
          </div>

          <form className='form'>
            {/* Labels and inputs for form data */}
            <label className="label">Email </label>
            <input onChange={handleNameRegister} className="register-input"
              type="text" />

            <label className="label">Password </label>
            <input onChange={handlePasswordRegister} className="register-input"
              type="password" />

            <button onClick={handleSubmitRegister} className="btn" type="submit">Submit
            </button>

            <button onClick={routeLogin} className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;