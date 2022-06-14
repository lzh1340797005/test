import { request } from "./request";
import { formatDate } from "utils/tool";

export function _getMusicListDetail(id) {
  return request({
    url: "playlist/detail",
    params: {
      id: id,
    },
  });
}

export function _getSub(id, limit) {
  return request({
    url: "/playlist/subscribers",
    params: {
      id: id,
      limit,
    },
  });
}

export function _getMusicUrl(id) {
  return request({
    url: "/song/url",
    params: {
      id: id,
    },
  });
}

/**获取歌单歌曲信息 */
export function _getSongsDetail(arr) {
  return request({
    url: "/song/detail",
    params: {
      ids: arr,
    },
  });
}

//获取歌词
export function _getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id: id,
    },
  });
}

/**对歌曲数据进行封装 */
export class songDetail {
  constructor(songs) {
    this.id = songs[0].id;
    this.name = songs[0].name;
    this.album = songs[0].al.name;
    let str = [];
    for (let i = 0; i < songs[0].ar.length; i++) {
      //   console.log(i);
      if (i < songs[0].ar.length -1 ){
        str.push(songs[0].ar[i].name +"/");
      } 
      else {
        str.push(songs[0].ar[i].name );
      }
      //   this.artist = song[0].ar[i].name;
    }
    let strs=str.join('')
    this.artist = strs;
    this.pic = songs[0].al.picUrl;
    this.time = formatDate(new Date(songs[0].dt), "mm:ss");
  }
}

//获取评论
export function _musicRecommend(id, limit, offset) {
  return request({
    url: "/comment/music",
    params: {
      id: id,
      limit: limit,
      offset,
    },
  });
}

/**对歌单发表评论 */
export function _pushCommend(cookie, id, content) {
  return request({
    url: "/comment",
    params: {
      cookie: cookie,
      t: 1,
      type: 2,
      id: id,
      content: content,
    },
  });
}

export function _getRecommends(id, limit, offset) {
  return request({
    url: "/comment/playlist",
    params: {
      id: id,
      limit: limit,
      offset,
    },
  });
}

export class baseInfo {
  constructor(playlist) {
    this.img = playlist.coverImgUrl || "";
    this.title = playlist.description;
    this.name = playlist.name;
    this.shareCount = playlist.shareCount;
    this.subscribedCount = playlist.subscribedCount;
    this.playCount = playlist.playCount;
    this.trackCount = playlist.trackCount;
    this.tags = playlist.tags;
    this.createTime = playlist.createTime;
    this.creatorAvatar = playlist.creator.avatarUrl;
    this.creatorName = playlist.creator.nickname;
  }
}
