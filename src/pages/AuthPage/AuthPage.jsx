import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import './AuthPage.css';
import logo from './potato2.jpeg'; 

export default function AuthPage({ setUser }) {
  const [userPref, setUserPref] = useState('signup')
  function handlePref() {
    if( userPref === 'signup') {
      setUserPref('login')
    } else {
      setUserPref('signup')
    }
  }
  return (
    <div className='form-container'>
      <h1>Welcome to Couch Potato!</h1>
      <img className="home-logo" src={logo} alt="Logo" />
      
      { userPref === 'signup' ? <SignUpForm setUser={setUser}/> : <LoginForm setUser={setUser} />}
      <button onClick={handlePref}>
        { userPref === 'signup' ? 'Already a member? Log In' : 'Need an Account? Sign Up'}
      </button>
      <p>User info can be name: xxx, email: xxx@xxx.com, pword:xxx </p>
    </div>
    
    
  );
}




