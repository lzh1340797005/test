import { request } from "./request";

export function _getArtist(area,type,initial=-1,limit,offset){
    return request({
        url:'/artist/list',
        params:{
            area:area,
            type:type,
            initial:initial,
            limit:limit,
            offset:offset
        }
    })
}

//获取歌手所有歌曲
export function _getArtistAllMusic(id,limit,offset){
    return request({
        url:'/artist/songs',
        params:{
            id:id,
            limit:limit,
            offset:offset
        }
    })
}

export function _getArtistDesc(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }
    })
}
//获取歌手 mv
export function _getArtistMv(id){
    return request({
        url:'/artist/mv',
        params:{
            id:id
        }
    })
}
/**获取歌手热门五十首歌曲 */
export function _getArtistHot50(id){
    return request({
        url:'/artist/top/song',
        params:{
            id:id
        }
    })
}

/**获取歌手专辑 */
export function _getArtistAlbum(id){
    return request({
        url:'/artist/album',
        params:{
            id:id
        }
    })
}
/**获取专辑内容 */
export function _getAlbum(id){
    return request({
        url:'/album',
        params:{
            id:id
        }
    })
}

/**获取歌手描述 */
export function _getArtistDescDetail(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }
    })
}

/**获取相识歌手 */
export function _getSimiArtist(id){
    return request({
        url:'/simi/artist',
        params:{
            id:id
        }
    })
}