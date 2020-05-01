// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import toastMessage from "./components/alert/ToastMessage";
import visitHouse from "./components/visit/visitHouse";
import identify from "./components/yanzhengma/identify";
import GoEasy from 'goeasy'
import store from './store'
import {Message} from "element-ui";
//环状图 4.30
import VeLine from 'v-charts/lib/ring.common'
Vue.component(VeLine.name, VeLine)




//即时通信调用goEasy 4.27
Vue.prototype.$goEasy=new GoEasy({
  host:'hangzhou.goeasy.io',
  appkey:'BC-43d967d060864265b1e442aceb713772',
  onConnected: function() {
    console.log('连接成功！')

  },
  onDisconnected: function() {
    console.log('连接断开！')
  },
  onConnectFailed: function(error) {
    console.log('连接失败或错误！')
  }
})

// Vue.use(Message)
// Vue.prototype.$message=Message
//验证码
Vue.use(identify)
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
  //在用户已登录且访问以 /admin 开头的路径时请求菜单信息
  if (store.state.user && to.path.startsWith('/admin')) {
    console.log("进入访问admin")
    initAdminMenu(router,store)
    console.log("已退出initAdminMenu")
  }
  // 已登录状态下访问 center 页面直接跳转到后台首页  ---->这里需要修改/login和dashboard, 尝试修改startwith
  if (store.state.user && to.path.startsWith('/center')) {
    console.log("进入了跳转函数")
    next({
      path: 'admin'//！！这里的dashboard未实现
    })
    console.log("跳转函数执行结束")
  }
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

//执行请求，调用格式化方法并向路由表中添加信息
const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  // if (store.state.adminMenus) {//!!外边一层if是尝试添加
  console.log("initAdminMenu里的length: " + store.state.adminMenus.length);
    if (store.state.adminMenus.length > 0) {
      return;
    }

  // }
  axios.get('/menu').then(resp => {

    if (resp && resp.status === 200) {
      console.log("状态码是200")
      var fmtRoutes = formatRoutes(resp.data.result)//
      console.log("fmtRoutes的值是: "+fmtRoutes)
      router.addRoutes(fmtRoutes)
      console.log("initAdminMenu接收到的路由: " + fmtRoutes);
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}


//传入的参数 routes 代表我们从后端获取的菜单列表
const formatRoutes = (routes) => {
  let fmtRoutes = []
  //先判断一条菜单项是否含子项,如果含则进行递归处理
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    //把路由的属性与菜单项的属性对应起来
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


