//唯一更改state的方法
//mutation必须是同步函数
import { GET_ADS, GET_FLOORS, GET_CATEGORIESARR} from './types.js'
export default {
    [GET_ADS](state, payload) {
        state.ads = payload.homeAds
    },
    [GET_CATEGORIESARR](state, payload) {
        state.arr = payload.homeArr
    },
    [GET_FLOORS](state, payload) {
        state.floors = payload.homeFloors
    },
}