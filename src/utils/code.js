export function listState(state) {
  switch (state) {
    case 10:
      state = '发起'
      break
    case 60:
      state = '完成'
      break
    case 99:
      state = '关闭'
      break
  }
  return state
}
