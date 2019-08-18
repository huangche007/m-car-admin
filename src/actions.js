export const SET_LOGIN = 'set_login';

/**
 *
 *是否登录
 * @export
 * @param {*} isLogin
 * @returns
 */
export function setLogin(isLogin){
    return{
        type:SET_LOGIN,
        value:isLogin
    }
}