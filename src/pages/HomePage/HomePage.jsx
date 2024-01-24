import React from 'react';
import logo from './potato2.jpeg'; 
import './HomePage.css';
import { Helmet } from 'react-helmet';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Welcome to Couch Potato – Your Ultimate Movie and TV Show Streaming Guide!</title>
        <meta name="description" content="Discover where to stream your favorite movies or TV shows with Couch Potato. Your one-stop platform for finding streaming services for all your entertainment needs." />
      </Helmet>
    <div className="home-page">
      <h1>Welcome to Couch Potato – Your Ultimate Movie and TV Show Streaming Guide!</h1>
      <img className="home-logo" src={logo} alt="Couch Potato Logo" />
      <p>
        Ever wondered where to stream your favorite movies or TV shows? Look no further! Couch Potato is your one-stop solution to discover streaming platforms for all your entertainment needs.
      </p>
      <p>Our intuitive platform allows you to effortlessly search and find where movies and TV shows are available for streaming. Whether it's Netflix, Hulu, Amazon Prime, or any other streaming service, Couch Potato keeps you updated with the latest availability.</p>
      <h3>How It Works:</h3>
      <p>Simply click on 'Search Streams,' enter the title of the movie or TV show you're interested in, and give our virtual potato a shake! You'll instantly get information on where your selected title is streaming. It's that easy!</p>
      <p>Also, clicking our logo at any time will bring you back to the Stream Search page for a new search.</p>
      <p>Powered by reliable sources like the Watchmode API and TheMovieNight API via Rapid API, Couch Potato ensures accurate and up-to-date streaming information.</p>
      <p>Start exploring and enjoy a seamless streaming experience with Couch Potato!</p>
    </div>
    </>
  );
}

export default HomePage;
