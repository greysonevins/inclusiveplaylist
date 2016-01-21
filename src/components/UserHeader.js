import React, { Component, PropTypes } from 'react';
import Router, { Link } from 'react-router';

class UserHeader extends Component {
  constructor( props ){
    super(props)
    this.state = {
      user: {}
    }
  }
  componentWillReceiveProps( nextProps ){
  }

  render(){
    return (
      <div>

        <nav className="navbar navbar-default  navbar-static-top" role="navigation" style={{color:'#2c3e50'}}>
        { ! this.props.user  ?
          <p className="navbar-text lead"> Login to Begin </p>
          :
          <div className="container-fluid">
            <div className="navbar-right" >
              <img src={this.props.user.profilePhoto} className="img-circle img-thumbnail img-responsive" width="15%"  />
              <Link to={`/profile/${this.props.user.spotifyId}`} className="lead navbar-text">{this.props.user.displayName}</Link>
            </div>
          </div>
        }
      </nav>
    </div>
    )
  }
}

UserHeader.PropTypes = {
  user: PropTypes.object.isRequired
}

export default UserHeader;
