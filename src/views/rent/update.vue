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
              <ru-label :label-width="'7em'" label="业务人员">
                <el-form-item prop="serviceUserId">
                  <el-select v-model="data.serviceUserId">
                    <el-option
                      v-for="item in serviceArr"
                      :key="item.definedCode"
                      :label="item.definedName"
                      :value="item.definedCode"
                    />
                  </el-select>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="所属业务单位">
                <el-form-item prop="f">
                  <el-select v-model="updateData.f">
                    <el-option label="1号冷链1" value="1"/>
                    <el-option label="1号冷链2" value="2"/>
                  </el-select>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
        </box>
        <box title="基本资料">
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="发布标题">
                <el-form-item prop="demandTitle">
                  <el-input v-model="data.demandTitle"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="需求类型">
                <el-form-item prop="stockType">
                  <el-select v-model="data.stockType">
                    <el-option
                      v-for="item in stockTypeArr"
                      :key="item.definedCode"
                      :label="item.definedName"
                      :value="item.definedCode"
                    />
                  </el-select>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="需求面积">
                <el-form-item prop="demandArea">
                  <el-input v-model="data.demandArea">
                    <template slot="append">㎡</template>
                  </el-input>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="需求温度">
                <el-form-item prop="tempter">
                  <temperature-range v-model="data.tempter"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="要求层高">
                <el-form-item prop="floorHeight">
                  <el-input v-model="data.floorHeight">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="16">
              <ru-label :label-width="'7em'" label="需求地址">
                <el-form-item prop="area">
                  <ru-address v-model="data.area"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="联系人">
                <el-form-item prop="contactName">
                  <el-input v-model="data.contactName"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="性别">
                <el-form-item prop="gender">
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
              <ru-label :label-width="'7em'" label="手机">
                <el-form-item prop="contactMobile">
                  <el-input v-model="data.contactMobile"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="联系电话">
                <el-form-item prop="contactTel">
                  <el-input v-model="data.contactTel"/>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="计划租期">
                <el-form-item prop="planRentPeriod">
                  <el-input v-model="data.planRentPeriod">
                    <template slot="append">月</template>
                  </el-input>
                </el-form-item>
              </ru-label>
            </el-col>
            <el-col :span="8">
              <ru-label :label-width="'7em'" label="计划入驻">
                <el-form-item prop="planEnterDate">
                  <el-date-picker v-model="data.planEnterDate" type="date" placeholder="选择日期"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="期望价格">
                <el-form-item prop="d">
                  <expected-price v-model="updateData.d"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
        </box>
        <box title="其它信息">
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="商品类型">
                <el-form-item prop="productCategoryName">
                  <el-input v-model="data.productCategoryName"/>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="配套设施">
                <el-form-item prop="supportVal">
                  <el-checkbox-group v-model="data.supportVal" @change="changeCheck">
                    <el-checkbox
                      v-for="item in facilityArr"
                      :key="item.definedCode"
                      :label="item.definedCode"
                    >{{ item.definedName }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="配套服务">
                <el-form-item prop="typeVal">
                  <el-checkbox-group v-model="data.typeVal" @change="changeType">
                    <el-checkbox
                      v-for="item in supServiceArr"
                      :key="item.definedCode"
                      :label="item.definedCode"
                    >{{ item.definedName }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="服务模式">
                <el-form-item prop="modeVal">
                  <el-checkbox-group v-model="data.modeVal" @change="changeMode">
                    <el-checkbox
                      v-for="item in modeArr"
                      :key="item.definedCode"
                      :label="item.definedCode"
                    >{{ item.definedName }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="其它说明">
                <el-form-item prop="otherDesc">
                  <el-input
                    :autosize="{ minRows: 3, maxRows: 6}"
                    v-model="data.otherDesc"
                    placeholder="请输入内容"
                    type="textarea"
                  />
                </el-form-item>
              </ru-label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ru-label :label-width="'7em'" label="货品图片">
                <div class="images">
                  <el-upload
                    :action="uploadAction"
                    :file-list="data.imgUrl"
                    :on-success="handlePictureCardPreview"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-error="handleError"
                    :before-upload="beforeAvatarUpload"
                    :limit="5"
                    list-type="picture-card"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img :src="dialogImageUrl" width="100%" alt="图片">
                  </el-dialog>
                </div>
              </ru-label>
            </el-col>
          </el-row>
        </box>
        <whitespace size="30"/>
        <div class="buttons">
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button type="success">保存并审核</el-button>
          <el-button type="warning" @click="back(data.stockDemandUkid)">退回</el-button>
          <el-button>取消</el-button>
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
import config from '@/config'
import { fetchRent, saveRent } from '@/api/rent'
import { getDicts } from '@/api/common/dictionary'
import detailMixinsFactory from '@/mixins/detail'
import Dialog from '@/components/Dialog'
import Reason from './components/list/reason'

export default {
  name: 'RentDetail',
  components: {
    Whitespace,
    Box,
    RuLabel: Label,
    RuAddress: Address,
    ExpectedPrice,
    TemperatureRange
  },
  mixins: [detailMixinsFactory(fetchRent)],
  data() {
    return {
      serviceArr: [],
      stockTypeArr: [],
      facilityArr: [],
      supServiceArr: [],
      modeArr: [],
      genderArr: [],
      updateData: {
        f: '',
        d: []
      },
      uploadAction: `${config.server}/example/upload.do`,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  mounted() {
    this.getDictList()
  },
  methods: {
    async save() {
      this.data.temperatureLower = this.data.tempter[0]
      this.data.temperatureUpper = this.data.tempter[1]
      console.log(this.data)
      let { success } = await saveRent(this.data)
      if (success) {
        console.log(this.data)
      }
    },
    back(id) {
      Dialog.open(Reason, {
        props: {
          id
        }
      })
    },
    handleRemove(file, fileList) {
      let photoArr = fileList.map(ele => {
        return ele.response ? ele.response.data.ukid : ele.uid
      })
      this.data.scenePhoto = photoArr.join(',')
    },
    handlePictureCardPreview(response, file, fileList) {
      let photoArr = fileList.map(ele => {
        return ele.response ? ele.response.data.ukid : ele.uid
      })
      this.data.scenePhoto = photoArr.join(',')
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleError({ code, message }) {
      if (code === '0') {
        // Dialog.success('上传成功')
      } else {
        // Dialog.success(message)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (isJPG || isPNG) {
        return
      } else {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      return isJPG || isPNG
    },
    changeCheck(val) {
      this.data.supportFacility = val.join(',')
    },
    changeType(val) {
      this.data.supportService = val.join(',')
    },
    changeMode(val) {
      this.data.serviceMode = val.join(',')
    },
    async getDictList() {
      let { success: success1, data: stockData } = await getDicts('StockType')
      if (success1) {
        this.stockTypeArr = stockData
      }
      let { success: success2, data: facilityData } = await getDicts(
        'SupportFacility'
      )
      if (success2) {
        this.facilityArr = facilityData
      }
      let { success: success3, data: serviceData } = await getDicts(
        'ServiceUserId'
      )
      if (success3) {
        this.serviceArr = serviceData
      }
      let { success: success4, data: supportData } = await getDicts(
        'SupportService'
      )
      if (success4) {
        this.supServiceArr = supportData
      }
      let { success: success5, data: modeData } = await getDicts('ServiceMode')
      if (success5) {
        this.modeArr = modeData
      }
      let { success: success6, data: genderData } = await getDicts('Gender')
      if (success6) {
        this.genderArr = genderData
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
