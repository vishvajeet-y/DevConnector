import React,{useState,useEffect} from 'react'

import { withRouter } from "react-router"
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import {registerUser}  from '../../action/auth'


const  Register=(props)=> {

  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [password2,setpassword2]=useState('')
  const [error,seterror]=useState({})

  const handleName=((e)=>{
    setname(e.target.value)
  })

  const handleEmail=((e)=>{
    setemail(e.target.value)
  })
  
 const  handlePassword=((e)=>{
    setpassword(e.target.value)
  })

  const  handlePassword2=((e)=>{
    setpassword2(e.target.value)
  })

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

              <TextFieldGroup 
              type="text"
              name="name"
              placeholder='Name'
              value={name}
              error={error.name}
              onChange={handleName}
              />

              <TextFieldGroup 
              type="email"
              name="name"
              placeholder="Email Address" 
              value={email}
              info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              error={error.email}
              onChange={handleEmail}
              />
             
              <TextFieldGroup 
              type="password"
              name="password"
              placeholder="Password" 
              value={password}
              error={error.password}
              onChange={handlePassword}
              />

              <TextFieldGroup 
              type="password"
              name="password2"
              placeholder="Confirm Password" 
              value={password2}
              error={error.password2}
              onChange={handlePassword2}
              />
      
                
               
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
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
