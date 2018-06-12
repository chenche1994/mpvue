// 工具函数库
import config from './config'
// get请求
export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}
// 把post和get请求封装起来
function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data: data,
      method: method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}
export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCanel: false
  })
}
export function showToast (title) {
  wx.showModal({
    title,
    icon: 'success',
    duration: 2000
  })
}
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}
