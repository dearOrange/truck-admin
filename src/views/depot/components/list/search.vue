<template>
  <div class="search">
    <el-form :inline="true" :model="params" label-position="left" class="search-form">
      <el-form-item label="ID">
        <el-input v-model="params.stockPublishUkid"/>
      </el-form-item>
      <el-form-item label="仓库">
        <el-input v-model="params.stockName"/>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker
          v-model="params.publishDateMin"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期时间"
        />
        <el-date-picker
          v-model="params.publishDateMax"
          value-format="yyyy-MM-dd"
          type="date"
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
        <el-form-item label="起租面积">
          <div class="depot--interval">
            <el-input v-model="params.minRentAreaMin"/>
            <span>-</span>
            <el-input v-model="params.minRentAreaMax"/>
          </div>
        </el-form-item>
        <el-form-item label="起租期">
          <div class="depot--interval">
            <el-input v-model="params.minRentMonthsMin"/>
            <span>-</span>
            <el-input v-model="params.minRentMonthsMax"/>
          </div>
        </el-form-item>
        <el-form-item label="精选推荐">
          <el-select v-model="params.recommend">
            <el-option label="不是" value="0"/>
            <el-option label="是" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="服务模式">
          <el-select v-model="params.serviceMode">
            <el-option
              v-for="item in modeArr"
              :key="item.definedCode"
              :label="item.definedName"
              :value="item.definedCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="params.createBegin"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期时间"
          />
          <el-date-picker
            v-model="params.createEnd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="审核时间">
          <el-date-picker
            v-model="params.createBegin"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期时间"
          />
          <el-date-picker
            v-model="params.createEnd"
            value-format="yyyy-MM-dd"
            type="date"
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
  name: 'DepotListSearch',
  mixins: [ListMixins.Search],
  data() {
    return {
      more: false, // 更多选项
      districts: regionDataPlus, // 第三方数据
      publishStatusArr: [],
      modeArr: [],
      serviceArr: [],
      params: {
        stockPublishUkid: '',
        stockName: '',
        publishStatus: '',
        publishDateMin: '',
        publishDateMax: '',
        minRentAreaMin: '',
        minRentAreaMax: '',
        minRentMonthsMin: '',
        minRentMonthsMax: '',
        contactName: '',
        contactMobile: '',
        serviceMode: '',
        recommend: '',
        createBegin: '',
        createEnd: ''
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
      let { success: success1, data: modeData } = await getDicts('ServiceMode')
      if (success1) {
        this.modeArr = modeData
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
<style lang="scss" scoped>
.depot--interval {
  display: flex;
  & > span {
    margin: 0 10px;
  }
}
</style>
