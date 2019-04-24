import { isError } from 'lodash'
import { LOAD } from '@/constant/status'
import Loading from '@/model/loading'

export default function detailFetch(fetchApi) {
  return {
    props: {
      id: [String, Number]
    },
    data() {
      return {
        status: LOAD.NOT,
        data: {
          // supportVal: [],
          // typeVal: [],
          // suitcateVal: [],
          // stockVal: [],
          // modeVal: [],
          // systemVal: []
        }
      }
    },
    computed: {
      isError() {
        return this.data && isError(this.data)
      },
      isLoading() {
        return this.data instanceof Loading
      }
    },
    methods: {
      fetch(id) {
        return fetchApi(id)
      },
      async next() {
        this.status = LOAD.ING
        this.data = new Loading('读取中')
        let { success, data, msg: message } = await this.fetch(this.id)
        if (success) {
          data.supportVal = data.supportFacility
            ? data.supportFacility.split(',')
            : []
          data.typeVal = data.supportService
            ? data.supportService.split(',')
            : []
          data.suitcateVal = data.suitableCategory
            ? data.suitableCategory.split(',')
            : []
          data.stockVal = data.stockQualification
            ? data.stockQualification.split(',')
            : []
          data.modeVal = data.serviceMode ? data.serviceMode.split(',') : []
          data.systemVal = data.existingSystem
            ? data.existingSystem.split(',')
            : []
          data.splitable =
            data.splitable === 1 || data.splitable === 0
              ? data.splitable.toString()
              : ''
          data.tempter =
            data.temperatureLower || data.temperatureUpper
              ? [data.temperatureLower, data.temperatureUpper]
              : []
          data.area =
            data.provinceCode || data.cityCode || data.districtCode
              ? [data.provinceCode, data.cityCode, data.districtCode]
              : []
          data.imgUrl = data.photoUrls ? data.photoUrls.split(',') : []
          let Photo = data.scenePhoto ? data.scenePhoto.split(',') : []

          data.imgUrl = data.imgUrl.map((ele, index) => {
            return {
              url: ele,
              uid: Photo[index]
            }
          })
          this.data = data
        } else {
          this.data = new Error(message)
        }
        this.status = LOAD.DONE
      }
    },

    watch: {
      id(newId, oldId) {
        if (newId !== oldId) {
          this.next()
        }
      }
    },
    created() {
      this.next()
    }
  }
}
