<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.el-date-editor {
  /deep/ .el-range-separator {
    width: auto;
  }
}
body,
html,
p,
div,
ul,
li,
ol,
img,
a,
span,
h1,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
}
ul,
li {
  list-style: none;
}
</style>

