import axios from 'axios'
import {GET_ERRORS,GET_PROFILE,PROFILE_LOADING,
 CLEAR_CURRENT_PROFILE,
 SET_CURRENT_USER,GET_PROFILES} from './types'

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

 //get All Profile

 export const getProfiles=()=>{
     return (dispatch)=>{
        
        dispatch(setProfileLoading())

         axios.get('/api/profile/all').then(res=>{
                dispatch({
                    type:GET_PROFILES,
                    payload:res.data
                })
         }).catch(err=>{
             dispatch({
                 type:GET_PROFILES,
                 payload:null
             })
         })
     }
 }

//Get Profile by handle
export const getProfileByhandle=(handle)=>{
    return (dispatch)=>{
       
       dispatch(setProfileLoading())

        axios.get(`/api/profile/handle/${handle}`).then(res=>{
               dispatch({
                   type:GET_PROFILE,
                   payload:res.data
               })
        }).catch(err=>{
            dispatch({
                type:GET_PROFILE,
                payload:null
            })
        })
    }
}
// Get Profile by userid
export const getProfileByUserId=(id)=>{
    return (dispatch)=>{
       
       dispatch(setProfileLoading())

        axios.get(`/api/profile/user/${id}`).then(res=>{
               dispatch({
                   type:GET_PROFILE,
                   payload:res.data
               })
               dispatch({
                type:GET_ERRORS,
                payload:{}
            })
        }).catch(err=>{
            dispatch({
                type:GET_PROFILE,
                payload:null
            })
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    }
}


 //Create Profile

 export const createProfile=(profileData,history)=>{
     return (dispatch)=>{
        axios.post('/api/profile',profileData).then((res)=>{
            dispatch({
                type:GET_ERRORS,
                payload:{}
            })
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
 //Add Experience 

 export const addExperience=(experienceData,history)=>{
     return (dispatch)=>{
         axios.post('/api/profile/experience',experienceData)
         .then(res=>{ 
             dispatch({
            type:GET_ERRORS,
            payload:{}
        })
        history.push('/dashboard')
         }).catch(err=>{
             dispatch({
                 type:GET_ERRORS,
                 payload:err.response.data
             })
         })
     }
 }
 // Add Education
 export const addEducation=(educationData,history)=>{
    return (dispatch)=>{
        axios.post('/api/profile/education',educationData)
        .then(res=>{ 
            dispatch({
           type:GET_ERRORS,
           payload:{}
       })
       history.push('/dashboard')
        }).catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    }
}


 //Delete Account

 export const deleteAccount=()=>{
     //console.log('Account Delete request is made')
     return (dispatch)=>{
       if(window.confirm('Are you sure ? This can Not be undone!')){
      //  console.log('Account Delete request is made confirm')
       
           axios.delete('/api/profile').then(res=>{
               //delete token from localstorage
               localStorage.removeItem('jwtToken')
                  dispatch({
                      type:SET_CURRENT_USER,
                      payload:{}
                  })
           }).catch(err=>{
               dispatch({
                type:GET_ERRORS,
                payload:err.response.data
               })
                  
           })
       }
    }
 }

//delete Experience

export const deleteExperience=(id)=>{
    return (dispatch)=>{
        axios.delete(`/api/profile/experience/${id}`)
        .then(res=>{
               dispatch({
                   type:GET_PROFILE,
                   payload:res.data
               })
        }).catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
               })
        })
    }
}

// delete Education
export const deleteEducation=(id)=>{
    return (dispatch)=>{
        axios.delete(`/api/profile/education/${id}`)
        .then(res=>{
               dispatch({
                   type:GET_PROFILE,
                   payload:res.data
               })
        }).catch(err=>{
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