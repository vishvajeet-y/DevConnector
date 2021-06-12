import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addPost} from '../../action/post'

const PostForm=(props) =>{
    const [text,settext]=useState('')
    const [errors,seterror]=useState('')
    useEffect(()=>{
        seterror(props.error)
    },[props.error])
   const onSubmit=((e)=>{
       e.preventDefault()
       const newPost={
           text,
           name:props.auth.user.name,
           avatar:props.auth.user.avatar,
           user:props.auth.user._id
       }
       props.addPost(newPost)
       settext('')
   })
    return (
    
          
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
               <TextAreaFieldGroup 
               value={text}
               name="text"
               placeholder="Create a post"
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

export default connect(mapStateToProps,{addPost})(PostForm)
