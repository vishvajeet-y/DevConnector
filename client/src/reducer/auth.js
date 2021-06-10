
import {SET_CURRENT_USER} from '../action/types'
import isEmpty from '../validation/isEmpty'

const intialstate={
    isAuthenticate:false,
    user:{}
}
 const auth=(state=intialstate,action)=> {

     switch(action.type){
         
        case SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticate:!isEmpty(action.payload),
            user:action.payload

        }
       
         default :
         return state
     }

}
export default auth