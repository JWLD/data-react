import React from 'react';
import FaSpotify from 'react-icons/lib/fa/spotify';

const Spotify = () => (
  <header className="header-bar">
    <h1 className="header-bar__title">Spotify Data</h1>
    <a className="header-bar__spotify-btn" href="http://localhost:3000/login">
      <FaSpotify />
    </a>
  </header>
);

export default Spotify;
