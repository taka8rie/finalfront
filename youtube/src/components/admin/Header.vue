<template>
  <el-card class="admin-header">
    <a href="/index" >

    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">后 台</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script>
   import {createRouter} from '../../router'

  export default {
    name: "Header",
    methods: {
      logout() {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.$store.commit('logout')
            this.$message("您已退出账号！"),
              this.$router.push({path: '/login'})
            //清空路由
            const newRouter = createRouter()
            _this.$router.matcher=newRouter.matcher
          }
        }).catch(falseResponse =>{})
      }
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
