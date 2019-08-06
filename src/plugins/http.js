import axios from "axios"
import { Message } from 'element-ui'
import { showLoading, hideLoading } from './loading'

let baseURL = '';
if( process.env.NODE_ENV === "development" ){
    baseURL = 'http://127.0.0.1:8081'; // 开发环境 api接口
}else{
    baseURL = 'http://127.0.0.1:8082';   // 线上环境api接口
}

// 创建axios实例
const service = axios.create({
    baseURL: baseURL,
    timeout: 10000  // 请求超时时间
})

//http request(请求) 拦截器
service.interceptors.request.use(
    config => {
        showLoading();
        if(config.data instanceof FormData){
            config.headers = {
                'Content-Type':'multipart/form-data'
            }
        }else{
            config.data = JSON.stringify(config.data);
            config.headers = {
                // 'Content-Type':'application/x-www-form-urlencoded'
                'Content-Type':'application/json'
            }
        }
        // console.log('http request(请求) success', config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response(响应) 拦截器
service.interceptors.response.use(
    response => {
        hideLoading();
        // console.log('http response(响应) success', response);
        return response;
    },
    error => {
        hideLoading();
        // console.log('http response(响应) error', error);
        return Promise.reject(error)
    }
);


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
*/
export function get(url,params={}){
    return new Promise((resolve,reject) => {
        service.get(url,{
            params: params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            Message({
                showClose: true,
                message: err,
                duration: 2000,
                type: 'error'
            });
            reject(err)
        })
    })
} 


  /**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}){
    return new Promise((resolve,reject) => {
        service.post(url, data)
        .then(response => {
            resolve(response.data);
        },err => {
            Message({
                showClose: true,
                message: err,
                duration: 2000,
                type: 'error'
            })
            reject(err)
        })
    })
}