import React ,{useEffect}from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../common/Spinner'
import {getPost} from '../../action/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
const Post=(props)=> {
    const {post,loading}=props.post
    useEffect(()=>{
        props.getPost(props.match.params.id)
    },[])
    let postContent
     
    if(post===null||loading||Object.keys(post).length===0)
   {
       postContent=<Spinner />
   }
   else{
       postContent=(<div>
        <PostItem post={post} showAction={false}/>
        <CommentForm postId={post._id}/>
        <CommentFeed postId={post._id} comment={post.comments} />
         </div>)
   } 
    
    

    return (
        <div className="post">
        <div className="container">
        <div className="row">
        <div className="col-md-12">
        <Link className="btn btn-light mb-3" to="/feed">
         Back to Feed
        </Link>
        {postContent}
        </div>
        </div>
        </div>
           
        </div>
    )
}

const mapStateToProps=(state)=>({
    post:state.post
})

export default connect(mapStateToProps,{getPost})(Post)
