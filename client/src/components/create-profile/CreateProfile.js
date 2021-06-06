import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import {createProfile} from '../../action/profile'

const CreateProfile=(props)=> {
  
    const[displaySocialInputs,setSocialInputs]=useState(false)
    const[handle,sethandle]=useState('')
    const[company,setcompany]=useState('')
    const[website,setwebsite]=useState('')
    const[location,setlocation]=useState('')
    const[status,setstatus]=useState('')
    const[skills,setskills]=useState('')
    const[githubusername,setgithubusername]=useState('')
    const[bio,setbio]=useState('')
    const[twitter,settwitter]=useState('')
    const[facebook,setfacebook]=useState('')
    const[linkedin,setlinkedin]=useState('')
    const[youtube,setyoutube]=useState('')
    const[instagram,setinstagram]=useState('')
    const[errors,seterrors]=useState({})
    
     
   const  onSubmit=(e)=>{
            e.preventDefault()
            const profileData={
            displaySocialInputs,
            handle,
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
            }
           // console.log(profileData)
            props.createProfile(profileData,props.history)
     }

     useEffect(()=>{
        //    console.log('useeffect is running');
            seterrors(props.error)
         
            },[props.error])

    const handle_displaySocialInputs=(()=>{
       // console.log('button is clicked')
        setSocialInputs(!displaySocialInputs)
    })

     const handle_profile=((e)=>{
         sethandle(e.target.value)
     })

     const handle_company=((e)=>{
        setcompany(e.target.value)
    })

    const handle_website=((e)=>{
        setwebsite(e.target.value)
    })

    const handle_location=((e)=>{
       setlocation(e.target.value)
   })
    const handle_status=((e)=>{
    setstatus(e.target.value)
    })

    
    const handle_skills=((e)=>{
        setskills(e.target.value)
    })

    const handle_githubuser=((e)=>{
    setgithubusername(e.target.value)
    })

    const handle_bio=((e)=>{
    setbio(e.target.value)
    })

    const handle_twitter=((e)=>{
        settwitter(e.target.value)
        })
    
        
        const handle_facebook=((e)=>{
            setfacebook(e.target.value)
        })
    
        const handle_linkedin=((e)=>{
        setlinkedin(e.target.value)
        })
    
        const handle_instagram=((e)=>{
        setinstagram(e.target.value)
        })

        const handle_youtube=((e)=>{
            setyoutube(e.target.value)
            })

         //Select options for status
     const options=[
        {label:'* Select Professional Status',value:0},
        {label:'Developer',value:'Developer'},
        {label:'Junior Developer',value:'Junior Developer'},
        {label:'Senior Developer',value:'Senior Developer'},
        {label:'Manager',value:'Manager'},
        {label:'Student or Learning',value:'Student or Learning'},
        {label:'Instructor or Teacher',value:'Instructor or Teacher'},
        {label:'Intern',value:'Intern'},
        {label:'Other',value:'Other'},
    ]

    let SocialInputs

    if(displaySocialInputs)
    {
        SocialInputs=(
            <div>
            <InputGroup 
               placeholder="Twitter Profile URL"
               name="twitter"
               icon="fab fa-twitter"
               value={twitter}
               onChange={handle_twitter}
               error={errors.twitter}
            />
            <InputGroup 
               placeholder="Facebook Page URL" 
               name="facebook" 
               icon="fab fa-facebook"
               value={facebook}
               onChange={handle_facebook}
               error={errors.facebook}
            />
            <InputGroup 
               placeholder="Linkedin Profile URL" 
               name="linkedin"
               icon="fab fa-linkedin-square"
               value={linkedin}
               onChange={handle_linkedin}
               error={errors.linkedin}
            />
            <InputGroup 
               placeholder="YouTube Channel URL"
               name="youtube" 
               icon="fab fa-youtube"
               value={youtube}
               onChange={handle_youtube}
               error={errors.youtube}
            />
            <InputGroup 
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={instagram}
            onChange={handle_instagram}
            error={errors.instagram}
         />
            </div>
        )
    }

    return (
        <div className="create-profile">
        <div className="container">
        <div className="row">
        <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Create Your Profile</h1>
       <p className="lead text-center">
       Let's get some information to make your profile stand out
       </p>
       <small className="d-block pb-3">*=required fields</small>
       <form onSubmit={onSubmit}>
       <TextFieldGroup 
        placeholder="* Profile handle"
        name="handle"
        value={handle}
        onChange={handle_profile}
        error={errors.handle}
        info="A unique handle for your profile URL. Your full name, company name, nickname, etc "
       />

       <SelectListGroup 
     
       name="status"
       value={status}
       options={options}
       onChange={handle_status}
       error={errors.status}
       info="Give us an idea of where you are at in your career"
      />

      <TextFieldGroup 
      placeholder="Company"
      name="company"
      value={company}
      onChange={handle_company}
      error={errors.company}
      info="Could be your own company or one you work for "
     />

     <TextFieldGroup 
        placeholder="Website"
        name="website"
        value={website}
        onChange={handle_website}
        error={errors.website}
        info="Could be your own or a company website "
       />

       <TextFieldGroup 
        placeholder="Location"
        name="location"
        value={location}
        onChange={handle_location}
        error={errors.location}
        info="City & state suggested (eg. Bengaluru, Delhi) "
       />

       <TextFieldGroup 
        placeholder="* Skills"
        name="skills"
        value={skills}
        onChange={handle_skills}
        error={errors.skills}
        info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
       />

       <TextFieldGroup 
        placeholder="Github Username"
        name="githubusername"
        value={githubusername}
        onChange={handle_githubuser}
        error={errors.githubusername}
        info="If you want your latest repos and a Github link, include your username "
       />

       <TextAreaFieldGroup 
        placeholder="A short bio of yourself"
        name="bio"
        value={bio}
        onChange={handle_bio}
        error={errors.bio}
        info="Tell us a little about yourself "
       />
        <div className="mb-3 mt-3">
        <button
        type="button"
         className="btn btn-light me-2"
         onClick={handle_displaySocialInputs}
        >
        Add Social Network Links
        </button>
        <span className="text-muted">Optional</span>
        </div>
        <div>
        {SocialInputs}
        </div>
        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
       </form>
       
        </div>
        </div>
        </div>
            
        </div>
    )
}

const mapStateToProps=(state)=>({
    profile:state.profile,
    error:state.errors
})

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile))