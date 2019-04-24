import { GET } from '@/utils/request'

export function fetchList(query) {
  return GET('transaction/list', query)
}
