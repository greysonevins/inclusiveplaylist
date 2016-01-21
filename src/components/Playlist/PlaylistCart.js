import React, { PropTypes } from 'react'

const PlaylistCart = ({playlists, addedPlaylists, handleDelete }) => (
  <div className="panel panel-success col-md-9" style = {{height: 350}}>
      { addedPlaylists.length === 3 ?
            <h1 className="text-center lead"> You have reached your limit of Playlists </h1>
        :
            <h1 className="text-center lead"> You can add <u>{ 3 - addedPlaylists.length }</u> Playlists </h1>
      }
    { addedPlaylists.length > 0 ?
        <div className="panel panel-body">
      { playlists.map((playlist, index) => (
        <div key={index}>

               { addedPlaylists.indexOf(playlist.id) > -1 ?
                <div className="col-xs-12 col-md-3 col-md-4">
                    <h2 className="text-center bg-info">{ playlist.nameShort || playlist.name }</h2>
                    <img src={ playlist.image || "https://d3rt1990lpmkn.cloudfront.net/640/907e87639091f8805c48681d9e7f144dedf53741" }
                        width="100%" className="img-responsive"/>
                    <div className="btn-group btn-group-justified" role="group" aria-label="...">
                        <div className="btn-group" role="group">
                            <a href={ playlist.url  } target="_blank" className="btn-default btn">View</a>
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-danger" name={`deleteButton${index}`} onClick={ ()=>handleDelete(playlist.id)} >
                                <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                            </button>
                        </div>
                      </div>
                    </div>

              : null }
                </div>
          ))}
        </div>
    : null }
    </div>

)

PlaylistCart.PropTypes = {
  playlists     : PropTypes.array.isRequired,
  addedPlaylists: PropTypes.array.isRequired,
  handleDelete  : PropTypes.func.isRequired

}

export default PlaylistCart;
