import {SET_LOGIN} from '../actions'
/**
 *登录
 * @export
 * @param {boolean} [state={isLogin:false}]
 * @param {*} action
 * @returns
 */
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