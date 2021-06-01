import React,{useState} from 'react'

 const Login=()=> {
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const onSubmit=(e)=>{
    e.preventDefault()

    const User={
      email,
      password
    }
     console.log(User)
    
     setemail('')
     setpassword('')
 
  }
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
                  <input type="email" className="form-control form-control-lg" placeholder="Email Address"
                  value={email} name="email" onChange={(e)=>{setemail(e.target.value)}} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" placeholder="Password" 
                  value={password}   name="password" onChange={(e)=>{setpassword(e.target.value)}} />
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
export default Login
