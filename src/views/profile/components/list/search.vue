<template>
  <div class="search">
    <el-form :inline="true" :model="params" label-position="left" class="search-form">
      <el-form-item label="用户名">
        <el-input v-model="params.userAccount"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="params.userName"/>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="params.mobileNumber"/>
      </el-form-item>
      <el-form-item label="业务单位">
        <el-select v-model="params.bizUnitId">
          <el-option
            v-for="item in bizArr"
            :key="item.definedCode"
            :label="item.definedName"
            :value="item.definedCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="params.status">
          <el-option
            v-for="item in statusArr"
            :key="item.definedCode"
            :label="item.definedName"
            :value="item.definedCode"
          />
        </el-select>
      </el-form-item>
      <template v-if="more">
        <el-form-item label="微信">
          <el-input v-model="params.wechat"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="params.email"/>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="params.qq"/>
        </el-form-item>
        <el-form-item label="实名认证">
          <el-select v-model="params.realNameCertified">
            <el-option label="是" value="1"/>
            <el-option label="否" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="认证类型">
          <el-select v-model="params.realNameType">
            <el-option
              v-for="item in realArr"
              :key="item.definedCode"
              :label="item.definedName"
              :value="item.definedCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="params.registrationBegin"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
          />
          <el-date-picker
            v-model="params.registrationEnd"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="最后登录时间">
          <el-date-picker
            v-model="params.lastLoginBegin"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
          />
          <el-date-picker
            v-model="params.lastLoginEnd"
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
  name: 'ProfileListSearch',
  mixins: [ListMixins.Search],
  data() {
    return {
      more: false, // 更多选项
      districts: regionDataPlus, // 第三方数据
      bizArr: [],
      statusArr: [],
      realArr: [],
      params: {
        userAccount: '',
        userName: '',
        mobileNumber: '',
        email: '',
        wechat: '',
        qq: '',
        status: '',
        bizUnitId: '',
        realNameCertified: '',
        realNameType: '',
        lastLoginBegin: '',
        lastLoginEnd: '',
        registrationBegin: '',
        registrationEnd: ''
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
      let { success: success1, data: stockData } = await getDicts('BizUnitId')
      if (success1) {
        this.bizArr = stockData
      }
      let { success: success2, data: statusData } = await getDicts('Status')
      if (success2) {
        this.statusArr = statusData
      }
      let { success: success3, data: serviceData } = await getDicts(
        'RealNameType'
      )
      if (success3) {
        this.realArr = serviceData
      }
    }
  }
}
</script>
