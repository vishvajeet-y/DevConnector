import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Landing from '../components/layout/Landing'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
export const App = () => {
    return (
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
    )

}


