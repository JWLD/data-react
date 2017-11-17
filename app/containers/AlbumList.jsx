import React, { Component } from 'react';
import { connect } from 'react-redux';

class AlbumList extends Component {
  render() {
    return (
      <section></section>
    )
  }
};

const mapStateToProps = (state) => ({
  artist: state.artist
});

export default connect(mapStateToProps)(AlbumList);
