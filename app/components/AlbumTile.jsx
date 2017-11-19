import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import FaDownload from 'react-icons/lib/fa/download';
import FaExternalLinkSquare from 'react-icons/lib/fa/external-link-square';

import titleData from '../data/titlePhrases';

class AlbumTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.trimTitles(props.name),
      year: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getAlbumDate = this.getAlbumDate.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
  }

  trimTitles(title) {
    const regexArray = titleData.map(phrase => `:?-? \\(?${phrase}\\)?`);
    const regex = new RegExp(regexArray.join('|'), 'gi');
    return title.replace(regex, '');
  }

  onInputChange(e) {
    const toUpdate = {};
    toUpdate[e.target.name] = e.target.value;
    this.setState(toUpdate);
  }

  getAlbumDate() {
    Axios.get(`http://localhost:3000/album-date?albumId=${this.props.id}`, { withCredentials: true })
      .then(response => {
        this.setState({ year: response.data });
      })
      .catch(err => {
        return err.response ? console.log(err.response.data) : console.log(err);
      });
  }

  addAlbum() {
    const data = {
      title: this.state.title,
      year: this.state.year,
      spotify_id: this.props.id,
      spotify_img: this.props.albumArt,
      artist_id: this.props.artist
    }

    Axios.post('http://localhost:3000/db-albums', data)
      .then((response) => {
        if (response.data.error) return console.log(response.data.error.message);

        if (response.status === 201) {
          return console.log('Album added to DB:', response);
        } else {
          return console.log(response.data);
        }
      })
      .catch((err) => {
        return err.response ? console.log(err.response.data) : console.log(err);
      });
  }

  render () {
    let yearButton;

    if (this.state.year) {
      const title = encodeURIComponent(this.state.title);
      yearButton = <a href={`http://www.imdb.com/find?q=${title}`} target="_blank"><FaExternalLinkSquare /></a>
    } else {
      yearButton = <a><FaDownload onClick={this.getAlbumDate} /></a>;
    }

    const imgStyle = { backgroundImage: `url(${this.props.albumArt})` };

    return (
      <li>
        <div className="album">
          <a
            className="album__img"
            style={imgStyle}
            href={this.props.external_urls.spotify}
            target="_blank">
          </a>
          <div className="album__input-wrap">
            <input name="title" onChange={this.onInputChange} value={this.state.title} />
            <div className="album__year-wrap">
              <input name="year" onChange={this.onInputChange} value={this.state.year} />
              {yearButton}
            </div>
            <div className="album__button-wrap">
              <button onClick={this.addAlbum}>ADD</button>
              <button>-</button>
            </div>
          </div>
        </div>
      </li>
    )
  }
};

const mapStateToProps = (state) => ({
  artist: state.artist
});

export default connect(mapStateToProps)(AlbumTile);
