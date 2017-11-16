import React from 'react';

import Header from '../components/Header';
import ArtistSearch from './ArtistSearch';

const Landing = () => (
  <div className="app">
    <Header />
    <div className="main">
      <ArtistSearch />
    </div>
  </div>
);

export default Landing;
