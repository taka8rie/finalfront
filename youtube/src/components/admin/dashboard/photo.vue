<template>
  <div>
    <el-card>
      <ve-ring :data="chartData">
        <div class="data-empty" v-if ="xianshi">请选择时间段，以显示房屋出租情况</div>
      </ve-ring>
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
      <div>
      <button @click="changeType">切换图表类型</button>
      <ve-chart :data="newuserdata" :settings="chartSettings"></ve-chart>
<!--      <ve-ring :data="userData" ></ve-ring> 5.13-->
      </div>
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
      this.typeArr = ['pie', 'histogram', ]
      this.index = 0
      return {
        xianshi:true,
        chartData: {
          columns: ['name','number'],
          rows: [],
        },
        // userData:{
        //   columns: ['name','number'],
        //   rows: []
        // },
        newuserdata:{
              columns: ['name','number'],
              rows: [],
          },
        chartSettings: { type: this.typeArr[this.index] },
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
              _this.xianshi = false
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
              // _this.userData.rows=data
              _this.newuserdata.rows=data
            }
          })
        },
        changeType: function () {
          this.index++
          if (this.index >= this.typeArr.length) { this.index = 0 }
          this.chartSettings = { type: this.typeArr[this.index] }
        }
      }
  }
</script>

<style scoped>
  .data-empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, .7);
    color: #888;
    font-size: 14px;
  }
</style>


