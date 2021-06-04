import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import {logoutUser, setCurrentUser} from '../action/auth'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Landing from '../components/layout/Landing'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import configurestore from '../store/configureStore'
const store=configurestore()

//Check for token
if(localStorage.jwtToken){
//set auth token header auth
setAuthToken(localStorage.jwtToken)

//decode token and get user info and exp
const decoded=jwt_decode(localStorage.jwtToken)

//set user and isAuthenticated
store.dispatch(setCurrentUser(decoded))

//check for expired token
const currrentTime=Date.now()/1000
if(decoded.exp<currrentTime){
    //logout user
    store.dispatch(logoutUser())

    //ToDo clear current profile

    //Redirect to login
    window.location.href='./login'
}


}

export const App = () => {
    return (
        <Provider store={store}>
        <BrowserRouter>
        <div className="App">
        <Navbar /> 
        <Switch>
        <Route exact={true} path='/' component={Landing} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        </Switch>
         <Footer />
         
         </div>
        
        </BrowserRouter>
        </Provider>
    )

}


