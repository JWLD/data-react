import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import AlbumTile from '../components/AlbumTile';

class AlbumList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentArtist: '',
      albums: []
    };
  }

  getAlbums() {
    Axios.get(`http://localhost:3000/albums?artistId=${this.props.artist}`, { withCredentials: true })
      .then((response) => {
        if (response.data.error) return console.log(response.data.error.message);

        console.log(response.data.items);

        this.setState({
          currentArtist: this.props.artist,
          albums: response.data.items
        });
      })
      .catch((err) => {
        return err.response ? console.log(err.response.data) : console.log(err);
      });
  }

  render() {
    // only get albums if artist is new
    if (this.props.artist && this.props.artist !== this.state.currentArtist) {
      this.getAlbums();
    }

    const albums = this.state.albums.map((album) => {
      const imgUrl = album.images[1] ? album.images[1].url : null;
      const imgStyle = { backgroundImage: `url(${imgUrl})` };

      return <AlbumTile key={album.id} {...album} imgStyle={imgStyle} />;
    });

    return (
      <section className="album-sctn">
        <ul>{albums}</ul>
      </section>
    )
  }
};

const mapStateToProps = (state) => ({
  artist: state.artist
});

export default connect(mapStateToProps)(AlbumList);
