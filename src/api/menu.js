import request from '@/utils/request'

export function getMenu(){
    return request({
        url:'admin/menus',
        methods:'get'
    })
}