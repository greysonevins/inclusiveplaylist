import React, { Component, PropTypes } from 'react'
import PlaylistCart from './PlaylistCart'
import UserPlaylists from './UserPlaylists'
import { Link } from 'react-router'
import newPlaylist from '../../helpers/newPlaylist'
import createPlaylist from '../../helpers/spotifyHelpers/createPlaylist'
import makeSongsForPlaylist from '../../helpers/spotifyHelpers/makeSongsForPlaylist'
import addSongsToPlaylist from '../../helpers/spotifyHelpers/addSongsToPlaylist'

import Promise from 'bluebird'
import _ from 'lodash'

class RenderPlaylists extends Component {
    constructor(props){
      super(props)

      this.state = ({
        addedPlaylists    : [],
        playlistName      : '',
        numberOfSongs     : 20,
        newPlaylistCreated: false,
        songsForPlaylist  : [],
        newPlaylistInfo   : {}
      })
    }
    handlePlaylistInfo( event: Object){
        if ( event.target.name === 'playlistName'){
          this.setState({
            playlistName: event.target.value
          })
        }else{
          this.setState({
            numberOfSongs: Number( this.refs[ event.target.name ].value )
          })
        }
    }

    handleDelete( id: Object ){
      event.preventDefault()
      const deletePlay = this.state.addedPlaylists
      const inDelete = deletePlay.indexOf(id)
      deletePlay.splice(inDelete, 1)
      this.setState({
        addedPlaylists : deletePlay
      })

    }

    handleAdd( id: Object ){
      event.preventDefault()
      const addedPlay = this.state.addedPlaylists
      if ( addedPlay.length < 3 ){
        addedPlay.push(id)
        this.setState({
          addedPlaylists : addedPlay
        })
      } else{
        alert('You can only add 3 playlists')
      }
    }

    handleSubmit( ){
      event.preventDefault()
      const { playlistName, numberOfSongs, addedPlaylists, newPlaylistInfo, songsForPlaylist } = this.state
      const { _id, accessToken, spotifyId } = this.props.user

      const createPlay = createPlaylist( accessToken, spotifyId, playlistName )


      const newPlaylistSongs = makeSongsForPlaylist( accessToken, addedPlaylists, numberOfSongs)

      createPlay.then((data) =>{
          this.setState({
            newPlaylistInfo : data
          })
          const payload = {
            playlistId : data.id,
            author     : spotifyId
          }
          const newPlay = newPlaylist(payload)

          newPlay.then((result) => {
              const newplaylist = result.body
              if ( result.statusCode === 200 ){
                this.setState({
                  newPlaylistCreated : true,
                  newPlaylistInfo    : newplaylist
                })
              }else{
                alert('Erro occured, try again')
              }
          })
          newPlaylistSongs.then((res) => {
            this.setState({
              songsForPlaylist : res
            })
            const addSongs = addSongsToPlaylist( accessToken, spotifyId, data.id , res )
            addSongs.then((res) => {
              this.props.history.pushState(null, "/profile/" + spotifyId)
            })
          })

      })



    }

    render(){
      return (
          <div>
            <div className="panel panel-default">
                <div className="panel panel-heading">
                    <h1 className="text-center lead">
                        Create Playlist
                    </h1>

                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="form-control-label lead" required>Playlist Name</label>
                    <input onChange={this.handlePlaylistInfo.bind(this)} name="playlistName" className="form-control" placeholder="Playlist Name" />
                  </div>
                  <fieldset className="form-group" >
                      <label className="form-control-label lead">How many songs?</label>
                        <select onChange={this.handlePlaylistInfo.bind(this)} ref="numberOfSongs" name="numberOfSongs" className="form-control">
                            <option>30</option>
                            <option>50</option>
                            <option>90</option>
                        </select>
                  </fieldset>

                  { this.state.addedPlaylists.length === 0 ?
                    <button className="btn-primary btn col-md-offset-4" disabled>Add Playlists</button>

                    :
                    <button onClick={ this.handleSubmit.bind(this) } className="btn-primary btn col-md-offset-6"> Submit </button>
                  }

                </div>
                <PlaylistCart addedPlaylists={this.state.addedPlaylists} playlists={this.props.playlists} handleDelete={this.handleDelete.bind(this)}/>
                <div className="panel-body">
                    <UserPlaylists addedPlaylists={this.state.addedPlaylists} playlists={this.props.playlists} handleAdd={this.handleAdd.bind(this)}/>
                </div>
            </div>
      </div>

      )
   }
}

RenderPlaylists.PropTypes = {
  history  : PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  user     : PropTypes.object.isRequired
}

export default RenderPlaylists
