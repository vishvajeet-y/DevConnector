import {GET_PROFILE,PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_PROFILES} from '../action/types'

const intialstate={
    profile:null,
    profiles:null,
    loading:false
}

 const Profile= (state=intialstate,action)=>{

    switch(action.type){
    
    case PROFILE_LOADING:
        return {
            ...state,
            loading:true
        }    
 
    case GET_PROFILE:
        return{
            ...state,
            profile:action.payload,
            loading:false
        }
    
    case GET_PROFILES:
        return {
            ...state,
            profiles:action.payload,
            loading:false
        }    

    case CLEAR_CURRENT_PROFILE:
        return {
            ...state,
            profile:null
        }
    default :
     return state
    }
}

export default Profile