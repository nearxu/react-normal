import request from '@/utils/request'

export function login(data){
    return request({
        url:'admin/login',
        method:'post',
        data
    })
}

export function logout(data){
    return request({
        url:'login/logout',
        method:'post',
        data
    })
}

export function getUserInfo(data){
    return request({
        url:'login/logout',
        method:'post',
        data
    })
}