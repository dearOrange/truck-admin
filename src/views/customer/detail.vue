<template>
  <div class="ru-container">
    <h1>查看沟通记录</h1>
    <template v-if="isLoading">加载中</template>
    <template v-else-if="isError">请求失败</template>
    <template v-else>
      <box>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="记录ID">{{ data.intentionUkid }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="关联标题">{{ data.intentionUkid }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="关联类型">{{ data.relatedDataTypeName }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="联系人">{{ data.contactName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="联系手机">{{ data.contactMobile }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="联系电话">{{ data.contactTel }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="性别">{{ data.genderName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="状态">{{ data.intentionStatusName }}</ru-label>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="客户意向">内容内容内容
              <br>大小根据内容自适应
              <br>大小根据内容自适应
              <br>大小根据内容自适应换行内容
            </ru-label>
          </el-col>
        </el-row>-->
      </box>
      <box title="沟通记录">
        <el-row>
          <el-col :span="24">
            <el-table :data="data.ptIntentionLogs" border style="width: 100%">
              <el-table-column type="index" align="center" label="序号" width="50"/>
              <el-table-column prop="createTime" align="center" label="联系日期" width="180"/>
              <el-table-column prop="contactTypeName" align="center" label="沟通类型" width="180"/>
              <el-table-column prop="contactContent" align="center" label="内容"/>
              <el-table-column prop="contactTypeName" align="center" label="创建时间/创建人" width="180"/>
              <el-table-column prop="createTime" align="center" label="修改时间/修改人" width="180"/>
            </el-table>
          </el-col>
        </el-row>
      </box>
    </template>
  </div>
</template>

<script>
import Box from '@/components/Crud/Box'
import Label from '@/components/Crud/Label'
import { fetchDetail } from '@/api/customer'
import detailMixinsFactory from '@/mixins/detail'

export default {
  name: 'CustomerDetail',
  components: {
    Box,
    RuLabel: Label
  },
  mixins: [detailMixinsFactory(fetchDetail)],
  data() {
    return {}
  }
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
