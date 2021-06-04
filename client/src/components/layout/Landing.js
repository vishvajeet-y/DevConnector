import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Landing =(props)=> {
  useEffect(()=>{
    // console.log('auth is running')
   //  console.log(props.auth.isAuthenticate)
     if(props.auth.isAuthenticate)
     props.history.push('/dashboard')
   },[props.auth.isAuthenticate])
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {' '}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info me-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

const mapStateToProps=(state)=>({
  auth:state.auth
})

export default connect(mapStateToProps)( Landing);
