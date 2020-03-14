import {get, post} from '../utils/request'
// import { APP_ID, APP_SECRET } from '../utils/const'

const INDEX_URL = 'https://test.youbaobao.xyz:18081'

export function getHomeData (params) {
  return get(`${INDEX_URL}/book/home/v2`, params)
}

export function recommend () {
  return get(`${INDEX_URL}/book/home/recommend/v2`)
}

export function freeRead () {
  return get(`${INDEX_URL}/book/home/freeRead/v2`)
}

export function hotBook () {
  return get(`${INDEX_URL}/book/home/hotBook/v2`)
}

export function search (params) {
  return get(`${INDEX_URL}/book/search`, params)
}

export function hotSearch () {
  return get(`${INDEX_URL}/book/hot-search`)
}

export function bookDetail (params) {
  return get(`${INDEX_URL}/book/detail`, params)
}

export function bookRankSave (params) {
  return get(`${INDEX_URL}/book/rank/save`, params)
}

export function bookContents (params) {
  return get(`${INDEX_URL}/book/contents`, params)
}

export function bookShelf (params) {
  return get(`${INDEX_URL}/book/shelf/get`, params)
}

export function bookShelfSave (params) {
  return get(`${INDEX_URL}/book/shelf/save`, {
    shelf: JSON.stringify(params)
  })
}

export function bookShelfRemove (params) {
  return get(`${INDEX_URL}/book/shelf/remove`, {
    shelf: JSON.stringify(params)
  })
}

export function searchList (params) {
  return get(`${INDEX_URL}/book/search-list`, params)
}

export function categoryList () {
  return get(`${INDEX_URL}/book/category/list/v2`)
}

export function userDay (params) {
  return get(`${INDEX_URL}/user/day`, params)
}

// 这里出错
export function getOpenId (code) {
  console.log('chuancode')
  console.log(code)
  console.log('未知原因')
  return get(`${INDEX_URL}/openId/get`, {
    appId: 'wxe79778009ee04c4c',
    secret: '15e3ea8d2fea605b413dbde27a57f714',
    code
  })
}
export function register (openId, userInfo) {
  return post(`${INDEX_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}
