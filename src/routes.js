import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Playlist from './components/Playlist/Playlist'
import UserPage from './components/UserPage'
import NewPlaylist from './components/Playlist/NewPlaylist'

const routes = (
  <Route path='/' component={App}>
    <Route path="profile/:userid" component={UserPage} />
    <Route path="profile/:userid/newplaylist" component={NewPlaylist} />
    <Route path="collab/:playlistid" component={NewPlaylist} />
    <IndexRoute component={Home} />
  </Route>
)

export default routes
