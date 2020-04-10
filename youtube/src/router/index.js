import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/home/Home";
import HouseIndex from "../components/house/HouseIndex";
import uploadHouse from "../components/zufang/uploadHouse";
import visitHouse from "../components/visit/visitHouse";
import Order from "../components/visit/Order";
import ShowForm from "../components/visit/ShowForm";
import ShowHouse from "../components/zufang/ShowHouse";
import AdminIndex from "../components/admin/AdminIndex";
import AdminMenu from "../components/admin/AdminMenu";
import Header from "../components/admin/Header";

Vue.use(Router)

export default new Router({
  //改为history模式
  mode: 'history',
  routes: [
    {
      path: '/login',
      component:Login
    },{
      path: '/register',
      component:Register
    },//以下为尝试新增
    {
    path:'/home',
      component:Home,
      redirect:'/index',
      children:[{
        path: '/house',
        component:HouseIndex,
        meta:{requireAuth: true}
      },{
      path:'/zufang',
        component:uploadHouse,
        meta:{requireAuth:true}
      },{
        path:'/index',
        component:visitHouse,
        meta:{requireAuth: true}
      },{
        path: '/order',
        name:'order',
        component:Order,
        meta:{requireAuth: true},
      },{
        path: '/showform',
        component:ShowForm,
        meta:{requireAuth: true}
      },
      ]
    },
    // 4/10新增
    {
    path:'/admin',
      component:AdminIndex,
      meta:{
      requireAuth:true
      }
    }
  ]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    {
      // home页面并不需要被访问，只是作为其它组件的父组件
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/house',
          component:HouseIndex,
          meta:{requireAuth: true}
        },{
          path:'/zufang',
          component:uploadHouse,
          meta:{requireAuth:true}
        },{
          path:'/index',
          component:visitHouse,
          meta:{requireAuth: true}
        },{
          path: '/order',
          name:'order',
          component:Order,
          meta:{requireAuth: true},
        },{
          path: '/showform',
          component:ShowForm,
          meta:{requireAuth: true}
        },//已修改为自身
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      // children: [
        // {
        //   path: '/admin/dashboard',
        //   name: 'Dashboard',
        //   component: DashBoard,
        //   meta: {
        //     requireAuth: true
        //   }
        // }
      // ]
    },
    {
      path: '*',
      component: Error404
    }
  ]
})




