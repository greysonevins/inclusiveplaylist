import React from 'react'
import style from './Home.css'
import Login from './Login'
import UserHeader from './UserHeader'


const Home = React.createClass({
  render () {
    return (
    <div>
          <UserHeader  />
        <div className="jumbotron">
      	    <h1 className="text-center lead">
      	      Create Shared Playlists with friends
      	    </h1>

            <p className="text-center"> Login, select 1-3 playlists of your own, and then merge them randomly </p>
	       <Login />
    </div>
	</div>
    )
  }
})

export default Home
