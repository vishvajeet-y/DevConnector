import {ADD_POST, DELETE_POST, GET_POSTS, POST_LOADING,GET_POST,LIKE} from '../action/types'
const intialState={
    posts:[],
    post:{},
    loading:false
}

const Post=(state=intialState,action)=>{
    //console.log(action.payload)
    switch(action.type){
       case ADD_POST:
           return {
               ...state,
               posts:[action.payload,...state.posts]
           }
        case GET_POSTS:
            return {
                ...state,
                posts:action.payload,
                loading:false
            }   
        case GET_POST:
            return {
                 ...state,
                 post:action.payload,
                 loading:false
            }    
        case POST_LOADING:
            return {
                ...state,
                loading:true
                
            }    
        case DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter(post=>post._id!==action.payload)
            }    
        case LIKE:
            return {
                ...state,
                posts:state.posts.map(post=>{
                 
                     if(post._id===action.payload._id)
                     {
                         return {...action.payload}
                     }
                     else 
                     return {...post}

                })
            }    

          
        default:
            return state
    }


}

export default Post