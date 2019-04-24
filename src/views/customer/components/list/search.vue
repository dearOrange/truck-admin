<template>
  <div class="search">
    <el-form :inline="true" :model="params" label-position="left" class="search-form">
      <el-form-item label="意向ID">
        <el-input v-model="params.intentionUkid"/>
      </el-form-item>
      <el-form-item label="关联发布ID">
        <el-input v-model="params.relatedDataUkid"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="params.relatedDataType">
          <el-option
            v-for="item in relatedArr"
            :key="item.definedCode"
            :label="item.definedName"
            :value="item.definedCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="params.intentionStatus">
          <el-option
            v-for="item in statusArr"
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
        <el-form-item label="创建时间">
          <el-date-picker v-model="params.createBegin" type="datetime" placeholder="选择日期时间"/>
          <el-date-picker v-model="params.createEnd" type="datetime" placeholder="选择日期时间"/>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-date-picker v-model="params.modifyBegin" type="datetime" placeholder="选择日期时间"/>
          <el-date-picker v-model="params.modifyEnd" type="datetime" placeholder="选择日期时间"/>
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
  name: 'CustomerListSearch',
  mixins: [ListMixins.Search],
  data() {
    return {
      more: false, // 更多选项
      districts: regionDataPlus, // 第三方数据
      relatedArr: [],
      statusArr: [],
      serviceArr: [],
      params: {
        intentionUkid: '',
        relatedDataUkid: '',
        relatedDataType: '',
        intentionStatus: '',
        serviceUserId: '',
        contactName: '',
        contactMobile: '',
        createBegin: '',
        createEnd: '',
        modifyBegin: '',
        modifyEnd: ''
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
    // onDistrictsChange(result) {
    //   console.log('省市区:')
    //   console.log(result) // TODO 格式化
    // },
    toggle() {
      this.more = !this.more
    },
    async getDictList() {
      let { success: success1, data: relateData } = await getDicts(
        'RelatedDataType'
      )
      if (success1) {
        this.relatedArr = relateData
      }
      let { success: success2, data: statusData } = await getDicts(
        'IntentionStatus'
      )
      if (success2) {
        this.statusArr = statusData
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
