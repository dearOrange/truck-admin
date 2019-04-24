<template>
  <div class="app-container">
    <search @change="onSearchChange"/>
    <Whitespace size="20"/>
    <result :list="list"/>
    <whitespace size="10"/>
    <pagination :page="page" @change="onPageChange"/>
  </div>
</template>

<script>
import Search from './components/list/search.vue'
import Result from './components/list/result.vue'
import Whitespace from '@/components/Whitespace'
import Pagination from '@/components/Pagination'
import { fetchList } from '@/api/profile'
import ListMixins from '@/mixins/list'

export default {
  name: 'ProfileList',
  components: {
    Whitespace,
    Pagination,
    Search,
    Result
  },
  mixins: [ListMixins.Fetch(fetchList)]
}
</script>
