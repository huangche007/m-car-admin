import {createStore,combineReducers} from 'redux'
import adminReducer from '../store/admin'
export default createStore(combineReducers({
    adminReducer
}))