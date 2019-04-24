<template>
  <div class="temperature-range">
    <el-input v-model="min" @change="onChange">
      <template slot="suffix">
        <span class="unit">℃</span>
      </template>
    </el-input>
    <span class="sep"></span>
    <el-input v-model="max" @change="onChange">
      <template slot="suffix">
        <span class="unit">℃</span>
      </template>
    </el-input>
  </div>
</template>

<script>
import { isUndefined } from 'lodash'

export default {
  name: 'TemperatureRange',
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
      min: isUndefined(this.value[0]) ? '' : this.value[0],
      max: isUndefined(this.value[1]) ? '' : this.value[1]
    }
  },

  methods: {
    onChange() {
      let { min, max } = this
      this.$emit('change', [min, max])
    }
  }
}
</script>

<style lang="scss" scoped>
.temperature-range {
  display: flex;
  width: 100%;

  > .sep {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    flex-shrink: 0;
    text-align: center;
    &::before {
      content: '';
      height: 1px;
      width: 40%;
      background: #999;
    }
  }
  .unit {
    margin-right: 10px;
  }
}
</style>

