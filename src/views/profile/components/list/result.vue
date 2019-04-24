<template>
  <div class="result">
    <batch-buttons>
      <el-button type="primary" @click="disableAll">批量停用</el-button>
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
      <el-table-column align="center" label="用户ID" width="65" fixed>
        <template slot-scope="scope">
          <span>
            <router-link
              :to="{name: 'ProfileDetail', params: {id: scope.row.userId}}"
            >{{ scope.row.userId }}</router-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 'F' ? '女士' : scope.row.sex === 'M' ? '男士' : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="手机">
        <template slot-scope="scope">
          <span>{{ scope.row.mobileNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="QQ">
        <template slot-scope="scope">
          <span>{{ scope.row.qq }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="微信">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="所属业务单位">
        <template slot-scope="scope">
          <span>{{ scope.row.bizUnitId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="实名认证">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameCertified === 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="认证类型">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameType }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.registrationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? '启用' : '停用' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="最后登录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button type="primary">查看记录</el-button> -->
          <el-button type="primary" @click="update(scope.row.userId)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BatchButtons from '@/components/BatchButtons'
import Whitespace from '@/components/Whitespace'
import { disableList } from '@/api/profile'
import Dialog from '@/components/Dialog'
import ListMixins from '@/mixins/list'

export default {
  name: 'ProfileListResult',
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
        name: 'ProfileUpdate',
        params: {
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
    disableAll() {
      if (!this.selectionItems) {
        alert('请选择需要操作的项！')
      } else {
        Dialog.confirm('确认停用?', {
          confirm: {
            ok: async () => {
              let { success } = await disableList(this.selectionItems)
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
