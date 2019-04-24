<template>
  <div class="expcted-price">
    <el-switch v-model="definite" active-text="具体" inactive-text="面议" @change="onChange"/>
    <template v-if="definite">
      <div class="range">
        <el-input v-model="min" class="price-inp" @change="onChange"/>
        <span class="sep"></span>
        <el-input v-model="max" class="price-inp" @change="onChange"/>
        <el-select v-model="unit" class="unit" @change="onChange">
          <el-option label="㎡/月" value="1"/>
          <el-option label="托/天" value="2"/>
        </el-select>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ExpectedPrice',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Array, String],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      min: '',
      max: '',
      unit: '',
      definite: true // 确定的
    }
  },

  methods: {
    onChange() {
      // 根据最终的状态 返回适当的数据
      this.$emit('change', []) // TODO
    }
  }
}
</script>

<style lang="scss" scoped>
.expcted-price {
  display: flex;
  align-items: center;
  > .range {
    display: flex;
    margin-left: 15px;
    .price-inp {
      width: 80px;
    }
    .unit {
      width: 120px;
      margin-left: 10px;
    }
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
  }
}
</style>

