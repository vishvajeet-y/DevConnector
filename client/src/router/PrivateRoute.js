import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const PrivateRoute=({auth,component:Component,...rest })=> {
    // console.log(auth)
    // console.log(Component)
    
    // console.log({...rest})
   // const {isAuthenticate}=auth
    return (
        // isAuthenticate===true?(<Route {...props} />):(<Redirect to="/login"/>)
        <Route 
        {...rest}
        component={(props)=>(
          auth.isAuthenticate?(<Component {...props} />):(<Redirect to="/login" />)
        )}
        />
    )
}
const mapStateToProps=(state)=>({
    auth:state.auth
})
export default connect(mapStateToProps)(PrivateRoute)