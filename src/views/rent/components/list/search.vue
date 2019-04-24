<template>
  <div class="search">
    <el-form :inline="true" :model="params" label-position="left" class="search-form">
      <el-form-item label="ID">
        <el-input v-model="params.stockDemandUkid"/>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker
          v-model="params.publishDateBegin"
          value-format="yyyy-MM-dd"
          type="datetime"
          placeholder="选择日期时间"
        />
        <el-date-picker
          v-model="params.publishDateEnd"
          value-format="yyyy-MM-dd"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="计划入驻日期">
        <el-date-picker
          v-model="params.planEnterDateBegin"
          value-format="yyyy-MM-dd"
          type="datetime"
          placeholder="选择日期时间"
        />
        <el-date-picker
          v-model="params.planEnterDateEnd"
          value-format="yyyy-MM-dd"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="params.publishStatus">
          <el-option
            v-for="item in publishStatusArr"
            :key="item.definedCode"
            :label="item.definedName"
            :value="item.definedCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务人员">
        <el-select v-model="params.serviceUserId">
          <el-option
            v-for="item in serviceArr"
            :key="item.definedCode"
            :label="item.definedName"
            :value="item.definedCode"
          />
        </el-select>
      </el-form-item>
      <template v-if="more">
        <el-form-item label="联系人">
          <el-input v-model="params.contactName"/>
        </el-form-item>
        <el-form-item label="联系手机">
          <el-input v-model="params.contactMobile"/>
        </el-form-item>
        <el-form-item label="需求类型">
          <el-select v-model="params.stockType">
            <el-option
              v-for="item in stockTypeArr"
              :key="item.definedCode"
              :label="item.definedName"
              :value="item.definedCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="需求面积">
          <el-input v-model="params.demandArea"/>
        </el-form-item>
        <el-form-item label="计划租期">
          <el-input v-model="params.j"/>
        </el-form-item>
        <el-form-item label="业务单位">
          <el-select v-model="params.k">
            <el-option label="业务单位1" value="1"/>
            <el-option label="业务单位2" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="省市区">
          <el-cascader v-model="params.xzy" :options="districts" @change="onDistrictsChange"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="params.createBegin"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
          />
          <el-date-picker
            v-model="params.createEnd"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="审核时间">
          <el-date-picker
            v-model="params.createBegin"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
          />
          <el-date-picker
            v-model="params.createEnd"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="doSearch">查询</el-button>
        <el-button type="primary" @click="toggle">{{ toggleText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ListMixins from '@/mixins/list'
import { regionDataPlus } from 'element-china-area-data'
import { getDicts } from '@/api/common/dictionary'

export default {
  name: 'RentListSearch',
  mixins: [ListMixins.Search],
  data() {
    return {
      more: false, // 更多选项
      districts: regionDataPlus, // 第三方数据
      serviceArr: [],
      stockTypeArr: [],
      publishStatusArr: [],
      params: {
        stockDemandUkid: '',
        publishStatus: '',
        publishDateBegin: '',
        publishDateEnd: '',
        planEnterDateBegin: '',
        planEnterDateEnd: '',
        contactName: '',
        contactMobile: '',
        stockType: '',
        demandArea: ''
      }
    }
  },

  computed: {
    toggleText() {
      return this.more ? '合并' : '展开'
    }
  },
  mounted() {
    this.getDictList()
  },
  methods: {
    onDistrictsChange(result) {
      console.log('省市区:')
      console.log(result) // TODO 格式化
    },
    toggle() {
      this.more = !this.more
    },
    async getDictList() {
      let { success: success1, data: stockData } = await getDicts('StockType')
      if (success1) {
        this.stockTypeArr = stockData
      }
      let { success: success2, data: statusData } = await getDicts(
        'PublishStatus'
      )
      if (success2) {
        this.publishStatusArr = statusData
      }
      let { success: success3, data: serviceData } = await getDicts(
        'ServiceUserId'
      )
      if (success3) {
        this.serviceArr = serviceData
      }
    }
  }
}
</script>
