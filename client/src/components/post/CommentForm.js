import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addComment} from '../../action/post'

const CommentForm=(props) =>{

    const [text,settext]=useState('')
    const [errors,seterror]=useState('')
    useEffect(()=>{
        seterror(props.error)
    },[props.error])
   const onSubmit=((e)=>{
       e.preventDefault()
       const { postId}=props
       const newComment={
           text,
           name:props.auth.user.name,
           avatar:props.auth.user.avatar,
           user:props.auth.user._id
       }
       props.addComment(postId,newComment)
       settext('')
   })
    return (
    
          
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
           Make a Comment ...
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
               <TextAreaFieldGroup 
               value={text}
               name="text"
               placeholder="Reply to  post"
               onChange={(e)=>{settext(e.target.value)}}
               error={errors.text}
               />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps=(state)=>({
    auth:state.auth,
    error:state.errors
})

export default connect(mapStateToProps,{addComment})(CommentForm)
