export default {
  server: process.env.NODE_ENV === 'development' ? '/api' : '/api',
  dict: {
    key: 'definedCode',
    val: 'definedName'
  }
}
