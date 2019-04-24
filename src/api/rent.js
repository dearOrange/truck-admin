import { POST, GET } from '@/utils/request'

export function fetchList(params = {}) {
  return POST('ptStockDemand/getListByBackstage.do', params)
}
export function checkItem(stockDemandUkid) {
  return POST('ptStockDemand/updateByExamine.do', { stockDemandUkid })
}
export function checkList(stockDemandUkids) {
  return POST('ptStockDemand/batchUpdateByStatus.do', { stockDemandUkids })
}
export function fetchRent(stockDemandUkid) {
  return GET('ptStockDemand/getById.do', { stockDemandUkid })
}
export function updateRent(params = {}) {
  return POST('rent/update', params)
}
export function saveRent(params = {}) {
  return POST('ptStockDemand/saveByUnpublished.do', params)
}
export function returnRent(stockDemandUkid, reason) {
  return POST('ptStockDemand/updateByRetreat.do', {
    stockDemandUkid,
    reason
  })
}
