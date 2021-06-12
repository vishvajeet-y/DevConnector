import React ,{useEffect} from 'react'
import {connect} from 'react-redux'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import ProfileHeader from './ProfileHeader'
import Spinner from '../common/Spinner'
import {getProfileByUserId} from '../../action/profile'

const Profile=(props)=> {
  
    const {loading,profile}=props.profile
    const {isAuthenticate}=props.auth
   useEffect(()=>{
       if(props.match.params.userId)
       props.getProfileByUserId(props.match.params.userId)
   },[])


   useEffect(()=>{
    //It fix problem where When user is logged in and seeing it's profile
    //using handle and If he logout from there then 
    // then he can still see it's profile.otherwise due to
    //CLEAR_CURRENT_PROFILE action when user logout profile become null and 
    //it started showing spinner from infinity.
    if(!isAuthenticate)
 {  //console.log(isAuthenticate)
      props.getProfileByUserId(props.match.params.userId) }
      },[isAuthenticate])
   
    useEffect(()=>{
       // console.log(props.error)
        if(Object.keys(props.error).length>0)
        {
            props.history.push('/pagenotfound')
        }
    },[props.error])


   let profileContent
    if(profile===null||loading){
        profileContent=<Spinner />
    }
    else{
        profileContent=(
            <div>
               <div className="row">
               <div className="col-md-6">
               <button onClick={(e)=>{window.history.back()}} className="btn btn-light mb-3 float-left">
                Go Back
               </button>
               </div>
               <div className="col-md-6"></div>
               </div>
               <ProfileHeader  profile={profile}/>
               <ProfileAbout profile={profile}/>
               <ProfileCreds education={profile.education} experience={profile.experience}/>
              {profile.githubusername?(<ProfileGithub username={profile.githubusername}/>):(null) } 
            </div>
        )
    }


    return (
        <div className="profile">
            <div className="container">
            <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>({
    auth:state.auth,
    profile:state.profile,
    error:state.errors
})

export default connect(mapStateToProps,{getProfileByUserId})(Profile)
