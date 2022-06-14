import { request } from "./request";

export function _getBanner(){
    return request({
        url:'/banner'
    })
}

export function _getPersonalized(config){
    return request({
        url:'/personalized',
        params:{
            limit:config
        }
    })
}
export function _getPrivateContent() {
    return request({
        url: "/personalized/privatecontent"
    })
}
export function _getNewSong() {
    return request({
        url: '/personalized/newsong',
    })
}
/**最新歌曲 */
export function _getTopSongs(type) {
    return request({
        url: '/top/song',
        params: {
            type: type
        }
    })
}