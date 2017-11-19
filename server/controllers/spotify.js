const Request = require('request');

const spotifyController = module.exports = {};

// GET ARTISTS - SEARCH SPOTIFY FOR ARTISTS
spotifyController.artists = (req, res) => {
  const options = {
    method: 'GET',
    url: `https://api.spotify.com/v1/search?type=artist&limit=3&q=${req.query.q}`,
    headers: {
      Authorization: `Bearer ${decoded.access_token}`
    }
  };

  Request(options, (error, response, body) => {
    if (error) return res.status(500).send(`Error searching Spotify for artists: ${error}`);

    return res.send(body);
  });
};

// GET ALBUMS - SEARCH SPOTIFY FOR ALBUMS
spotifyController.albums = (req, res) => {
  const options = {
    method: 'GET',
    url: `https://api.spotify.com/v1/artists/${req.query.artistId}/albums?limit=50`,
    headers: {
      Authorization: `Bearer ${decoded.access_token}`
    }
  };

  Request(options, (error, response, body) => {
    if (error) return res.status(500).send(`Error searching Spotify for artists: ${error}`);

    return res.send(body);
  });
};

// GET ALBUM-DATE - GET ALBUM YEAR FROM SPOTIFY
spotifyController.albumDate = (req, res) => {
  const options = {
    method: 'GET',
    url: `https://api.spotify.com/v1/albums/${req.query.albumId}`,
    headers: {
      Authorization: `Bearer ${res.locals.token}`
    }
  };

  Request(options, (error, response, body) => {
    if (error) return res.status(500).send(`Error searching Spotify for artists: ${error}`);

    let year = JSON.parse(body).release_date;
    year = typeof year === 'string' ? year.slice(0, 4) : year;

    return res.send(year);
  });
};
