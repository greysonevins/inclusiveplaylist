import React from 'react'
import { Component } from 'react'

export default class Login extends Component {
    render(){
        return (
            <div className="text-center">
                <a href="/auth/spotify" className="btn-lg btn-default lead" >
	    			      Login to Spotify
	    		      </a>
           </div>
        )
    }
}
