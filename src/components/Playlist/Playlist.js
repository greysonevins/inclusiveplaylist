import React, { Component, PropTypes, history } from 'react'
import { cloneDeep } from 'lodash'
import { Router, Route, Link } from 'react-router'
import getSpotifyPlaylist from '../../helpers/spotifyHelpers/getSpotifyPlaylist'
import CreatedPlaylists from './CreatedPlaylists'

class Playlist extends Component {
    constructor(props){
      super(props)

      this.state = {
        createdPlaylists : []
      }

    }
    componentWillReceiveProps(nextProps){
      const { accessToken, spotifyId, createdPlaylists } = nextProps.user
      const playlistInfo = getSpotifyPlaylist(accessToken, spotifyId, createdPlaylists )
      playlistInfo.then((data) => {
        this.setState({
          createdPlaylists : data
        })
      })

    }
    render(){
        return (
          <div>
              <CreatedPlaylists playlists={this.state.createdPlaylists} user={this.props.user} />
          </div>
        )
    }
}

Playlist.PropTypes = {
  user : PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
}

export default Playlist;
