<template>
  <div class="label">
    <div :style="{ width: labelWidth ? labelWidth : '' }" class="key">{{ label }}：</div>
    <div class="values">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '4em'
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  > .key {
    flex: 0 auto;
    flex-shrink: 0;
    text-align: right;
  }
  > .values {
    flex: 1 auto;
    margin-left: 10px;

    /deep/ .el-form-item {
      margin: 0;
    }
  }
}
</style>

