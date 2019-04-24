<template>
  <div class="result">
    <batch-buttons>
      <el-button type="primary" @click="compulteAll">批量完成</el-button>
      <el-button type="primary" @click="closeAll">批量关闭</el-button>
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
      <el-table-column align="center" type="selection" width="55" fixed/>
      <el-table-column align="center" label="意向ID" width="150" fixed>
        <template slot-scope="scope">
          <span>
            <router-link
              :to="{name: 'CustomerDetail', params: {id: scope.row.intentionUkid}}"
            >{{ scope.row.intentionUkid }}</router-link>
          </span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.relatedDataType === "SL" ? '出租' : '求租' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="关联发布标题">
        <template slot-scope="scope">
          <span>{{ scope.row.intentionUkid }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.intentionStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="客户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.intentionUkid }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
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
          <span>{{ scope.row.serviceUserId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button type="primary">查看记录</el-button> -->
          <el-button type="primary" @click="update(scope.row.intentionUkid)">修改记录</el-button>
          <el-button type="success" @click="compulteSingle(scope.row.intentionUkid)">完成</el-button>
          <el-button type="warning" @click="closeSingle(scope.row.intentionUkid)">关闭</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BatchButtons from '@/components/BatchButtons'
import Whitespace from '@/components/Whitespace'
import ListMixins from '@/mixins/list'
import Dialog from '@/components/Dialog'
import {
  closeItem,
  closeList,
  compulteItem,
  compulteList
} from '@/api/customer'

export default {
  name: 'CustomerListResult',
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
        name: 'CustomerUpdate',
        params: {
          id
        }
      })
    },
    handleSelectionChange(val) {
      let ids = val.map(item => {
        return item.intentionUkid
      })
      this.selectionItems = ids.join(',')
    },
    compulteSingle(id) {
      Dialog.confirm('确认完成?', {
        confirm: {
          ok: async () => {
            let { success } = await compulteItem(id)
            if (success) {
              this.$emit('close')
            }
          }
        }
      })
    },
    compulteAll() {
      if (!this.selectionItems) {
        alert('请选择需要操作的项！')
      } else {
        Dialog.confirm('确认完成?', {
          confirm: {
            ok: async () => {
              let { success } = await compulteList(this.selectionItems)
              if (success) {
                this.$emit('close')
              }
            }
          }
        })
      }
    },
    closeSingle(id) {
      Dialog.confirm('确认关闭?', {
        confirm: {
          ok: async () => {
            let { success } = await closeItem(id)
            if (success) {
              this.$emit('close')
            }
          }
        }
      })
    },
    closeAll() {
      if (!this.selectionItems) {
        alert('请选择需要操作的项！')
      } else {
        Dialog.confirm('确认关闭?', {
          confirm: {
            ok: async () => {
              let { success } = await closeList(this.selectionItems)
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
