import React from 'react';
import { useState } from 'react';

import './Login.css';

import loginart from '../../assets/login-art.png';

// use navigate to redirect to another page
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const routeChange = () =>{ 
    const path = '/home'; 
    navigate(path);
  };

  const routeSubmit = () =>{
    const path = '/register';
    navigate(path);
  };

  // States for registration
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // send email and password to auth server

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5501/login', {
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
    // console.log(data);
    localStorage.setItem('token', data.token);
    data.token && routeChange();
  };

  const handleNameLogin = (e: any) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // // Handling the email change
  // const handleEmail = (e:any) => {
  //   // setEmail(e.target.value);
  //   setSubmitted(false);
  // };
 
  // Handling the password change
  const handlePasswordLogin = (e:any) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmitLogin= (e:any) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      login(name, password);
      // navigate to dashboard
    }
  };
 
  // Showing success message

  const successMessageLogin = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully logged in!</h1>
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
        <div className='login-form'>
          <div>
            <h1>User Login</h1>
          </div>
          <div className="messages">
            {errorMessage()}
            {successMessageLogin()}
          </div>
          <form className='form'>
            {/* Labels and inputs for form data */}
            <label className="label">Email </label>
            <input onChange={handleNameLogin} className="login-input"
              type="text" />
 
            <label className="label">Password </label>
            <input onChange={handlePasswordLogin} className="login-input"
              type="password" />
 
            <button onClick={handleSubmitLogin} className="btn" type="submit">
          Submit
            </button>
            <button onClick={routeSubmit} className="btn" type="submit">
          Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;