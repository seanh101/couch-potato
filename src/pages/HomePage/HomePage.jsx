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
      <h3>Instructions:</h3>
      <p>Click Search Streams, input a title, and shake the potato to see the streaming availability of a movie</p>
      <p>Click Search Movies & TV to search and select a movie to be added to your favorites </p>
      <p>Click Favorites to view your saved favorites</p>
      <p>Clicking the logo directs to Stream Search</p>
      <p>*Made with Watchmode API and themovienight API via Rapid API*</p>
    </div>
  );
}

export default HomePage;
