// 工具函数库

import config from '../config/index.js'

// get 请求
function get (url,data) {
  return request(url,"GET",data)
}
// post 请求
function post (url,data) {
  return request(url,"POST",data)
}
// get or post 请求
function request(url,method,data,header={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      data,
      method,
      header,
      url:config.host+url,
      success:function(res){
        if(res.data.code===0){
          resolve(res.data.data);
        } else{
          showModal("失败",res.data.data.msg)
          reject(res.data);
        }
      }
    })
  })
}

// 几秒的提示框
function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}

function showModal(title,content){
  wx.showModal({
    title,
    content,
    showCancel:false
  })
}

// 日志日期转换
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  get,
  post,
  showSuccess,
  showModal
}
