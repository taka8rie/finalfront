import Vue from "vue";
import Vuex from "vuex";

 Vue.use(Vuex)

export default new Vuex.Store({
  state:{
     user:{
       username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
       // username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username' || '[]')),
     },
    adminMenus:[]
  },
  mutations:{
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    login(state, user) {
       state.user=user
        window.localStorage.setItem('user',JSON.stringify(user))
      // state.username=user
      // window.localStorage.setItem('username',JSON.stringify(user))
    },
    logout(state) {
        state.user=[]
        window.localStorage.removeItem('user')
      // state.username=''
      // window.localStorage.removeItem('username')
      state.adminMenus=[]
    }
  }
})
