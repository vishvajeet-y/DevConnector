import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser}  from '../../action/auth'
import {clearCurrentProfile} from '../../action/profile'

const Navbar =(props)=>{
    
   const {isAuthenticate,user}=props.auth

   const onLogoutClick=(e)=>{
     e.preventDefault()
    // console.log('logout is called')
     props.logoutUser()
     props.clearCurrentProfile()
   }

    const guestLinks=(
      <ul className="navbar-nav ms-auto">
      <li className="nav-item">
      <Link className="nav-link" to="/register">
       Sign Up
      </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/login">
       Login
       </Link>
       </li>
    </ul>
    )

    const authLinks=(     
    <ul className="navbar-nav ms-auto">
    <li className="nav-item">
    <Link className="nav-link" to="/feed">
     Post Feed
    </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/dashboard">
       Dashboard
      </Link>
      </li>
       <li className="nav-item">
       <button type="button" className="btn nav-link"
        onClick={onLogoutClick}
       >
       <img 
       className="rounded-circle"
       src={user.avatar}
       alt={user.name}
       title="You must have gravatar connected to your email to display an image"
       style={{
         width:'25px',
         marginRight:'5px',
         marginBottom:'3px'
       }}
       ></img>
        Logout
     
       </button>
       </li>
     
     </ul>
     )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>

        {isAuthenticate?authLinks:guestLinks}
          
           
          </div>
        </div>
      </nav>
    );
  
}

const mapStateToProps=(state)=>({
  auth:state.auth

})

export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})( Navbar);
