import SpotifyWebApi from 'spotify-web-api-js'

function AddSongs( accessToken, spotifyId, userid, uris){
    let spotifyApi = new SpotifyWebApi({
      clientID    : '1bd6a44f75cc4c90a331bf8fa323e621',
      clientSecret: 'd689a3c831e740c196e23e44e110c8d8',
      redirectUri : 'http://localhost:3000'
    })
    spotifyApi.setAccessToken(accessToken)
    return new Promise((resolve, reject) => {
      spotifyApi.addTracksToPlaylist(spotifyId, userid, uris)

        .then(function(res) {
          resolve(res)
        }, function(err) {
          reject(err)
        })
    })
}

export default function addSongsToPlaylist( accessToken, spotifyId, userid, uris ){
  const addTracks = AddSongs( accessToken, spotifyId, userid, uris)
  return addTracks
}
