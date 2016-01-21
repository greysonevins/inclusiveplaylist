import SpotifyWebApi from 'spotify-web-api-js'

function createUserPlays( accessToken,  spotifyId, name){
    let spotifyApi = new SpotifyWebApi({
      clientID    : '1bd6a44f75cc4c90a331bf8fa323e621',
      clientSecret: 'd689a3c831e740c196e23e44e110c8d8',
      redirectUri : 'http://localhost:3000'
    })
    spotifyApi.setAccessToken(accessToken)
    const createPlay = spotifyApi.createPlaylist(spotifyId, {"name": name } )
        .then((data) => {
          return  data
        }, function(err) {
          return err
        });

    return createPlay
}

export default function ( accessToken, spotifyId, name, playlistsToAdd, numberOfSongs){
  const playlistInfo = createUserPlays( accessToken, spotifyId, name )
  return playlistInfo
}
