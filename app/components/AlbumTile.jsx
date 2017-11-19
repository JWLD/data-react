import React from 'react';

const AlbumTile = (props) => (
  <li>
    <div className="album">
      <a
        className="album__img"
        style={props.imgStyle}
        href={props.external_urls.spotify}>
      </a>
      <div className="album__input-wrap">
        <input value={props.name} />
        <input />
        <div className="album__button-wrap">
          <button>ADD</button>
          <button>IGNORE</button>
        </div>
      </div>
    </div>
  </li>
);

export default AlbumTile;
