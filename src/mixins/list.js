import { isArray, isError } from 'lodash'
import Loading from '@/model/loading'
import { LOAD } from '@/constant/status'
import { listState } from '@/utils/code'

const ResultMixins = {
  props: {
    list: {
      required: true,
      type: [Array, Error, Object]
    }
  },

  computed: {
    isLoading() {
      return this.list instanceof Loading
    },
    isError() {
      return this.list instanceof Error
    },
    resultList() {
      return isArray(this.list) ? this.list : []
    }
  }
}

const SearchMixins = {
  data() {
    return {
      params: {}
    }
  },
  methods: {
    doSearch() {
      this.$emit('change', this.params)
    }
  }
}

const FetchMixins = function(fetchApi) {
  return {
    data() {
      return {
        page: { pageNum: 1, pageSize: 10, pageTotal: 0 },
        params: {},
        loading: LOAD.NOT,
        list: []
      }
    },
    computed: {
      isEmpty() {
        return (this.list || []).length === 0
      },
      isError() {
        return isError(this.list)
      }
    },
    methods: {
      onSearchChange(searchParams = {}) {
        console.log(`查询条件:`)
        console.log(searchParams)
        this.next({ ...this.params, ...searchParams })
      },
      onPageChange(pageNum) {
        this.page.pageNum = pageNum
        this.next({ ...this.params })
      },
      fetch(params) {
        return fetchApi({ ...params, ...this.page })
      },
      render(response) {
        response.then(
          ({ success, data, page: { total } = { total: 0 }, msg: message }) => {
            if (success) {
              data = data.map(item => {
                item.intentionStatus = listState(item.intentionStatus)
                return item
              })
              this.list = data
              this.page.pageTotal = total
            } else {
              this.list = new Error(message)
            }
            this.loading = LOAD.DONE
          }
        )
      },
      next(params) {
        this.loading = LOAD.ING
        this.list = new Loading()
        this.render(this.fetch(params))
      },
      refresh() {
        this.next(this.params)
      }
    },
    created() {
      if (this.pageSize) {
        this.page.pageSize = this.pageSize
      }
    },
    mounted() {
      this.next()
    }
  }
}

export default {
  Result: ResultMixins,
  Search: SearchMixins,
  Fetch: FetchMixins
}
