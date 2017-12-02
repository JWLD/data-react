# data-react
- Work in progress, but you can view the current version of the site [here](https://soundtracks-data.herokuapp.com/).
- View todos [here](https://github.com/JWLD/data-react/issues).

### What is this?
I wanted to create an easy-to-use data entry interface for my [soundtracks app](https://github.com/JWLD/soundtracks-react). Currently this app only makes use of the Spotify API, but the plan is to incorporate other data sources such as Discogs and MusicBrainz in the future.

In order to use this app you must have access to a Spotify account. Before starting, click the Spotify icon in the top right to retrieve an access token to allow you to use Spotify's API.

Once authorised, you can search for an artist, select them from a list of results, and then see a paginated list of all that artists' works on Spotify. Fill out the year field by clicking the download icon within that field, and then add the album to the database. It should then be viewable under that artist at http://soundtracks.herokuapp.com!

### Tech Stack
- React
- Redux
- Express
- PostgreSQL
