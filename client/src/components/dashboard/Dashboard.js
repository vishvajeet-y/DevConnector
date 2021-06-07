import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCurrentProfile} from '../../action/profile'
import {deleteAccount} from '../../action/profile'
import Spinner from '../common/Spinner'
import ProfileAction from './ProfileAction'
import Experience from './Experience'
import Education from './Education'

const Dashboard=(props)=> {
const {user}=props.auth
const {profile,loading}=props.profile

    useEffect(()=>{
         props.getCurrentProfile()
     
    },[]) 
   const deleteAccount=(e)=>{
       props.deleteAccount()
   }
   

    let dashboardcontent
             if(profile===null || loading)
             {
                 dashboardcontent=<Spinner/>
             } 
   
             else {
                 //Check if user logged in has profile data
                if(Object.keys(profile).length>0){
                    dashboardcontent=(
                        <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link></p>
                       <ProfileAction />
                       <Experience experience={profile.experience}/>
                       <Education education={profile.education}/>
                       <div style={{marginBottom: '60px'}}>
                       <button onClick={deleteAccount} className="btn btn-danger">
                         Delete My Account
                       </button>
                     </div>

                        </div>
                    )
                }
                else{
                      dashboardcontent=(
                          <div>
                          <p className="lead text-muted">Welcome {user.name}</p>
                          <p>You have not setup a Profile , please add some info</p>
                          <Link to='/create-profile' className="btn btn-lg btn-info">Create Profile</Link>
                          </div>
                      )
                }
             }
        return (
        <div className="dashboard">
        <div className="container">
        <div className="row">
        <div className="col-md-12">
        <h1 className="display-4"> Dashboard</h1>
       { dashboardcontent}
       </div>
        </div>
        </div>
          
        </div>
    )
}

const mapStateToProps=(state)=>({
profile:state.profile,
auth:state.auth
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)
