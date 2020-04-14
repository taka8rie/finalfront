<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu @indexSelect="listByType" ref="SideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <!--<house></house>-->
      <houses class="houses-area" ref="houseArea"></houses>
    </el-main>

  </el-container>
</template>

<script>
  import SideMenu from "./SideMenu"
  import Houses from "./Houses";

  export default {
        name: "HouseIndex",
      components:{SideMenu,Houses},
    methods:{
      listByType() {
        var _this=this
        var cid=this.$refs.SideMenu.cid //这里想取sidemenu组件里边的type的数值,返回数字
        var url = 'type/' + cid + '/houses'
        this.$axios.get(url).then(resp => {
          if (resp && resp.status === 200) {
            _this.$refs.houseArea.houses = resp.data
          }
        })
      }
    }
    }
</script>

<style scoped>
  .houses-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }

</style>
