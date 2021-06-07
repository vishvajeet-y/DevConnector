import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteEducation} from '../../action/profile'

const Education=(props)=> {
    
    const onDeleteClick=(id)=>{
        // console.log('Delete this experienc',id)
       props.deleteEducation(id)

    }

     const education=props.education.map(edu=>(
         //console.log(edu)
         <tr key={edu._id}>
         <td>{edu.school}</td>
         <td>{edu.degree}</td>
         <td>{moment(edu.from).format('Do MMMM,YYYY')}{' '}-{' '}
             {edu.to===null?'Now': moment(edu.to).format('Do MMMM,YYYY') }
         </td>
         <td><button className="btn btn-danger"
          onClick={(e)=>{
              
            onDeleteClick(edu._id)
             }}
         >Delete</button></td>
         </tr>
     ))
    return (
        <div>
            <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                <thead>
                <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th></th>
                </tr>
                
                </thead>
                <tbody>{education}</tbody>
                </table>
            </div>
    )
}

export default connect(null,{deleteEducation})(Education)