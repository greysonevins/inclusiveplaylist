import request from 'superagent'
import _ from 'lodash'

export default function getUserInfo( userId ){
  return new Promise((resolve, reject) => {
    request(`/user/${userId}`, function(err, res){
      const user = res.body
      if ( err ) return reject(err)
      else  return resolve( user )
    })
  })
}
