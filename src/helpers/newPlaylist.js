import request from 'superagent'
import _ from 'lodash'

export default function newPlaylist( payload ){
  return new Promise((resolve, reject) => {
    request.post('/playlist').send(payload).end((err, res ) => {
      if ( err ) return reject(err)
      else  return resolve( res )
    })
  })
}
