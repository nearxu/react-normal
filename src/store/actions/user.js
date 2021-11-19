import { login } from "../../api/user"
import * as types from "../action-types";
import {setToken} from '@/utils/auth'

export const getUserInfo = (info) => (dispatch) =>{
    return new Promise((resolve,reject) => {
        login(info).then(res => {
            const {result} = res.data
            dispatch(setUserInfo(result))
            setToken(result.token)
            resolve(info)
        }).catch(err => {
            reject(err)
        })
    })
}

export const setUserInfo = (info) => {
    return {
        type: types.USER_SET_USER_INFO,
        ...info,
    }
}