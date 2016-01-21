import SpotifyWebApi from 'spotify-web-api-js'
import Promise from 'bluebird'

function getPlaylistData( accessToken, spotifyId, playlistId){
    let spotifyApi = new SpotifyWebApi({
      clientID    : '1bd6a44f75cc4c90a331bf8fa323e621',
      clientSecret: 'd689a3c831e740c196e23e44e110c8d8',
      redirectUri : 'http://localhost:3000'
    })
    spotifyApi.setAccessToken(accessToken)
    return new Promise((resolve, reject) => {
      spotifyApi.getPlaylist(spotifyId, playlistId)
      .then(function(data) {
        const playlistObject = {
          id    : {
            playlistId: data.id,
            ownerId   : data.owner.id,
            totalSongs: data.tracks.total
          },
          tracks: data.tracks.total,
          url   : data.external_urls.spotify,
          name  : data.name
        }
        _.dropRight( data.images, (  data.images.length - 1 ))
                        .map(image => {
                              playlistObject['image'] = image.url
                            })
        if ( data.name.length > 30){
           playlistObject['nameShort'] =  _.trunc( data.name, { 'length': 20 })
        }
        resolve(playlistObject)

      }, function(err) {
        return err
      })
    })
}

export default function getSpotifyPlaylist( accessToken, spotifyId, playlistArray){
  return new Promise((resolve, reject) => {
      let userPlaylists = []
      for ( let playlistId in playlistArray){
        const playlistInfo = getPlaylistData( accessToken,  spotifyId, playlistArray[ playlistId ] )
        playlistInfo.then((res ) => {
          userPlaylists.push(res)
          if (playlistId == ( playlistArray.length - 1)) {
            resolve(userPlaylists)
          }
        }).catch((error) => {
            return error
          })
      }
    })
}
