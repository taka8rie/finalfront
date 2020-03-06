import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Appindex  from "../components/home/Appindex";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Appindex
    },{
      path: '/login',
      component:Login
    }
  ]
})
