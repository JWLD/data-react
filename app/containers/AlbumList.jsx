import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

class AlbumList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: []
    };
  }

  getAlbums() {
    Axios.get(`http://localhost:3000/albums?artistId=${this.props.artist}`, { withCredentials: true })
      .then((response) => {
        if (response.data.error) return console.log(response.data.error.message);

        return console.log(response.data);
      })
      .catch((err) => {
        return console.log(err.response.data);
      });
  }

  render() {
    if (this.props.artist) {
      this.getAlbums();
    }

    return (
      <section></section>
    )
  }
};

const mapStateToProps = (state) => ({
  artist: state.artist
});

export default connect(mapStateToProps)(AlbumList);
