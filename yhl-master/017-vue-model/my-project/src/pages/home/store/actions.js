//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作
import { GET_ADS, GET_FLOORS,GET_CATEGORIESARR } from './types.js'
import api from 'api'
export default {
    async [GET_ADS]({ commit }) {
        const result = await api.getHomeAds()
        if (result.data.code == 0) {
            commit(GET_ADS, { homeAds: result.data.data })
        }
    },
    async [GET_CATEGORIESARR]({ commit }) {
        const result = await api.getHomeCategories()
        console.log(result)
        if (result.data.code == 0) {
            commit(GET_CATEGORIESARR, { homeArr: result.data.data })
        }
    },
    async [GET_FLOORS]({ commit }) {
        const result = await api.getHomeFloors()
        if (result.data.code == 0) {
            commit(GET_FLOORS, { homeFloors: result.data.data })
        }
    },
}