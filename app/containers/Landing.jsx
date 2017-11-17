import React from 'react';

import Header from '../components/Header';
import ArtistSearch from './ArtistSearch';
import AlbumList from './AlbumList';

const Landing = () => (
  <div className="app">
    <Header />
    <div className="main">
      <ArtistSearch />
      <AlbumList />
    </div>
  </div>
);

export default Landing;
