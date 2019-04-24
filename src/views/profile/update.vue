<template>
  <div class="ru-container">
    <h1>修改用户</h1>
    <template v-if="isLoading">加载中</template>
    <template v-else-if="isError">请求失败</template>
    <template v-else>
      <el-form :model="data">
        <box>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="用户ID">{{ data.userId }}</ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="用户名">{{ data.userAccount }}</ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="头像">{{ data.id }}</ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="姓名">
                <el-form-item prop="userName">
                  <el-input v-model="data.userName"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="性别">
                <el-form-item prop="sex">
                  <el-radio-group v-model="data.sex">
                    <el-radio :label="M">先生</el-radio>
                    <el-radio :label="F">女士</el-radio>
                  </el-radio-group>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="业务单位">
                <el-form-item prop="bizUnitId">
                  <el-select v-model="data.bizUnitId">
                    <el-option
                      v-for="item in bizArr"
                      :key="item.definedCode"
                      :label="item.definedName"
                      :value="item.definedCode"
                    />
                  </el-select>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="手机">
                <el-form-item prop="mobileNumber">
                  <el-input v-model="data.mobileNumber"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="微信">
                <el-form-item prop="wechat">
                  <el-input v-model="data.wechat"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="邮箱">
                <el-form-item prop="email">
                  <el-input v-model="data.email"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="QQ">
                <el-form-item prop="qq">
                  <el-input v-model="data.qq"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="状态">
                <el-form-item prop="status">
                  <el-radio-group v-model="data.status">
                    <el-radio
                      v-for="item in statusArr"
                      :key="item.definedCode"
                      :label="item.definedCode"
                    >{{ item.definedName }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
        </box>
        <whitespace size="30"/>
        <div class="buttons">
          <el-button type="success" @click="save">确认</el-button>
          <el-button type="info">取消</el-button>
        </div>
      </el-form>
    </template>
  </div>
</template>

<script>
import Whitespace from '@/components/Whitespace'

import Box from '@/components/Crud/Box'
import Label from '@/components/Crud/Label'
import TemperatureRange from './components/update/TemperatureRange'
import Address from './components/update/Address'
import ExpectedPrice from './components/update/ExpectedPrice'
import { fetchDetail, updateList } from '@/api/profile'
import detailMixinsFactory from '@/mixins/detail'
import { getDicts } from '@/api/common/dictionary'

export default {
  name: 'ProfileUpdate',
  components: {
    Whitespace,
    Box,
    RuLabel: Label,
    RuAddress: Address,
    ExpectedPrice,
    TemperatureRange
  },
  mixins: [detailMixinsFactory(fetchDetail)],
  data() {
    return {
      bizArr: [],
      statusArr: []
    }
  },
  mounted() {
    this.getDictList()
  },
  methods: {
    async getDictList() {
      let { success: success1, data: stockData } = await getDicts('BizUnitId')
      if (success1) {
        this.bizArr = stockData
      }
      let { success: success2, data: statusData } = await getDicts('Status')
      if (success2) {
        this.statusArr = statusData
      }
    },
    async save() {
      let { success } = await updateList(this.data)
      if (success) {
        console.log(this.data)
      }
    }
  },
  beforeSubmit() {
    // 提交前, 需要将数据标准化
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

.buttons {
  display: flex;
  justify-content: center;
}
</style>
