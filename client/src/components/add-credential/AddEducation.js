import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addEducation} from '../../action/profile'

function AddEducation(props) {
  const [school,setschool]=useState('')
  const [degree,setdegree]=useState('')
  const [fieldofstudy,setfieldofstudy]=useState('')
  const [from,setfrom]=useState('')
  const [to,setto]=useState('')
  const [current,setcurrent]=useState(false)
  const [description,setdescription]=useState('')
  const [errors,seterrors]=useState({})
  const [disabled,setdisabled]=useState(false)

  useEffect(()=>{
   
     seterrors(props.error)
  },[props.error])
  
  const handle_degree=(e)=>{
     setdegree(e.target.value)
  }
  const handle_school=(e)=>{
      setschool(e.target.value)
}
const handle_fieldofstudy=(e)=>{
    setfieldofstudy(e.target.value)
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
    const educationData={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
     props.addEducation(educationData,props.history)
}

    return (
        <div className="section add-education">
        <div className="container">
        <div className="row">
        <div className="col-md-8 m-auto">
        <Link to="/dashboard" className="btn btn-light">Go Back</Link>
        <h1 className="display-4 text-center">Add Your Education</h1>
        <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
         <small className="d-block pb-3">* = required field</small>
         <form onSubmit={onSubmit}>
         
         <TextFieldGroup 
         type="text"
         placeholder="* School Or Bootcamp" 
         name="school" 
          value={school}
          onChange={handle_school}
          error={errors.school}
         />
         <TextFieldGroup 
         type="text" 
         placeholder="* Degree Or Certificate" 
         name="degree"
         value={degree}
         onChange={handle_degree}
         error={errors.degree}
         />
         <TextFieldGroup
         type="text" 
         placeholder="* Field Of Study" 
         name="fieldofstudy"
         value={fieldofstudy}
         onChange={handle_fieldofstudy}
         error={errors.fieldofstudy} 
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
           Current 
         </label>
       </div>       
         <TextAreaFieldGroup 
         placeholder="Program  Description" 
         name="description"
         value={description}
         onChange={handle_description}
         error={errors.description} 
         info="Tell us about your experience and what you learned"
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

export default  connect(mapStateToProps,{addEducation})(withRouter(AddEducation))