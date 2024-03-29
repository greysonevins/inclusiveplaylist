import SpotifyWebApi from 'spotify-web-api-js'
import _ from 'lodash'
import Promise from 'bluebird'

function makeListOfSongs( accessToken, playlist ){
    let spotifyApi = new SpotifyWebApi({
      clientID    : '1bd6a44f75cc4c90a331bf8fa323e621',
      clientSecret: 'd689a3c831e740c196e23e44e110c8d8',
      redirectUri : 'http://localhost:3000'
    })
    spotifyApi.setAccessToken(accessToken)
    return new Promise((resolve, reject) => {
        let listOfSongs = []
        let totalRepeat = Math.ceil((Number(playlist.totalSongs)/100))
        for (let x = 1; x <= totalRepeat; x++) {
            spotifyApi.getPlaylistTracks(playlist.ownerId, playlist.playlistId, { 'offset' : String((x * 100)-100), 'limit' : '100', 'fields' : 'items' } )
                .then((data) => {
                    data.items.map((tracks) => {
                      if ( typeof tracks.track.uri == 'string' && String(tracks.track.uri).indexOf('spotify:track') >= 0 ){
                         listOfSongs.push( String(tracks.track.uri) )
                         if (x === totalRepeat){
                           resolve(listOfSongs)
                         }
                      }
                    })
                }, function(err) {
                  reject( err )
                })
            }
    })
}

export default function makeSongsForPlaylist( accessToken, playlistsToAdd, numberOfSongs){
  const musicCheck = new Promise((resolve, reject) => {
      let songsAdd = []
      for ( let playlist in playlistsToAdd ){
        const makeList = makeListOfSongs( accessToken, playlistsToAdd[ playlist ] )
        makeList.then((data) => {
          songsAdd.push(data)

        }).done((res) => {
          if ( playlist == ( playlistsToAdd.length - 1 )) {
             resolve(_.flatten(songsAdd))
           }
           return
        })
      }
  })
    return new Promise((resolve, reject) => {
      musicCheck.then((data) => {
        let randomSongsIndexs = []
        for (let x = 0; x < numberOfSongs; x++ ){
          let randomNumber =  Math.floor((Math.random() * data.length))
          if ( numberOfSongs < data.length ){
            while( randomSongsIndexs.indexOf(randomNumber) >= 0 ){
              randomNumber =  Math.floor((Math.random() * data.length))
            }
            randomSongsIndexs.push(randomNumber)
          }else{
            randomSongsIndexs.push(randomNumber)
          }

        }
        const songsForPlaylist = randomSongsIndexs.map((index) => {
          return data[ Number(index) ]
        })
        resolve(songsForPlaylist)
      })
    })
}
