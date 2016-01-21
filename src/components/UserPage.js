import React, { history, Component} from 'react'
import style from './Home.css'
import Login from './Login'
import getUserInfo from '../helpers/getUserInfo'
import Playlist from './Playlist/Playlist'
import UserHeader from './UserHeader'


export default class UserPage extends Component{
  constructor(){
    super()
    this.state = {
      user: {}
    }
  }
  componentWillMount(){
    const userInfo = getUserInfo(this.props.params.userid)
    userInfo.then((result) => {
      this.setState({
        user: {...result}
      })
    })
  }

  render () {
    return (
    <div>
      <UserHeader user={this.state.user} />
        <div className="container">
          <h1 className="text-center lead">
              Click New Playlist to Create a Merged Playlist
    	    </h1>
          <Playlist user={ this.state.user } />
    </div>
  </div>
    )
  }
}
