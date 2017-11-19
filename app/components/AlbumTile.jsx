import React, { Component } from 'react';
import FaDownload from 'react-icons/lib/fa/download';

import titleData from '../data/titlePhrases';

class AlbumTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.trimTitles(this.props.name),
      year: this.props.year
    };

    this.onInputChange = this.onInputChange.bind(this);
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

  render () {
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
              <FaDownload />
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
