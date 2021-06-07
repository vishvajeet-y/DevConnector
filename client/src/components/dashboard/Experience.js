import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteExperience} from '../../action/profile'

const Experience=(props)=> {
    
    const onDeleteClick=(id)=>{
        // console.log('Delete this experienc',id)
       props.deleteExperience(id)

    }

     const experience=props.experience.map(exp=>(
         //console.log(exp)
         <tr key={exp._id}>
         <td>{exp.company}</td>
         <td>{exp.title}</td>
         <td>{moment(exp.from).format('Do MMMM,YYYY')}{' '}-{' '}
             {exp.to===null?'Now': moment(exp.to).format('Do MMMM,YYYY') }
         </td>
         <td><button className="btn btn-danger"
          onClick={(e)=>{
              
            onDeleteClick(exp._id)
             }}
         >Delete</button></td>
         </tr>
     ))
    return (
        <div>
            <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                <thead>
                <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
                <th></th>
                </tr>
                
                </thead>
                <tbody>{experience}</tbody>
                </table>
            </div>
    )
}

export default connect(null,{deleteExperience})(Experience)