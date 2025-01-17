//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作
import { GET_HOME_CATEGORIESARR, GET_SORT_CATEGORIESARR } from './types.js'
import api from 'api'
export default {
    async [GET_HOME_CATEGORIESARR]({ commit }) {
        const result = await api.getHomeCategories()
        if (result.data.code == 0) {
            commit(GET_HOME_CATEGORIESARR, { sorthomeArr: result.data.data })
        }
    },
    async [GET_SORT_CATEGORIESARR]({ commit }, pid) {
        const result = await api.getSortCategories({
            pid: pid,
            limit: 20
        })
        console.log(result)
        if (result.data.code == 0) {
            commit(GET_SORT_CATEGORIESARR, { sortArr: result.data.data})
        }
    },

}
    
    
