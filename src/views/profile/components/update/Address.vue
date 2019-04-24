<template>
  <div class="address">
    <el-cascader v-model="address" :options="districts"/>
  </div>
</template>

<script>
import { regionDataPlus } from 'element-china-area-data'

export default {
  name: 'Address',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      address: [],
      districts: regionDataPlus // 第三方数据
    }
  }
}
</script>

<style lang="scss" scoped>
.address {
  /deep/ .el-cascader {
    width: 100%;
  }
}
</style>

