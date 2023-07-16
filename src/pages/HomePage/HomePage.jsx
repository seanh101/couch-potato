import React from 'react';
import logo from './potato2.jpeg'; 
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Couch Potato!</h1>
      <img className="home-logo" src={logo} alt="Logo" />
      <p>
       Looking for which service is streaming your favorite movie or show?
      </p>
      <p>Couch Potato has you covered!</p>
      <h3>Instructions:</h3>
      <p>Click Search Streams, input a title, and shake the potato to see the streaming availability of a movie</p>
      <p>Clicking the logo directs to Stream Search</p>
      <p>*Made with Watchmode API and themovienight API via Rapid API*</p>
    </div>
  );
}

export default HomePage;
