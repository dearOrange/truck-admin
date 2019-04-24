import { POST } from '@/utils/request'

export function fetchList(params = {}) {
  return POST('user/getListByExt.do', params)
}
export function fetchDetail(userId) {
  return POST('user/getByExt.do', { userId })
}
export function disableList(userIds) {
  return POST('user/batchUpdateByDiscontinue.do', { userIds })
}
export function updateList(params = {}) {
  return POST('user/modifyInformation.do', params)
}
