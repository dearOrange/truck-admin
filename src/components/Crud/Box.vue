<template>
  <section class="box">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <div class="body">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  > h2.title {
    padding: 12px 15px;
    margin: 0;
    font-size: 16px;
    font-weight: normal;
    border-bottom: 1px solid #e6e9ed;
  }
  > .body {
    padding: 25px 15px;
    font-size: 14px;

    /deep/ .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
