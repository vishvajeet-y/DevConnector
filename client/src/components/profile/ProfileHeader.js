import React from 'react'
import isEmpty from '../../validation/isEmpty'

const ProfileHeader=(props)=> {
    const {profile}=props

    return (
        <div className="profile-header">
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={profile.user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">{profile.user.status} 
              {isEmpty(profile.company)?null:(<span> at {profile.company}</span>)}
              
              </p>
              <p>{isEmpty(profile.location)?null:(<span>  {profile.location}</span>)}</p>
              <p>
                
              {isEmpty(profile.website)?null:( 
                  <a className="text-white p-2" href={profile.website} rel="noreferrer" target="_blank">
                 <i className="fas fa-globe fa-2x"></i>
                  </a>
               )}
              
               {isEmpty(profile.social && profile.social.twitter)?null:( 
                <a className="text-white p-2" href={profile.social.twitter} rel="noreferrer" target="_blank">
                <i className="fab fa-twitter fa-2x"></i>
                </a>
             )}
             {isEmpty(profile.social && profile.social.facebook)?null:( 
                <a className="text-white p-2" href={profile.social.facebook} rel="noreferrer" target="_blank">
                <i className="fab fa-facebook fa-2x"></i>
                </a>
             )}
             {isEmpty(profile.social && profile.social.linkedin)?null:( 
                <a className="text-white p-2" href={profile.social.linkedin} rel="noreferrer" target="_blank">
                <i className="fab fa-linkedin fa-2x"></i>
                </a>
             )}
             {isEmpty(profile.social && profile.social.youtube)?null:( 
                <a className="text-white p-2" href={profile.social.youtube} rel="noreferrer" target="_blank">
                <i className="fab fa-youtube fa-2x"></i>
                </a>
             )}
             {isEmpty(profile.social && profile.social.instagram)?null:( 
                <a className="text-white p-2" href={profile.social.instagram} rel="noreferrer" target="_blank">
                <i className="fab fa-instagram fa-2x"></i>
                </a>
             )}
             
              
              </p>
            </div>
          </div>
        </div>
      </div>

             </div>
       
    )
}

export default ProfileHeader
