import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import Spinner from '../common/Spinner'
import {getPosts} from '../../action/post'
const Posts=(props)=> {
    const {loading,posts}=props.post
      useEffect(()=>{
        props.getPosts()
      },[])
    let postContent
   if(posts===null||loading){
        postContent=<Spinner />
    }
  
    else{
        postContent=<PostFeed posts={posts} />
    }

    return (
        <div className="feed">
        <div className="container">
        <div className="col-md-12">
        <PostForm />
        {postContent}
        </div>
        </div>            
        </div>
    )
}

const mapStateToProps=(state)=>({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Posts)
