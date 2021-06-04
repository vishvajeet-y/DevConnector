import React,{useState,useEffect} from 'react'

import { withRouter } from "react-router"
import {connect} from 'react-redux'
import classname from 'classnames'
import {registerUser}  from '../../action/auth'


const  Register=(props)=> {

  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [password2,setpassword2]=useState('')
  const [error,seterror]=useState({})

  const onSubmit=(e)=>{
    e.preventDefault()

    const newUser={
      name,
      email,
      password,
      password2
    }
            console.log(newUser)
            props.registerUser(newUser,props.history)
     
  
  }
  useEffect(()=>{
    // console.log('auth is running')
   //  console.log(props.auth.isAuthenticate)
     if(props.auth.isAuthenticate)
     props.history.push('/dashboard')
   },[props.auth.isAuthenticate])

  useEffect(()=>{
        //    console.log('useeffect is running');
            seterror(props.error)
         
            },[props.error])

    return (
    
        <div>
        <div className="register">
        <div className="container">
       
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                  <input type="text" className={classname("form-control form-control-lg ",{
                     "is-invalid":error.name
                  }    
                  )}  
                  placeholder="Name"  value={name} name="name"  onChange={(e)=>{setname(e.target.value)}}/>
                {error.name&&(<div className="invalid-feedback">
                       {error.name}
                     </div>)}
                  </div>
                <div className="form-group">
                  <input type="email" className={classname("form-control form-control-lg ",{
                    "is-invalid":error.email
                 }    
                 )}   
                 placeholder="Email Address"   value={email} name="email" onChange={(e)=>{setemail(e.target.value)}}/>
                   {error.email&&(<div className="invalid-feedback">
                   {error.email}
                 </div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" className={classname("form-control form-control-lg ",{
                    "is-invalid":error.password
                 }    
                 )}   
                 placeholder="Password" value={password} name="password" onChange={(e)=>{setpassword(e.target.value)}}/>
                  {error.password&&(<div className="invalid-feedback">
                  {error.password}
                </div>)}
                  </div>
                <div className="form-group">
                  <input type="password" className={classname("form-control form-control-lg ",{
                    "is-invalid":error.password2
                 }    
                 )}    placeholder="Confirm Password"
                  value={password2} name="password2" onChange={(e)=>{setpassword2(e.target.value)}}/>
                  {error.password2&&(<div className="invalid-feedback">
                  {error.password2}
                </div>)}
                  </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

const mapStateToprops=(state)=>({
   auth:state.auth,
   error:state.errors
})

export default connect(mapStateToprops,{registerUser})(withRouter(Register))
