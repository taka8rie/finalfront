<template>
  <div>
    <el-card>
      <ve-ring :data="chartData"></ve-ring>
      <div class="block" >
        <span class="demonstration">选择时间段查看租房情况</span>
        <el-date-picker
          @change="loadhousechart"
          v-model="value1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </el-card>
    <el-card>
<!--      <user-photo></user-photo>-->
      <ve-ring :data="userData" ></ve-ring>
    </el-card>
  </div>
</template>
<script>
  import UserPhoto from "./userPhoto";
  import HousePhoto from "./housePhoto";
  export default {
    name: 'photo',
    components: {HousePhoto, UserPhoto},
    data () {
      return {
        chartData: {
          columns: ['name','number'],
          rows: [],
        },
        userData:{
          columns: ['name','number'],
          rows: []
        },
        value1:"",//传达日期
      }
    },
    mounted() {
      // this.loadhousechart()
      this.loaduserchart()
    },
    methods:
      {
        loadhousechart() {
          var _this = this
          console.log("选择的时间段: "+this.value1)
          this.$axios.post('/statistics',{
            value1:this.value1
          }).then(resp => {
            if (resp && resp.status === 200) {
              let data = resp.data;
              // _this.chartData.rows= resp.data
              _this.chartData.rows = data
            }
          })
        },
        loaduserchart()
        {
          var _this = this
          this.$axios.get('/userChart').then(resp => {
            if (resp && resp.status === 200) {
              let data = resp.data;
              console.log(data)
              _this.userData.rows=data
            }
          })
        }
      }
  }
</script>

<style scoped>

</style>


