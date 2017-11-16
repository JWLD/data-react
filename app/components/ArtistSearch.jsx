import React from 'react';

const ArtistSearch = () => {
  const search = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <section className="artist-sctn">
      <form onSubmit={search}>
        <input name="artist" placeholder="Search for artist" autoComplete="off" />
      </form>

      <div className="artist-sctn__box-wrap">
        <button className="artist-sctn__box"></button>
        <button className="artist-sctn__box"></button>
        <button className="artist-sctn__box"></button>
      </div>
    </section>
  );
};

export default ArtistSearch;
