import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {
  Message,
  Loading
} from 'element-ui'
// 响应时间
axios.defaults.timeout = 500 * 1000
// 配置cookie
axios.defaults.withCredentials = true //允许携带cookie
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

// 配置接口地址 开发
axios.defaults.baseURL = '/api'
//测试
// axios.defaults.baseURL = 'http://192.168.0.107:8080'
//线上
// axios.defaults.baseURL = ''
var loadingInstance
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: '数据加载中，请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  response => {
    loadingInstance.close()
    // console.log('http response(响应) success', response);
    return response;
  },
  error => {
    loadingInstance.close()
    // console.log('http response(响应) error', error);
    return Promise.reject(error)
  }
)
// 发送请求
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}