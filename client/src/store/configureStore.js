import {combineReducers,createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import errorReducer from '../reducer/errors'
import authReducer from '../reducer/auth'

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default ()=>{
const store=createStore(combineReducers({
   errors:errorReducer,
   auth:authReducer,
 
}),
composeEnhancer(applyMiddleware(thunk))
// compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
)
return store
}

 