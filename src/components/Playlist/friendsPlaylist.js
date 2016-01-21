import React, { PropTypes } from 'react'

const FriendsPlaylist = ({ addedPlaylists, playlists, handleAdd }) => (
      <div className="panel panel-default col-md-6">

      { addedPlaylists.length === 3 ?
            <h1 className="text-center"> You have reached your limit of Playlists </h1>
        :
            <h1 className="text-center"> You can add <u>{ 3 - addedPlaylists.length }</u> Playlists </h1>
      }

        <div className="panel-body">
        { playlists.map((playlist, index) => (
          <div key={index}>{ addedPlaylists.indexOf(playlist.id) === -1 ?
            <div className="col-md-6 col-md-6 col-md-6" key={index}>
                <h2 className="text-center bg-info">{ playlist.nameShort || playlist.name }</h2>
                <img src={ playlist.image || "https://d3rt1990lpmkn.cloudfront.net/640/907e87639091f8805c48681d9e7f144dedf53741" }
                    width="100%" className="img-responsive"/>
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                        <a href={ playlist.url  } target="_blank" className="btn-default btn">View Playlist</a>
                    </div>
                    { addedPlaylists.length === 3 ?
                          <div className="btn-group" role="group">
                              <button type="button" className="btn btn-success" disabled name={`addButton${index}`}>
                                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                              </button>
                          </div>
                      : <div className="btn-group" role="group">
                          <button type="button" className="btn btn-success"  name={`addButton${index}`} onClick={  ()=>handleAdd(playlist.id) }>
                              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                          </button>
                        </div>
                  }
                  </div>
              </div>
            : null }</div>
        ))}
        </div>

        </div>
)

FriendsPlaylist.PropTypes = {
  addedPlaylists: PropTypes.array.isRequired,
  playlists     : PropTypes.array.isRequired,
  handleAdd  : PropTypes.func.isRequired

}

export default FriendsPlaylist;
