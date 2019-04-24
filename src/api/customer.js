import { POST } from '@/utils/request'

export function fetchList(params = {}) {
  return POST('ptIntention/getListByModel.do', params)
}

export function fetchDetail(intentionUkid) {
  return POST('ptIntention/getById.do', { intentionUkid })
}
export function updateDepot(params = {}) {
  return POST('ptIntention/updatePtIntention.do', params)
}

export function closeItem(intentionUkid) {
  return POST('ptIntention/updateByClose.do', { intentionUkid })
}
export function closeList(intentionUkids) {
  return POST('ptIntention/batchUpdateByClose.do', { intentionUkids })
}
export function compulteItem(intentionUkid) {
  return POST('ptIntention/updateByComplete.do', { intentionUkid })
}
export function compulteList(intentionUkids) {
  return POST('ptIntention/batchUpdateByComplete.do', { intentionUkids })
}
