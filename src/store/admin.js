import {SET_LOGIN} from '../actions'
export default function(state = {isLogin:false},action){
    switch(action.type){
        case SET_LOGIN:
            return {
                ...state,
                isLogin:action.value
            }
        default:
            return state    
    }
}