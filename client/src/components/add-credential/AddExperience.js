import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addExperience} from '../../action/profile'

function AddExperience(props) {
  const [company,setcompany]=useState('')
  const [title,settitle]=useState('')
  const [location,setlocation]=useState('')
  const [from,setfrom]=useState('')
  const [to,setto]=useState('')
  const [current,setcurrent]=useState(false)
  const [description,setdescription]=useState('')
  const [errors,seterrors]=useState({})
  const [disabled,setdisabled]=useState(false)

  useEffect(()=>{
   
     seterrors(props.error)
  },[props.error])
  
  const handle_company=(e)=>{
     setcompany(e.target.value)
  }
  const handle_title=(e)=>{
      settitle(e.target.value)
}
const handle_location=(e)=>{
    setlocation(e.target.value)
}
const handle_from=(e)=>{
    setfrom(e.target.value)
}
const handle_to=(e)=>{
    setto(e.target.value)
}
const handle_current=(e)=>{
    setcurrent(!current)
    setdisabled(!disabled)
}
const handle_description=(e)=>{
    setdescription(e.target.value)
}



const onSubmit=(e)=>{
   e.preventDefault()

   //console.log('form has been submitted')
    const experienceData={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
     props.addExperience(experienceData,props.history)
}

    return (
        <div className="section add-experience">
        <div className="container">
        <div className="row">
        <div className="col-md-8 m-auto">
        <Link to="/dashboard" className="btn btn-light">Go Back</Link>
        <h1 className="display-4 text-center">Add Your Experience</h1>
        <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
         <small className="d-block pb-3">* = required field</small>
         <form onSubmit={onSubmit}>
         
         <TextFieldGroup 
         type="text"
         placeholder="* Job Title"
          name="title" 
          value={title}
          onChange={handle_title}
          error={errors.title}
         />
         <TextFieldGroup 
         type="text" 
         placeholder="* Company" 
         name="company"
         value={company}
         onChange={handle_company}
         error={errors.company}
         />
         <TextFieldGroup
         type="text" 
         placeholder="Location" 
         name="location"
         value={location}
         onChange={handle_location}
         error={errors.location} 
         />
         <h6 >From Date</h6>
         <TextFieldGroup
         type="date"
         name="from"
         value={from}
         onChange={handle_from}
         error={errors.from}
         />
         <h6>To Date</h6>
         <TextFieldGroup 
         type="date"
         name="to"
         value={to}
         onChange={handle_to}
         error={errors.to} 
         disabled={disabled?'disabled':''}
         />
         <div className="form-check mb-4">
         <input 
         className="form-check-input" 
         type="checkbox" 
         name="current" 
         value={current} 
         checked={current}
         onChange={handle_current}
         id="current"
          />
         <label className="form-check-label" htmlFor="current">
           Current Job
         </label>
       </div>       
         <TextAreaFieldGroup 
         placeholder="Job Description" 
         name="description"
         value={description}
         onChange={handle_description}
         error={errors.description} 
         info="Some of your responsabilities, etc"
         />
         <input type="submit" value="Submit" className="btn btn-info col-12 mt-4" />
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

export default  connect(mapStateToProps,{addExperience})(withRouter(AddExperience))