import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import classname from 'classnames'
import {LoginUser} from '../../action/auth'


 const Login=(props)=> {
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [error,seterror]=useState({})
  const onSubmit=(e)=>{
    e.preventDefault()

    const User={
      email,
      password
    }
     console.log(User)
    props.LoginUser(User)
   
  }

  useEffect(()=>{
   // console.log('auth is running')
  //  console.log(props.auth.isAuthenticate)
    if(props.auth.isAuthenticate)
    props.history.push('/dashboard')
  },[props.auth.isAuthenticate])

    useEffect(()=>{
     // console.log('error is running')
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
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input type="email" className={classname("form-control form-control-lg",{
                    "is-invalid":error.email
                  })}
                  
                  placeholder="Email Address" value={email} name="email" onChange={(e)=>{setemail(e.target.value)}} />
             {error.email&&<div className="invalid-feedback">
               {error.email}
               </div> }
                
                  </div>
                <div className="form-group">
                  <input type="password" className={classname("form-control form-control-lg",{
                    "is-invalid":error.password
                  })}
                  placeholder="Password"  value={password}   name="password" onChange={(e)=>{setpassword(e.target.value)}} />
                  {error.password&&<div className="invalid-feedback">
                  {error.password}
                  </div> }
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

const mapStateToProps=(state)=>({
  auth:state.auth,
  error:state.errors
})

export default connect(mapStateToProps,{LoginUser})(Login)
