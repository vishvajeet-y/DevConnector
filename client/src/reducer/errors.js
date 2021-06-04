import React from 'react'
import {GET_ERRORS} from '../action/types'
const initialstate={}
 const errors=(state=initialstate,action)=> {
    switch(action.type){
        case GET_ERRORS:
            return action.payload
       
        default :
        return state
    }
}
export default errors
