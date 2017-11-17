const JsonWebToken = require('jsonwebtoken');
const Request = require('request');

const spotifyController = module.exports = {};

// GET ARTISTS - SEARCH SPOTIFY FOR ARTISTS
spotifyController.artists = (req, res) => {
  // extract access token
  if (!req.cookies.jwt) return res.status(401).send('Missing access token');
  const decoded = JsonWebToken.verify(req.cookies.jwt, process.env.SECRET);

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
  // extract access token
  if (!req.cookies.jwt) return res.status(401).send('Missing access token');
  const decoded = JsonWebToken.verify(req.cookies.jwt, process.env.SECRET);

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
