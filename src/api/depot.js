import { POST, GET } from '@/utils/request'

export function fetchList(params = {}) {
  return POST('baStock/getListByBackstage.do', params)
}
export function checkItem(stockPublishUkid) {
  return POST('ptStockPublish/updateByExamine.do', { stockPublishUkid })
}
export function checkList(stockPublishUkids) {
  return POST('ptStockPublish/batchUpdateByStatus.do', { stockPublishUkids })
}
export function fetchDepot(stockPublishUkid) {
  return GET('baStock/getByExt.do', { stockPublishUkid })
}
export function updateDepot(params = {}) {
  return POST('rent/update', params)
}
export function saveDepot(params = {}) {
  return POST('baStock/saveByUnpublished.do', params)
}
export function returnDepot(stockPublishUkid, reason) {
  return POST('ptStockPublish/updateByRetreat.do', {
    stockPublishUkid,
    reason
  })
}
export function setList(stockPublishUkids) {
  return POST('ptStockPublish/updateByRecommend.do', { stockPublishUkids })
}
export function cancelList(stockPublishUkids) {
  return POST('ptStockPublish/updateByCancelRecommend.do', {
    stockPublishUkids
  })
}
