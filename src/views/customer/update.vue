<template>
  <div class="ru-container">
    <h1>修改求租</h1>
    <template v-if="isLoading">加载中</template>
    <template v-else-if="isError">请求失败</template>
    <template v-else>
      <el-form :model="data">
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
              <ru-label :label-width="'7em'" label="联系人">
                <el-form-item prop="a">
                  <el-input v-model="data.contactName"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="联系手机">
                <el-form-item prop="a">
                  <el-input v-model="data.contactMobile"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="联系电话">
                <el-form-item prop="a">
                  <el-input v-model="data.contactTel"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="性别">
                <el-form-item prop="i">
                  <el-radio-group v-model="data.gender">
                    <el-radio
                      v-for="item in genderArr"
                      :key="item.definedCode"
                      :label="item.definedCode"
                    >{{ item.definedName }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="状态">
                <el-form-item prop="e">
                  <el-select v-model="data.intentionStatus">
                    <el-option
                      v-for="item in statusArr"
                      :key="item.definedCode"
                      :label="item.definedName"
                      :value="item.definedCode"
                    />
                  </el-select>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
        </box>
        <box title="沟通记录">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="ptIntentionLogs">
                <el-table :data="data.ptIntentionLogs" border style="width: 100%">
                  <el-table-column type="index" align="center" label="序号" width="50"/>
                  <el-table-column
                    :formatter="row => row.createTime"
                    prop="createTime"
                    align="center"
                    label="联系日期"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'ptIntentionLogs.'+ scope.$index + '.createTime'"
                        class="td--bot"
                      >
                        <!-- <el-input v-model.trim="scope.row.contactContent"></el-input> -->
                        <el-date-picker
                          v-model="scope.row.createTime"
                          type="datetime"
                          placeholder="选择日期时间"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :formatter="row => row.contactType"
                    prop="contactType"
                    align="center"
                    label="沟通类型"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'ptIntentionLogs.'+ scope.$index + '.contactType'"
                        class="td--bot"
                      >
                        <el-select v-model="scope.row.contactType" placeholder="请选择">
                          <el-option
                            v-for="item in relatedArr"
                            :key="item.definedCode"
                            :label="item.definedName"
                            :value="item.definedCode"
                          />
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :formatter="row => row.contactContent"
                    prop="contactContent"
                    align="center"
                    label="内容"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'ptIntentionLogs.'+ scope.$index + '.contactContent'"
                        class="td--bot"
                      >
                        <el-input
                          :autosize="{ minRows: 2, maxRows: 6 }"
                          v-model="scope.row.contactContent"
                          type="textarea"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :formatter="row => row.contactTypeName"
                    prop="contactTypeName"
                    align="center"
                    label="创建时间/创建人"
                  />
                  <el-table-column
                    :formatter="row => row.createTime"
                    prop="createTime"
                    align="center"
                    label="修改时间/修改人"
                  />
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </box>
        <whitespace size="30"/>
        <div class="buttons">
          <el-button type="success" @click="newAdd">新增</el-button>
          <el-button type="primary" @click="saveSubmit">保存</el-button>
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
import { fetchDetail, updateDepot } from '@/api/customer'
import { getDicts } from '@/api/common/dictionary'
import detailMixinsFactory from '@/mixins/detail'

export default {
  name: 'CustomerUpdate',
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
      relatedArr: [],
      statusArr: [],
      genderArr: []
    }
  },
  mounted() {
    this.getDictList()
  },
  methods: {
    async getDictList() {
      let { success: success1, data: statusData } = await getDicts(
        'IntentionStatus'
      )
      if (success1) {
        this.statusArr = statusData
      }
      let { success: success2, data: genderData } = await getDicts('Gender')
      if (success2) {
        this.genderArr = genderData
      }
      let { success: success3, data: relateData } = await getDicts(
        'ContactType'
      )
      if (success3) {
        this.relatedArr = relateData
      }
    },
    async saveSubmit() {
      let { success, data: dataNum } = await updateDepot(this.data)
      if (success) {
        this.$router.push({
          name: 'CustomerDetail',
          params: { id: dataNum }
        })
      }
    },
    newAdd() {}
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
