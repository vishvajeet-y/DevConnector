import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteComment} from '../../action/post'
const CommentItem=(props) =>{
    const {comment,postId,auth}=props
    const DeleteComment=(postId,id)=>{
        // console.log('delete post with id ',id)
         props.deleteComment(postId,id)
    }
    return (
         <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <Link to={`/Userprofile/${comment.user}`}>
                    <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                  </Link>
                  <br />
                  <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{comment.text}</p>
                  {comment.user===auth.user.id?(
                    <button type="button" className="btn btn-danger mr-1"
                     onClick={(e)=>{DeleteComment(postId,comment._id)}}
                    >
                    <i className="fas fa-times" />
                    </button>
                   ):(null)}
                </div>
              </div>
            </div>
    )
}

const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem)
