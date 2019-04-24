<template>
  <div class="ru-container">
    <h1>出租详情</h1>
    <template v-if="isLoading">加载中</template>
    <template v-else-if="isError">请求失败</template>
    <template v-else>
      <box>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="发布ID">{{ data.stockPublishUkid }}</ru-label>
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
            <ru-label :label-width="'7em'" label="业务人员">{{ data.stockPublishUkid }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="精选推荐">{{ data.recommend == '0' ? '不是' : '是' }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label
              :label-width="'7em'"
              label="创建日期"
            >{{ data.publishDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</ru-label>
          </el-col>
        </el-row>
      </box>
      <box title="基本资料">
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="发布标题">{{ data.publishTitle }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="仓库名称">{{ data.stockName }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label
              :label-width="'7em'"
              label="具体地址"
            >{{ data.province }}{{ data.city }}{{ data.district }}{{ data.address }}</ru-label>
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
            <ru-label :label-width="'7em'" label="起租期">{{ data.minRentMonths }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="起租面积">{{ data.minRentArea }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="温层分级">
              <el-table :data="data.baStockDetailList" border style="width: 721px">
                <el-table-column prop="stockTypeNames" align="center" label="温层名称" width="180"/>
                <el-table-column prop="totalArea" align="center" label="温层面积（㎡）" width="180"/>
                <el-table-column prop="emptyArea" align="center" width="180" label="可租面积（㎡）"/>
                <el-table-column prop="emptyCapacity" align="center" width="180" label="可租容量（吨）"/>
              </el-table>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="总面积">{{ data.totalArea }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="总可租面积">{{ data.emptyArea }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="总可用容量">{{ data.totalCapacity }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label
              :label-width="'7em'"
              label="计价方式"
            >{{ data.expectedPriceType === 'N' ? '面议' : '' }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <ru-label
              :label-width="'7em'"
              label="温度区间"
            >{{ data.temperatureLower }} ~ {{ data.temperatureUpper }}℃</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="所属楼层">{{ data.locatedFloor }}</ru-label>
          </el-col>
          <el-col :span="8">
            <ru-label :label-width="'7em'" label="仓库层高">{{ data.floorHeight }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="适合品类">
              <el-tag v-if="data.suitableCategory.includes('C001')">果蔬类</el-tag>
              <el-tag v-if="data.suitableCategory.includes('C002')">畜禽肉类</el-tag>
              <el-tag v-if="data.suitableCategory.includes('C003')">水产类</el-tag>
              <el-tag v-if="data.suitableCategory.includes('C004')">干果类</el-tag>
              <el-tag v-if="data.suitableCategory.includes('C005')">粮副食品</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="消防等级">
              <el-tag>{{ data.fireGradeName }}</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="运营资质">
              <el-tag v-if="data.stockQualification.includes('E')">环评证</el-tag>
              <el-tag v-if="data.stockQualification.includes('F')">消防证</el-tag>
              <el-tag v-if="data.stockQualification.includes('L')">土地证</el-tag>
              <el-tag v-if="data.stockQualification.includes('P')">产权证</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="地坪类型">
              <el-tag>{{ data.groundTypeName }}</el-tag>
            </ru-label>
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
      <box title="设施及服务">
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="可分割">
              <el-tag>{{ data.splitable === 0 ? '否' : '是' }}</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="月台类型">
              <el-tag>{{ data.platformTypeName }}</el-tag>
            </ru-label>
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
            <ru-label :label-width="'7em'" label="服务模式">
              <el-tag v-if="data.serviceMode.includes('S')">自管</el-tag>
              <el-tag v-if="data.serviceMode.includes('T')">托管</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="软件系统">
              <el-tag v-if="data.existingSystem.includes('N')">无</el-tag>
              <el-tag v-if="data.existingSystem.includes('OMS')">订单管理系统(OMS)</el-tag>
              <el-tag v-if="data.existingSystem.includes('TMS')">运输管理系统(TMS)</el-tag>
              <el-tag v-if="data.existingSystem.includes('WMS')">仓库管理系统(WMS)</el-tag>
              <el-tag v-if="data.existingSystem.includes('X')">其它</el-tag>
            </ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="仓库优势">{{ data.advantage }}</ru-label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ru-label :label-width="'7em'" label="合作案例">{{ data.cooperationCase }}</ru-label>
          </el-col>
        </el-row>
      </box>
    </template>
  </div>
</template>

<script>
import Box from '@/components/Crud/Box'
import Label from '@/components/Crud/Label'
import { fetchDepot } from '@/api/depot'
import detailMixinsFactory from '@/mixins/detail'

export default {
  name: 'DepotDetail',
  components: {
    Box,
    RuLabel: Label
  },
  mixins: [detailMixinsFactory(fetchDepot)],
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
