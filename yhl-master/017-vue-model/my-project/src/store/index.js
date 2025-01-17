import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'
import sort from 'pages/sort/store'
import cart from 'pages/cart/store'
import me from 'pages/me/store'
import searchson from 'pages/searchson/store'
import list from 'pages/list/store'
import detail from 'pages/detail/store'
import login from 'pages/login/store'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home: home,
        sort: sort,
        cart: cart,
        me: me,
        searchson: searchson,
        list: list,
        detail: detail,
        login: login

    }
}) 