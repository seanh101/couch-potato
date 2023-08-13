import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import './AuthPage.css';
import logo from './potato2.jpeg';

export default function AuthPage({ setUser }) {
  const [userPref, setUserPref] = useState('signup');
  
  function handlePref() {
    if (userPref === 'signup') {
      setUserPref('login');
    } else {
      setUserPref('signup');
    }
  }
  
  return (
    <div className='auth-page container-fluid bg-primary text-light py-5'>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="mb-4">Welcome to Couch Potato!</h1>
        <img className="home-logo mb-4" src={logo} alt="Logo" />
        
        <div className="container mb-4">
          {userPref === 'signup' ? (
            <div className="card p-3 bg-light text-dark">
           
              <SignUpForm setUser={setUser} />
            </div>
          ) : (
            <div className="card p-3 bg-light text-dark">
             
              <LoginForm setUser={setUser} />
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

