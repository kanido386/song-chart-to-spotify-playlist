require('dotenv').config();

const _ = require('lodash')
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);

const list = [
  { singer: '王藍茵', song: '惡作劇' },
  { singer: '林宥嘉', song: '想自由' },
  { singer: '盧廣仲', song: '大人中' }
];

async function main() {
  // Create a playlist
  const playlistName = 'Test Playlist';
  const resp1 = await spotifyApi.createPlaylist(playlistName, {
    description: 'description',
    public: true
  });
  const playlistId = _.get(resp1, 'body.id')
  if (!playlistId) {
    throw new Error('No playlistId found.')
  }

  // Find the songs with a list of song name and singer name
  const tracks = [];
  for (const item of list) {
    const query = `${item.singer} ${item.song}`;
    const resp2 = await spotifyApi.searchTracks(query, {
      limit: 1
    });
    const trackId = _.get(resp2, 'body.tracks.items[0].uri');
    if (trackId) {
      tracks.push(trackId);
    }
  }

  // Add songs into the playlist
  await spotifyApi.addTracksToPlaylist(playlistId, tracks);
}

main().catch(err => console.log(err));
