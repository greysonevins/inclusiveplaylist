import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const CreatedPlaylists = ({ playlists, user}) => (
      <div className="panel panel-default col-md-12"  style = {{height: 350, overflow: "scroll"}}>
        <div className="panel-body">
          <Link to={`/profile/${user.spotifyId}/newplaylist`}>
            <div className="col-xs-6 col-sm-4 col-md-3">
                <h2 className="text-center bg-success lead">New Playlist</h2>
                <img src={ "https://d3rt1990lpmkn.cloudfront.net/640/907e87639091f8805c48681d9e7f144dedf53741" }
                    width="100%" className="img-responsive"/>
            </div>
          </Link>
        { playlists.map((playlist, index) => (
          <div key={index}>
            <a href={ playlist.url  } target="_blank">
            <div className="col-xs-6 col-sm-4 col-md-3" key={index}>
                <h2 className="text-center bg-info lead">{ playlist.nameShort || playlist.name }</h2>
                <img src={ playlist.image || "https://d3rt1990lpmkn.cloudfront.net/640/907e87639091f8805c48681d9e7f144dedf53741" }
                    width="100%" className="img-responsive"/>

            </div>
            </a>
          </div>
            ))}
        </div>

        </div>
)

CreatedPlaylists.PropTypes = {
  playlists: PropTypes.array.isRequired,
  user     : PropTypes.object.isRequired
}

export default CreatedPlaylists;
