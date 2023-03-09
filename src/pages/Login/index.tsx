import React from 'react';
import { useState } from 'react';

// use navigate to redirect to another page
import {useNavigate} from 'react-router-dom';


// login calls the backend to check if the user is valid
// const register = async (event: React.MouseEvent) => {
//   event.preventDefault();
//   const response = await fetch('http://localhost:5501/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: 'test',
//       password: 'test',
//     }),
//   });
//   const data = await response.json();
//   console.log(data);
// };

const Login = () => {
  const navigate = useNavigate();
  const routeChange = () =>{ 
    const path = '/home'; 
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
    console.log(data);
    localStorage.setItem('token', data.token);
  };
  
 
  // Handling the name change
  const handleNameRegister = (e: any) => {
    setName(e.target.value);
    setSubmitted(false);
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
  const handlePasswordRegister = (e:any) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handlePasswordLogin = (e:any) => {
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
    }
  };

  const handleSubmitLogin= (e:any) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      login(name, password);
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
    <div>
      <div className="register-form">
        <div>
          <h1>User Registration</h1>
        </div>
 
        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessageRegister()}
        </div>
 
        <form>
          {/* Labels and inputs for form data */}
          <label className="label">Email </label>
          <input onChange={handleNameRegister} className="register-input"
            type="text" />
 
          <label className="label">Password </label>
          <input onChange={handlePasswordRegister} className="register-input"
            type="password" />
 
          <button onClick={handleSubmitRegister} className="btn" type="submit">
          Submit
          </button>
        </form>
      </div>
      <div className='login-form'>
        <div>
          <h1>User Login</h1>
        </div>
        <div className="messages">
          {errorMessage()}
          {successMessageLogin()}
        </div>
        <form>
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
        </form>
      </div>
    </div>
  );
};

export default Login;