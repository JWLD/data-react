import React, { Component } from 'react';
import Axios from 'axios';
import FaDownload from 'react-icons/lib/fa/download';
import FaExternalLinkSquare from 'react-icons/lib/fa/external-link-square';

import titleData from '../data/titlePhrases';

class AlbumTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.trimTitles(this.props.name),
      year: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getAlbumDate = this.getAlbumDate.bind(this);
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

  render () {
    let yearButton;

    if (this.state.year) {
      const title = encodeURIComponent(this.state.title);
      yearButton = <a href={`http://www.imdb.com/find?q=${title}`} target="_blank"><FaExternalLinkSquare /></a>
    } else {
      yearButton = <a><FaDownload onClick={this.getAlbumDate} /></a>;
    }

    return (
      <li>
        <div className="album">
          <a
            className="album__img"
            style={this.props.imgStyle}
            href={this.props.external_urls.spotify}>
          </a>
          <div className="album__input-wrap">
            <input name="title" onChange={this.onInputChange} value={this.state.title} />
            <div className="album__year-wrap">
              <input name="year" onChange={this.onInputChange} value={this.state.year} />
              {yearButton}
            </div>
            <div className="album__button-wrap">
              <button>ADD</button>
              <button>IGNORE</button>
            </div>
          </div>
        </div>
      </li>
    )
  }
};

export default AlbumTile;
