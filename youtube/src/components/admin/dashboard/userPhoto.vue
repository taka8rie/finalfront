<template>
  <ve-ring :data="chartData" ></ve-ring>
</template>

<script>
    export default {
        name: "userPhoto",
      data () {
        return {
          chartData: {
            columns: ['name','number'],
            rows: []
          }
        }
      },
      created(){
        var _this = this
        this.$axios.get('/userChart').then(resp => {
          if (resp && resp.status === 200) {
            let data = resp.data;
            console.log(data)
            // _this.chartData.rows= resp.data
            _this.chartData.rows=data
          }
        })
      }

    }
</script>

<style scoped>

</style>
