// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import toastMessage from "./components/alert/ToastMessage";
import visitHouse from "./components/visit/visitHouse";
import  Vuex from 'vuex'
import store from './store'

// import store from './store'
Vue.use(toastMessage)
// Vue.use(Vuex)

var axios=require('axios')
axios.defaults.baseURL='http://localhost:8443/api'
Vue.prototype.$axios=axios
Vue.config.productionTip = false

//尝试获取session的值
Vue.config.debug=true;
axios.defaults.withCredentials=true//前端带上cookies


Vue.use(ElementUI)

//使用钩子函数判断是否拦截,在访问每一个路由前调用
router.beforeEach((to,from,next)=>{
  // if (store.state.user.username && to.path.startsWith('/login')) {
  //   initAdminMenu(router,store)
  // }
  // 已登录状态下访问 login 页面直接跳转到后台首页  ---->这里需要修改/login和dashboard, 尝试修改startwith
  //从'/login'修改为‘/’表示已经登录
  // if (store.state.user.username && to.path.startsWith('/center')) {
  //   next({
  //     path: '/admin'//尝试在这里修改了路径
  //   })
  // }
  // if (to.meta.requireAuth) {
  //   if (store.state.user.username) {
  //     axios.get('/authentication').then(resp=>{
  //       if(resp) next()
  //     })
  //   }else {
  //     next({
  //       //这里尝试改为了空,自己设置的登录页面就是‘/’
  //       path:'login',
  //       query:{redirect:to.fullPath}
  //     })
  //   }
  // }else {
  //   next()
  // }




  //首先判断访问的路径是否需要被拦截进行登录
  if (to.meta.requireAuth) {
    //判断 store 里有没有存储 user 的信息，如果存在，则放行
    if (store.state.user) {
      axios.get('/authentication').then(resp=>{
          console.log(resp)
        if (resp.data) {
          next();
        }
      })
    }else{//否则跳转到登录页面
      //并存储访问的页面路径（以便在登录后跳转到访问页）
      next({
        path:'/login',//应该要修改这个路径
        query:{redirect:to.fullPath}
      })
    }
  }else {
    next();
  }
})

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data.result)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}



const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store,
  components: { App},
  template: '<App/>'
})


