import { request } from "./request";

export function _getRankList() {
    return request({
        url: '/toplist',
    })
}