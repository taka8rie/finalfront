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
import AdminIndex from "../components/admin/AdminIndex";
import center from "../components/common/center";
import DashBoard from "../components/admin/dashboard/index"
import myOrder from "../components/admin/zuke/myOrder";
import myHouse from "../components/admin/fangzhu/myHouse";
import myRent from "../components/admin/fangzhu/myRent";
import allHouse from "../components/admin/me/allHouse";
import allOrder from "../components/admin/me/allOrder";
import notCheck from "../components/admin/me/notCheck";
import kanfang from "../components/visit/kanfang";
import myYuyue from "../components/admin/zuke/myYuyue";
import allYuyue from "../components/admin/me/allYuyue";
import searchUser from "../components/admin/me/searchUser";
import HomePage from "../components/home/HomePage";
import ForgetPassword from "../components/ForgetPassword";
import searchHouse from "../components/admin/me/searchHouse";
import checked from "../components/admin/fangzhu/checked";
import findFreezed from "../components/admin/me/findFreezed";
import say from "../components/communication/say";
import getMessage from "../components/admin/me/getMessage";
//测试dataV
import photo from "../components/admin/dashboard/photo";

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
    },{
    path:'/forgetPassword',
      component:ForgetPassword
    },
    {
      path:'/homepage',
      component:HomePage
    },

    //以下为尝试新增
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
      },{
        path: '/center',
        name: 'center',
        component:center,
      },{
      path:'/kanfang',
        name:'kanfang',
        component:kanfang,
      },
      ]
    },
    // 4/10新增
    {
    path:'/admin',
      component:AdminIndex,
      meta:{
      requireAuth:true
      },
      children:[
        {
          path:'/admin/dashboard',
          name:'Dashboard',
          redirect:'/index'
        },
        // 4/12
        {
          path:'/admin/zuke/myorder',
          name:'myOrder',
          component:myOrder,
        },
        {
         path:'/admin/fangzhu/myhouse',
          name:'myHouse',
          component:myHouse,
        },{
          path:'/admin/fangzhu/myrent',
          name:'myRent',
          component:myRent
        },{
          path: '/admin/me/allhouse',
          name: 'allHouse',
          component:allHouse
        },{
          path: '/admin/me/allorder',
          name:'allOrder',
          component:allOrder
        },{
          path: '/admin/me/notcheck',
          name:'notCheck',
          component:notCheck,
        },
        {
          path:'/admin/zuke/myYuyue',
          name:'myYuyue',
          component:myYuyue
        },
        {
          path:'/admin/me/allYuyue',
          name:'allYuyue',
          component:allYuyue,
        },
        {
          path:'/admin/me/searchUser',
          name:'searchUser',
          component:searchUser
        },
        {
          path:'/admin/me/searchHouse',
          name:'searchHouse',
          component:searchHouse,
        },
        {
          path:'/admin/fangzhu/checked',
          name:'checked',
          component:checked,
        },
        {
          path:'/admin/me/findFreezed',
          name:'findFreezed',
          component:findFreezed,
        },
        {
          path:'/admin/me/getMessage',
          name:'getMessage',
          component:getMessage,
        },
        {
          path:'/admin/me/photo',
          name:'photo',
          component:photo
        }

      ]
    },
    //4.28
    {
      path:'/say',
      name:'say',
      component:say,
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
        },{
          path: '/center',
          component:center,
        }
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




