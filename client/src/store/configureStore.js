import {combineReducers,createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import errorReducer from '../reducer/errors'
import authReducer from '../reducer/auth'
import profileReducer from '../reducer/profile'

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 const ConfigureStore=()=>{
const store=createStore(combineReducers({
   errors:errorReducer,
   auth:authReducer,
   profile:profileReducer
}),
composeEnhancer(applyMiddleware(thunk))
// compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
)
return store
}
export default ConfigureStore
 