import React from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deletePosts,addLikes,removeLikes} from '../../action/post'

const PostItem=(props) =>{
    const {post,auth,showAction}=props

    const DeletePost=(id)=>{
        // console.log('delete post with id ',id)
         props.deletePosts(id)
    }
    const AddLike=(post_id)=>{
        // console.log('Like post with id ',id)
         props.addLikes(post_id)
    }
    const RemoveLike=(id)=>{
        // console.log('Unlike post with id ',id)
         props.removeLikes(id)
    }
 
    const  findUserLike=(likes)=>{
          if(likes.filter(like=>like.user===auth.user.id).length>0)
          return true
          else 
          return false
     }
  
    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
          <Link to={`/Userprofile/${post.user}`}>
              <img className="rounded-circle d-none d-md-block" src={post.avatar}
                alt="" />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showAction?(<span> <button type="button" className="btn btn-light mr-1"
            onClick={(e)=>{ AddLike(post._id)}} >
              <i className={classnames("fas fa-thumbs-up",{
                   'text-info':findUserLike(post.likes)
              }) }/>
              <span className="badge bg-light text-secondary ">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1" 
            onClick={(e)=>{RemoveLike(post._id)}}
            >
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
           {post.user===auth.user.id?(
            <button type="button" className="btn btn-danger mr-1"
             onClick={(e)=>{DeletePost(post._id)}}
            >
            <i className="fas fa-times" />
            </button>
           ):(null)
        
        }</span>):null}
           
          </div>
        </div>
      </div>

    )
}

PostItem.defaultProps={
  showAction:true
}
const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect(mapStateToProps,{deletePosts,addLikes,removeLikes})(PostItem)
