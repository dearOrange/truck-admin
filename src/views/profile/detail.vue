<template>
  <div class="ru-container">
    <h1>查看用户</h1>
    <template v-if="isLoading">加载中</template>
    <template v-else-if="isError">请求失败</template>
    <template v-else>
      <box>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="用户ID">{{ data.userId }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="用户名">{{ data.userAccount }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="头像">值</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="姓名">{{ data.userName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label
              :label-width="'7em'"
              label="性别"
            >{{ data.sex === 'F' ? '女士' : data.sex === 'M' ? '男士' : '' }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="业务单位">{{ data.bizUnitId }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="手机">{{ data.mobileNumber }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="微信">{{ data.wechat }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="邮箱">{{ data.email }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="QQ">{{ data.qq }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="状态">{{ data.status === 1 ? '启用' : '停用' }}</ru-label>
          </el-col>
        </el-row>
      </box>
    </template>
  </div>
</template>

<script>
import Box from '@/components/Crud/Box'
import Label from '@/components/Crud/Label'
import { fetchDetail } from '@/api/profile'
import detailMixinsFactory from '@/mixins/detail'

export default {
  name: 'ProfileDetail',
  components: {
    Box,
    RuLabel: Label
  },
  mixins: [detailMixinsFactory(fetchDetail)]
}
</script>

<style lang="scss" scoped>
.images {
  display: flex;
  > img {
    margin-right: 15px;
    width: 80px;
    height: 80px;
  }
}
</style>
