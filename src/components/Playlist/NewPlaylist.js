import React from 'react'
import { Component, PropTypes } from 'react'
import { cloneDeep } from 'lodash'
import getUserInfo from '../../helpers/getUserInfo'
import newPlaylistData from '../../helpers/spotifyHelpers/newPlaylistData'
import RenderPlaylists from './RenderPlaylists'
import UserHeader from '../UserHeader'

class NewPlaylist extends Component {
  constructor(props){
    super(props)

    this.state = {
      user     : {},
      playlists : []
    }
  }
  componentWillMount(){
    const userInfo = getUserInfo(this.props.params.userid)
    userInfo.then((result) => {
      this.setState({
        user: {...result}
      })
      const playlists = newPlaylistData(result.accessToken, result.spotifyId)
      playlists.then((playlist) => {
          this.setState({
              playlists: playlist
          })
      })
    })
  }
  render(){
    return (
      <div>
        <UserHeader user={this.state.user} />
        <div className="container">
          <RenderPlaylists history = {this.props.history }playlists={ this.state.playlists } user={this.state.user} />
        </div>
      </div>
    )
  }
}

NewPlaylist.PropTypes = {
  user   : PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default NewPlaylist;
