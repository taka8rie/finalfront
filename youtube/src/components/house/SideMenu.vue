<template>
  <el-menu
    class="categories"
    :default-active="this.$route.path"
    @select="handleSelect"
    active-text-color="red"
    >
    <el-menu-item index="全部">
      <i class="el-icon-menu"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index="别墅">
      <i class="el-icon-menu"></i>
      <span slot="title">别墅</span>
    </el-menu-item>
    <el-menu-item index="普通">
      <i class="el-icon-menu"></i>
      <span slot="title">普通</span>
    </el-menu-item>
    <el-menu-item index="3DK">
      <i class="el-icon-menu"></i>
      <span slot="title">3DK</span>
    </el-menu-item>
    <el-menu-item index="其他">
      <i class="el-icon-menu"></i>
      <span slot="title">其他</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
    export default {
        name: "SideMenu",
      data() {
          return {
            cid:'' //这里需要修改
          }
      },
      methods:{//handleSelect(key, keyPath),没用到keyPath
        handleSelect(key) {
          this.cid=key
          this.$emit('indexSelect')
        }
      }
    }
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 50%;
    left: -650px;
    top: 130px;
    width: 150px;
  }
</style>
