<template>
  <div class="reason--box">
    <div class="reason--content">
      <label>退回原因：</label>
      <div>
        <el-input
          :rows="2"
          v-model="textarea"
          class="reason--input"
          type="textarea"
          placeholder="请输入内容"
        />
        <span>请填写退回原因，100个字以内。</span>
      </div>
    </div>
    <div class="confirm--btns">
      <el-button class="confirm--btn" type="success" @click="submit">退回</el-button>
      <el-button class="confirm--btn" type="info" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { returnDepot } from '@/api/depot'
export default {
  name: 'Reason',
  props: {
    id: {
      type: Number | String,
      default: ''
    }
  },
  data() {
    return {
      textarea: ''
    }
  },
  methods: {
    async submit() {
      let { success } = await returnDepot(this.id, this.textarea)
      if (success) {
        this.$emit('close')
      }
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
<style>
.reason--input .el-textarea__inner {
  height: 120px !important;
}
</style>
<style lang="scss" scoped>
.reason--box {
  padding: 20px;
  & > .reason--content {
    display: flex;
    & > label {
      font-weight: 100;
    }
    & .reason--input {
      margin-bottom: 10px;
    }
  }
  & .confirm--btns {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }
  & .confirm--btn {
    width: 180px;
    height: 50px;
    margin: 0 15px;
    font-size: 16px;
  }
}
</style>
