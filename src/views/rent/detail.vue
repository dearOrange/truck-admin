<template>
  <div class="ru-container">
    <h1>求租详情</h1>
    <template v-if="isLoading">加载中</template>
    <template v-else-if="isError">请求失败</template>
    <template v-else>
      <box>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="发布ID">{{ data.stockDemandUkid }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="状态">{{ data.publishStatusName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label
              :label-width="'7em'"
              label="发布日期"
            >{{ data.publishDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="业务人员">{{ data.serviceUserId }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="所属业务单位">值</ru-label>
          </el-col>
        </el-row>
      </box>
      <box title="基本资料">
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="发布标题">{{ data.demandTitle }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="需求类型">{{ data.stockTypeName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="需求面积">{{ data.demandArea }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label
              :label-width="'7em'"
              label="需求温度"
            >{{ data.temperatureLower }}~{{ data.temperatureUpper }}℃</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="要求层高">{{ data.floorHeight }}</ru-label>
          </el-col>
          <el-col :span="16">
            <ru-label :label-width="'7em'" label="需求地址">{{ data.province }}{{ data.city }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="联系人">{{ data.contactName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="性别">{{ data.genderName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="手机">{{ data.contactMobile }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="联系电话">{{ data.contactTel }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="计划租期">{{ data.planRentPeriodName }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label
              :label-width="'7em'"
              label="计划入驻"
            >{{ data.planEnterDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label
              :label-width="'7em'"
              label="期望价格"
            >{{ data.expectedPriceType === 'N' ? '面议' : data.expectedPriceTypeName }}</ru-label>
          </el-col>
        </el-row>
      </box>
      <box title="其它信息">
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="商品类型">{{ data.productCategoryName }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="配套设施">
              <el-tag v-if="data.supportFacility.includes('F001')">通水</el-tag>
              <el-tag v-if="data.supportFacility.includes('F002')">通电</el-tag>
              <el-tag v-if="data.supportFacility.includes('F003')">雨棚</el-tag>
              <el-tag v-if="data.supportFacility.includes('F004')">备用电源</el-tag>
              <el-tag v-if="data.supportFacility.includes('F005')">办公室</el-tag>
              <el-tag v-if="data.supportFacility.includes('F006')">安保人员</el-tag>
              <el-tag v-if="data.supportFacility.includes('F007')">封闭园区</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="配套服务">
              <el-tag v-if="data.supportService.includes('S001')">装卸服务</el-tag>
              <el-tag v-if="data.supportService.includes('S002')">叉车租用</el-tag>
              <el-tag v-if="data.supportService.includes('S003')">高位货架</el-tag>
              <el-tag v-if="data.supportService.includes('S004')">高位叉车</el-tag>
              <el-tag v-if="data.supportService.includes('S005')">24小时监控</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="服务服务">
              <el-tag v-if="data.serviceMode.includes('S')">自管</el-tag>
              <el-tag v-if="data.serviceMode.includes('T')">托管</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="其它说明">{{ data.otherDesc }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="货品图片">
              <div class="images">
                <img src>
                <img src>
                <img src>
              </div>
            </ru-label>
          </el-col>
        </el-row>
      </box>
    </template>
  </div>
</template>

<script>
import Box from '@/components/Crud/Box'
import Label from '@/components/Crud/Label'
import { fetchRent } from '@/api/rent'
import detailMixinsFactory from '@/mixins/detail'

export default {
  name: 'RentDetail',
  components: {
    Box,
    RuLabel: Label
  },
  mixins: [detailMixinsFactory(fetchRent)]
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
