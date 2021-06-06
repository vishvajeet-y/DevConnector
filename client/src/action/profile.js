import axios from 'axios'
import {GET_ERRORS,GET_PROFILE,PROFILE_LOADING,
 CLEAR_CURRENT_PROFILE} from './types'

//GET current Profile
 export const getCurrentProfile=()=>{
     return (dispatch)=>{

        dispatch(setProfileLoading())


        axios.get('/api/profile').then((res)=>{
            
         dispatch({
             type:GET_PROFILE,
             payload:res.data
         })

        }).catch((err)=>{
            //A user may have profile or may not
            //If it doesn't have then we will return
            //empty object
            dispatch({
                type:GET_PROFILE,
                payload:{}
            })
        })
     }
 }

 //Create Profile

 export const createProfile=(profileData,history)=>{
     return (dispatch)=>{
        axios.post('/api/profile',profileData).then((res)=>{
            history.push('/dashboard')
        }).catch((err)=>{
          //  console.log(err.response.data)
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
          
        })
    }
 }

 //Profile loading

 export const setProfileLoading=()=>{
     return {
         type:PROFILE_LOADING
     }
 }


 //Clear Profile
 export const clearCurrentProfile=()=>{
    return {
        type:CLEAR_CURRENT_PROFILE
    }
}