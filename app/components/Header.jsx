import React from 'react';
import FaSpotify from 'react-icons/lib/fa/spotify';

const Spotify = () => {
  return (
    <header className="header-bar">
      <span className="header-bar__title">Spotify Data</span>
      <a className="header-bar__spotify-btn" href="http://localhost:3000/login">
        <FaSpotify />
      </a>
    </header>
  );
};

export default Spotify;
