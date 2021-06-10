import React from 'react'
import isEmpty from '../../validation/isEmpty'

const ProfileAbout=(props)=> {
    const {profile}=props
    //Get Firstname
    const firstname=profile.user.name.trim().split(' ')[0]
   //Skill list 
   const skills=profile.skills.map((skill,index)=>(
       <div key={index} className="p-3">
       <i className="fa fa-check" />{skill}
       </div>
   ) )
    
    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstname}'s Bio</h3>
           {isEmpty(profile.bio)?(<p className="lead text-center"><span >{firstname} does not have a bio </span> </p>):
            (<p className="lead"><span>{profile.bio} </span> </p>)}
           
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
               {skills}
            </div>
          </div>
        </div>
        </div>
      </div>
    )
}

export default ProfileAbout
