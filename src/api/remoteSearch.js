import { GET } from '@/utils/request'

export function userSearch(name) {
  return GET('search/user', { name })
}
