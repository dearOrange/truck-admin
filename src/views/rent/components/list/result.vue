<template>
  <div class="result">
    <batch-buttons>
      <el-button type="primary" @click="checkAll">批量审核</el-button>
    </batch-buttons>
    <whitespace size="20"/>
    <el-table
      v-loading="isLoading"
      :data="resultList"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed/>
      <el-table-column align="center" label="ID" width="150" fixed>
        <template slot-scope="scope">
          <span>
            <router-link
              :to="{name: 'RentDetail', params: {id: scope.row.stockDemandUkid}}"
            >{{ scope.row.stockDemandUkid }}</router-link>
          </span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="发布标题">
        <template slot-scope="scope">
          <span>{{ scope.row.demandTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.publishStatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="发布日期">
        <template slot-scope="scope">
          <span>{{ scope.row.publishDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="计划入驻时间">
        <template slot-scope="scope">
          <span>{{ scope.row.planEnterDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="需求类型">
        <template slot-scope="scope">
          <span>{{ scope.row.productCategoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="需求面积">
        <template slot-scope="scope">
          <span>{{ scope.row.demandArea }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="温度下限">
        <template slot-scope="scope">
          <span>{{ scope.row.temperatureLower }}（℃）</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="温度上限">
        <template slot-scope="scope">
          <span>{{ scope.row.temperatureUpper }}（℃）</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="省市区">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.genderName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="联系手机">
        <template slot-scope="scope">
          <span>{{ scope.row.contactMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.contactTel }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="业务人员">
        <template slot-scope="scope">
          <span>业务人员{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>修改时间{{ scope.row.modifyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="修改人">
        <template slot-scope="scope">
          <span>修改人{{ scope.row.modifyUserId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="审核时间">
        <template slot-scope="scope">
          <span>审核时间{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="审核人">
        <template slot-scope="scope">
          <span>审核人{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.stockDemandUkid)">修改</el-button>
          <el-button type="success" @click="review(scope.row.stockDemandUkid)">审核</el-button>
          <el-button type="warning" @click="retreat(scope.row.stockDemandUkid)">退回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BatchButtons from '@/components/BatchButtons'
import Whitespace from '@/components/Whitespace'
import Dialog from '@/components/Dialog'
import Reason from './reason'
import { checkItem, checkList } from '@/api/rent'

import ListMixins from '@/mixins/list'

export default {
  name: 'RentListResult',
  components: {
    BatchButtons,
    Whitespace
  },
  mixins: [ListMixins.Result],
  data() {
    return {
      selectionItems: ''
    }
  },

  methods: {
    update(id) {
      this.$router.push({
        name: 'RentUpdate',
        params: {
          id
        }
      })
    },
    retreat(id) {
      // TODO
      Dialog.open(Reason, {
        props: {
          id
        }
      })
    },
    review(id) {
      // TODO
      Dialog.confirm('确认审核?', {
        confirm: {
          ok: async () => {
            let { success } = await checkItem(id)
            if (success) {
              this.$emit('close')
            }
          }
        }
      })
    },
    handleSelectionChange(val) {
      let ids = val.map(item => {
        return item.ptStockPublish.stockPublishUkid
      })
      this.selectionItems = ids.join(',')
    },
    checkAll() {
      if (!this.selectionItems) {
        alert('请选择需要操作的项！')
      } else {
        Dialog.confirm('确认审核?', {
          confirm: {
            ok: async () => {
              let { success } = await checkList(this.selectionItems)
              if (success) {
                this.$emit('close')
              }
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>
