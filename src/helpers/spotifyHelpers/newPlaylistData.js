import SpotifyWebApi from 'spotify-web-api-js'

function getUserPlays( accessToken, spotifyId){
    let spotifyApi = new SpotifyWebApi({
      clientID    : '1bd6a44f75cc4c90a331bf8fa323e621',
      clientSecret: 'd689a3c831e740c196e23e44e110c8d8',
      redirectUri : 'http://localhost:3000'
    })
    spotifyApi.setAccessToken(accessToken)
    const playlist = spotifyApi.getUserPlaylists( spotifyId, { limit: 50} ).then((data) => {

      const updatedPlaylistData = data.items.map((playlist) => {
        const playlistObject = {
          id    : {
            playlistId: playlist.id,
            ownerId   : playlist.owner.id,
            totalSongs: playlist.tracks.total
          },
          tracks: playlist.tracks.total,
          url   : playlist.external_urls.spotify,
          name  : playlist.name
        }
        _.dropRight( playlist.images, (  playlist.images.length - 1 ))
                        .map(image => {
                              playlistObject['image'] = image.url
                            })
        if ( playlist.name.length > 15){
           playlistObject['nameShort'] =  _.trunc( playlist.name, { 'length': 20 })
        }

        return playlistObject
      })
      return updatedPlaylistData
    }, function(err){
      console.log('Something went wrong!', err);
    })
    return playlist
}

export default function newPlaylistData( accessToken, spotifyId ){
  const playlistInfo = getUserPlays( accessToken,  spotifyId )
  return playlistInfo
}
