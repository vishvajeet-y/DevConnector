import axios from 'axios'

import {GET_ERRORS,ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST,GET_POST,LIKE} from './types'

//Add Post
export const addPost=(postData)=>{
   return (dispatch)=>{
           axios.post('/api/posts',postData)
           .then((res)=>{
              // console.log(res.data)
                dispatch({
                    type:ADD_POST,
                    payload:res.data
                })
                dispatch({
                    type:GET_ERRORS,
                    payload:{}
                })
           })
           .catch((err)=>{
              dispatch({
                  type:GET_ERRORS,
                  payload:err.response.data
              })
           })
   }
}

//GET POSTS

export const getPosts=()=>{
    
    return (dispatch)=>{
        dispatch(setPostLoading())
            axios.get('/api/posts')
            .then((res)=>{
               // console.log(res.data)
                 dispatch({
                     type:GET_POSTS,
                     payload:res.data
                 })
            
            })
            .catch((err)=>{
                dispatch({
                    type:GET_POSTS,
                    payload:null
                })
            })
    }
 }

 //GET_POST

 export const getPost=(id)=>{
   
    return (dispatch)=>{
        dispatch(setPostLoading())
            axios.get(`/api/posts/${id}`)
            .then((res)=>{
               // console.log(res.data)
                 dispatch({
                     type:GET_POST,
                     payload:res.data
                 })
            
            })
            .catch((err)=>{
                dispatch({
                    type:GET_POST,
                    payload:null
                })
            })
    }
 }

//DELETE POST
export const deletePosts=(id)=>{
    return (dispatch)=>{
            axios.delete(`/api/posts/${id}`)
            .then((res)=>{
               // console.log(res.data)
               //We can simply call getPosts to fetch all the posts,
               //that will be also correct
                 dispatch({
                     type:DELETE_POST,
                     payload:id
                 })
            
            })
            .catch((err)=>{
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
             })
    }
 }
 //Add Likes

 export const addLikes=(post_id)=>{
    return (dispatch)=>{
            axios.post(`/api/posts/like/${post_id}`)
            .then((res)=>{
               // console.log(res.data)
                 dispatch({
                    type:LIKE,
                    payload:res.data
                })
            
            })
            .catch((err)=>{
                console.log(err)
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
             })
    }
 }

//Remove Like
 export const removeLikes=(post_id)=>{
    return (dispatch)=>{
            axios.post(`/api/posts/unlike/${post_id}`)
            .then((res)=>{
               // console.log(res.data)
            
                 dispatch({
                     type:LIKE,
                     payload:res.data
                 })
            
            })
            .catch((err)=>{
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
             })
    }
 }

 //Add comment
 export const addComment=(postId,CommentData)=>{
    return (dispatch)=>{
            axios.post(`/api/posts/comment/${postId}`,CommentData)
            .then((res)=>{
               // console.log(res.data)
                 dispatch({
                     type:GET_POST,
                     payload:res.data
                 })
                 dispatch({
                     type:GET_ERRORS,
                     payload:{}
                 })
            })
            .catch((err)=>{
               dispatch({
                   type:GET_ERRORS,
                   payload:err.response.data
               })
            })
    }
 }

 //Delete Comment 
 export const deleteComment=(postId,id)=>{
    return (dispatch)=>{
            axios.delete(`/api/posts/comment/${postId}/${id}`)
            .then((res)=>{
               // console.log(res.data)
                 dispatch({
                     type:GET_POST,
                     payload:res.data
                 })
            
            })
            .catch((err)=>{
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
             })
    }
 }


export const setPostLoading=()=>{
    return {
        type:POST_LOADING
    }
}