import {GET_ERRORS,SET_CURRENT_USER} from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

//Register User
export const registerUser=(userData,history)=>{
return (dispatch)=>{
     axios.post('/api/users/register',userData).then(res=>{
      console.log(res.data)
      dispatch({
        type:GET_ERRORS,
        payload:{}
    })
      history.push('/login')
    }).catch((err)=>{
     console.log(err.response.data)
     dispatch({
         type:GET_ERRORS,
         payload:err.response.data
     })
    })

}
}

//Login user and get token

export const LoginUser=(userData,history)=>{

  return (dispatch)=>{
        axios.post('/api/users/login',userData).then((res)=>{
          console.log(res.data)
          const {token}=res.data
          //save token to loacal storage
          localStorage.setItem('jwtToken',token)
          setAuthToken(token)

          //decode token
          const decoded=jwt_decode(token)
          //console.log(decoded)

          //set current user
          dispatch(setCurrentUser(decoded))


        }).catch(err=>{
          console.log(err.response.data)
          
          
          dispatch({
            type:GET_ERRORS,
            payload:err.response.data
          })
        })
  }

}

//set logged in  user

export const setCurrentUser=(decoded)=>({
  type:SET_CURRENT_USER,
  payload:decoded
})


//Log user out

export const logoutUser=()=>{
  return (dispatch)=>{
  //Remove token from localstorage
  localStorage.removeItem('jwtToken')

   //Remove Auth Header from future request

   setAuthToken(false)

   //set current user to {} which will set isAuthenticated to be false
   dispatch(setCurrentUser({}))

  }

}