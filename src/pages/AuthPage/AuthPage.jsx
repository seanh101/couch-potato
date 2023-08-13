import { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from 'react-router-dom'
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import './AuthPage.css';
import logo from './potato2.jpeg';

export default function AuthPage({ setUser }) {
  const [userPref, setUserPref] = useState('signup');
  const [success, setSuccess] = useState(false); // Add a state for success

  function handlePref() {
    if (userPref === 'signup') {
      setUserPref('login');
    } else {
      setUserPref('signup');
    }
  }

  // Function to handle successful login or signup
  function handleSuccess() {
    // Update user state or perform any other necessary actions
    // Set the success state to true
    setSuccess(true);
  }

  if (success) {
    // Redirect the user to the root page ("/") upon success
    return <Navigate to="/" />;
  }

  return (
    <div className='auth-page container-fluid bg-primary text-light py-5'>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="mb-4">Welcome to Couch Potato!</h1>
        <img className="home-logo mb-4" src={logo} alt="Logo" />

        <div className="container mb-4">
          {userPref === 'signup' ? (
            <div className="card p-3 bg-light text-dark">
              <SignUpForm setUser={setUser} onSuccess={handleSuccess} /> {/* Pass onSuccess prop */}
            </div>
          ) : (
            <div className="card p-3 bg-light text-dark">
              <LoginForm setUser={setUser} onSuccess={handleSuccess} /> {/* Pass onSuccess prop */}
            </div>
          )}
        </div>

        <button className="btn btn-outline-light btn-lg mb-3" onClick={handlePref}>
          {userPref === 'signup' ? 'Already a member? Log In' : 'Need an Account? Sign Up'}
        </button>

        <p>User info can be name: xxx, email: xxx@xxx.com, pword: xxx</p>
      </div>
    </div>
  );
}
