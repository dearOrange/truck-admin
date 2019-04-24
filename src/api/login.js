import { POST } from '@/utils/request'

export function loginByUsername(username, password) {
  return POST('login/validate.do', {
    userAccount: username,
    userPassword: password
  })
}

export function logout() {
  return POST('login/logout')
}

export function getUserInfo() {
  return POST('user/getLoginUser.do')
}
