import Mock from 'mockjs'
import loginAPI from './login'
import rentAPI from './rent'

function wrapSuccessData(func) {
  return function(config) {
    let data = func(config)
    return {
      code: '0',
      data
    }
  }
}

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(
  /\/api\/login\/login/,
  'post',
  wrapSuccessData(loginAPI.loginByUsername)
)
// Mock.mock(/\/api\/login\/logout/, 'post', wrapSuccessData(loginAPI.logout))
// Mock.mock(/\/api\/user\/info\.*/, 'get', wrapSuccessData(loginAPI.getUserInfo))

// 求租相关
Mock.mock(/\/api\/rent\/list/, 'post', wrapSuccessData(rentAPI.getList))
Mock.mock(/\/api\/rent\/detail/, 'get', wrapSuccessData(rentAPI.getRent))
Mock.mock(/\/api\/rent\/update/, 'post', wrapSuccessData(rentAPI.updateRent))

export default Mock
