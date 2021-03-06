import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import AlbumResultsNav from '../components/AlbumResultsNav';
import AlbumTile from './AlbumTile';

class AlbumList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentArtist: '',
      albums: [],
			dbAlbums: [],
			pageData: {}
    };

		this.getAlbums = this.getAlbums.bind(this);
  }

  getAlbums(url) {
    Axios.get(`/api/albums?artistId=${this.props.artist}&page=${encodeURIComponent(url)}`, { withCredentials: true })
      .then((response) => {
				const spotifyData = JSON.parse(response.data.spAlbums);

				const pageData = {
					next: spotifyData.next,
					prev: spotifyData.previous,
					total: spotifyData.total,
					limit: spotifyData.limit,
					offset: spotifyData.offset
				};

        this.setState({
          currentArtist: this.props.artist,
          albums: spotifyData.items,
					dbAlbums: response.data.dbAlbums,
					pageData
        });
      })
      .catch((err) => {
        return err.response ? console.log(err.response.data) : console.log(err);
      });
  }

  render() {
    // only get albums if user has clicked on a new artist
    if (this.props.artist && this.props.artist !== this.state.currentArtist) {
      this.getAlbums(null);
    }

    const albums = this.state.albums.map((album) => {
      const imgUrl = album.images[1] ? album.images[1].url : null;

			const added = this.state.dbAlbums.indexOf(album.id) !== -1;

      return <AlbumTile key={album.id} {...album} albumArt={imgUrl} added={added} />;
    });

    return (
      <section className="album-sctn">
				<AlbumResultsNav
					getAlbums={this.getAlbums}
					data={this.state.pageData}
				/>
        <ul>{albums}</ul>
      </section>
    )
  }
};

const mapStateToProps = (state) => ({
  artist: state.artist
});

export default connect(mapStateToProps)(AlbumList);
