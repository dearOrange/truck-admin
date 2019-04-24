<template>
  <div class="result">
    <batch-buttons>
      <el-button type="primary" @click="checkAll">批量审核</el-button>
      <el-button type="success" @click="setSelect">设为精选</el-button>
      <el-button type="danger" @click="cancelSelect">取消精选</el-button>
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
      <el-table-column align="center" fixed type="selection" width="55"/>
      <el-table-column align="center" fixed label="出租ID" width="150">
        <template slot-scope="scope">
          <span>
            <router-link
              :to="{name: 'DepotDetail', params: {id: scope.row.ptStockPublish.stockPublishUkid}}"
            >{{ scope.row.ptStockPublish.stockPublishUkid }}</router-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="300px" label="发布标题">
        <template slot-scope="scope">
          <span>{{ scope.row.ptStockPublish.publishTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.ptStockPublish.publishStatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="发布日期">
        <template slot-scope="scope">
          <span>{{ scope.row.ptStockPublish.publishDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.ptStockPublish.contactName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.ptStockPublish.genderName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="联系手机">
        <template slot-scope="scope">
          <span>{{ scope.row.ptStockPublish.contactMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.ptStockPublish.contactTel }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="业务人员">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="精选推荐">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="浏览次数">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="关注人数">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="看库人数">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{ scope.row.modifyUserId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="审核时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="审核人">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="update(scope.row.ptStockPublish.stockPublishUkid)"
          >修改</el-button>
          <el-button
            type="success"
            size="small"
            @click="review(scope.row.ptStockPublish.stockPublishUkid)"
          >审核</el-button>
          <el-button
            type="warning"
            size="small"
            @click="retreat(scope.row.ptStockPublish.stockPublishUkid)"
          >退回</el-button>
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
import { checkItem, checkList, setList, cancelList } from '@/api/depot'

import ListMixins from '@/mixins/list'

export default {
  name: 'DepotListResult',
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
  updated() {
    console.log(this.list)
  },
  methods: {
    update(id) {
      this.$router.push({
        name: 'DepotUpdate',
        params: {
          id
        }
      })
    },
    review(id) {
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
    async retreat(id) {
      Dialog.open(Reason, {
        props: {
          id
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
    },
    setSelect() {
      if (!this.selectionItems) {
        alert('请选择需要操作的项！')
      } else {
        Dialog.confirm('确认设置为精选推荐?', {
          confirm: {
            ok: async () => {
              let { success } = await setList(this.selectionItems)
              if (success) {
                this.$emit('close')
              }
            }
          }
        })
      }
    },
    cancelSelect() {
      if (!this.selectionItems) {
        alert('请选择需要操作的项！')
      } else {
        Dialog.confirm('取消精选推荐?', {
          confirm: {
            ok: async () => {
              let { success } = await cancelList(this.selectionItems)
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
