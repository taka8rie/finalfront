<template>

    <ve-ring :data="chartData" ></ve-ring>
    <ve-ring :data="userData"></ve-ring>
</template>

<script>

    export default {
        name: "housePhoto",
      data () {
        return {
          chartData: {
            columns: ['name','number'],
            rows: []
          },
          userData:{
            columns: ['name','number'],
            rows: []
          }
        }
      },
      created(){
        var _this = this
        this.$axios.get('/statistics').then(resp => {
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
