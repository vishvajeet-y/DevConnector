import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import setAuthToken from '../utils/setAuthToken'
import {logoutUser, setCurrentUser} from '../action/auth'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Landing from '../components/layout/Landing'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Dashboard from '../components/dashboard/Dashboard'
import configurestore from '../store/configureStore'
import { clearCurrentProfile } from '../action/profile'
import PrivateRoute from './PrivateRoute'
import CreateProfile from '../components/create-profile/CreateProfile'
import EditProfile from '../components/edit-profile/EditProfile'
import AddExperience from '../components/add-credential/AddExperience'
import AddEducation from '../components/add-credential/AddEducation'
import Profiles from '../components/profiles/Profiles'
import Profile from '../components/profile/Profile'
import Posts from '../components/posts/Posts'
import Post from '../components/post/Post'
import UserNotFound from '../components/not-found/UserNotFound'
import NotFound from '../components/not-found/NotFound'
import './App.css'
import Profile_UserId from '../components/profile/Profile_UserId'
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

    // clear current profile
    store.dispatch(clearCurrentProfile())
    //Redirect to login
    window.location.href='./login'
}


}

export const App = () => {
    return (
        <Provider store={store}>
        <BrowserRouter>
        <div className="App" >
        <Navbar />
        <Route render={({location})=>{
        //    console.log(location)
         return  <TransitionGroup>
            <CSSTransition 
            key={location.key}
            timeout={450}
            classNames="fade"
            exit={false}
            >
            <div className="page">
            <Switch location={location}>
            <Route exact={true} path='/' component={Landing} />
            <Route exact={true} path='/login' component={Login} />
            <Route exact={true} path='/register' component={Register} />
            <Route exact={true} path="/profiles" component={Profiles} />
            <Route exact={true} path="/profile/:handle" component={Profile} />
            <Route exact={true} path="/Userprofile/:userId" component={Profile_UserId} />
            <PrivateRoute exact={true} path='/dashboard'  component={Dashboard}/>
            <PrivateRoute exact={true} path='/create-profile'  component={CreateProfile}/>
            <PrivateRoute exact={true} path='/edit-profile'  component={EditProfile}/>
            <PrivateRoute exact={true} path='/add-experience'  component={AddExperience}/>
            <PrivateRoute exact={true} path='/add-education'  component={AddEducation}/>
            <PrivateRoute exact={true} path='/feed'  component={Posts}/>
            <PrivateRoute exact={true} path='/post/:id'  component={Post}/>
            <Route exact={true} path="/pagenotfound"  component={UserNotFound} />
            <Route  component={NotFound} />
            </Switch>
            <Footer />
            </div>
            </CSSTransition>
            </TransitionGroup> 
         
        }}/>  
        
        
        
        
         
         </div>
        
        </BrowserRouter>
        </Provider>
    )

}


