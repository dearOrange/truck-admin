import { GET } from '@/utils/request'

export function getDicts(type) {
  return GET('syDefinedCode/getListByType.do', { type })
}
