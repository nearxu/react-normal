import { getMenu } from "@/api/menu"
import * as types from "../action-types";
import {getAsyncRouter} from '@/router/asyncRouter'

export const getMenus = () => (dispatch) =>{
    return new Promise((resolve,reject) => {
        getMenu().then(res => {
            const {result} = res.data
            const data = getAsyncRouter(result)
            console.log(data,'data------------');
            dispatch(setMenus(data))
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const setMenus = (menus) => {
    return {
        type: types.SET_MENUS,
        menus,
    }
}