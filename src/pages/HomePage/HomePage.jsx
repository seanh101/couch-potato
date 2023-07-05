import React from 'react';
import logo from './potato2.jpeg'; 
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Couch Potato!</h1>
      <img className="home-logo" src={logo} alt="Logo" />
      <p>
        Couch Potato is a movie streaming platform where you can search for your favorite movies, save them to your favorites, and discover new movies to watch. Get ready to sit back, relax, and enjoy the show!
      </p>
      <p>*Made with Watchmode API and themovienight API via Rapid API*</p>
    </div>
  );
}

export default HomePage;
