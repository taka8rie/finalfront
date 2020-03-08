<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
      <!--<house></house>-->
      <houses class="houses-area"></houses>
    </el-main>
  </el-container>
</template>

<script>
  import SideMenu from "./SideMenu"
  import Houses from "./Houses";
    export default {
        name: "HouseIndex",
      components:{SideMenu,Houses}
    }
</script>

<style scoped>
  .houses-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
