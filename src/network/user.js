import {request} from 'network/request'
export function _login(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone:phone,
            password:password
        }
    })
}


/**获取用户歌单 */
export function _getSongList(id){
    return request({
        url:'/user/playlist',
        params:{
            uid:id
        }
    })
}

export class PlayList{
    constructor(playlist){
        this.name=playlist.name;//为了方便menu使用
        this.id=playlist.id;
        this.cover=playlist.coverImgUrl;
    }
}

export function _getLoginstatus(){
    return request({
        url:'/login/status',
    })
}

export function _getLikelist(id) {
    return request({
      url: "/likelist",
      params: {
        uid: id,
      },
    });
  }
  