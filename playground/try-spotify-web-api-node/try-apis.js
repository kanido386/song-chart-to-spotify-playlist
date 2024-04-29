require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);

async function main() {
  // // Create a playlist
  // const playlistName = 'playlistName';
  // const resp = await spotifyApi.createPlaylist(playlistName, {
  //   description: 'description',
  //   public: true
  // });

  // // Find the song with a song name and a singer name
  // const query = '王藍茵 惡作劇';
  // const resp = await spotifyApi.searchTracks(query, {
  //   limit: 1
  // });

  // Add a song into a playlist
  const playlistId = '0000000000000000000000';
  const tracks = ['spotify:track:643hRiTY9vzD6P0cWO8UP3'];
  const resp = await spotifyApi.addTracksToPlaylist(playlistId, tracks);

  console.dir(resp, { depth: null });
}

main().catch(err => console.log(err));
