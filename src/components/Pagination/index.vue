<template>
  <div v-if="!isEmpty" class="pagination">
    <el-pagination
      :current-page.sync="page.pageNum"
      :page-size="page.pageSize"
      :total="page.pageTotal"
      background
      layout="pager, jumper"
      @current-change="onPageChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    page: {
      type: Object,
      default() {
        return {
          pageNum: 0,
          pageSize: 0,
          pageTotal: 0
        }
      },
      required: true
    }
  },

  computed: {
    isEmpty() {
      return this.page.pageTotal === 0
    }
  },

  methods: {
    onPageChange(pageNum) {
      window.scrollTo(0, 0)
      this.$emit('change', pageNum)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: right;
}
</style>

