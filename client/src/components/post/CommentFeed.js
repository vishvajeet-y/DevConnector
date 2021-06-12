import React from 'react'
import CommentItem from './CommentItem'
const CommentFeed=(props) =>{
       const {postId,comment}=props
    return  comment.map(comment=>(
        <CommentItem key={comment._id} comment={comment} postId={postId} />
    ))
       
     
}

export default CommentFeed
