import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {LoginUser} from '../../action/auth'
import TextFieldGroup from '../common/TextFieldGroup'
import {GET_ERRORS} from '../../action/types'

 const Login=(props)=> {
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [error,seterror]=useState({})

 const handleEmail=((e)=>{
    setemail(e.target.value)
  })
 const  handlePassword=((e)=>{
    setpassword(e.target.value)
  })

  const onSubmit=(e)=>{
    e.preventDefault()

    const User={
      email,
      password
    }
    // console.log(User)
    props.LoginUser(User)
   
  }

  useEffect(()=>{
   // console.log('auth is running')
  //  console.log(props.auth.isAuthenticate)
    if(props.auth.isAuthenticate)
    {
    props.clearError()
    props.history.push('/dashboard')
    }
  },[props.auth.isAuthenticate])

    useEffect(()=>{
      //console.log('error is running')
       seterror(props.error)
    },[props.error])

    return (
        <div>
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={onSubmit} noValidate>
              <TextFieldGroup 
              type="email"
              name="emial"
              placeholder='Email Address'
              value={email}
              error={error.Email}
              onChange={handleEmail}
              />

              <TextFieldGroup 
              type="password"
              name="Password"
              placeholder='Password'
              value={password}
              error={error.Password}
              onChange={handlePassword}
              />
              
                
                <input type="submit" value="Submit" className="btn btn-info col-12 mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
        </div>
    )
}

const mapStateToProps=(state)=>({
  auth:state.auth,
  error:state.errors
})

const mapDispatchToProps=(dispatch)=>({
  LoginUser:(User)=>(dispatch(LoginUser(User))),
  clearError:()=>(dispatch({
    type:GET_ERRORS,
    payload:{}
     }))
 })

export default connect(mapStateToProps,mapDispatchToProps)(Login)
