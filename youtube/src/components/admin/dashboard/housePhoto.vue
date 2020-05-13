<template>
  <div>
    <ve-ring :data="chartData" ></ve-ring>
    </div>
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
      mounted() {
        this.loadhousechart()
        this.loaduserchart()
      },
      methods:
        {
          loadhousechart() {
            var _this = this
            this.$axios.get('/statistics').then(resp => {
              if (resp && resp.status === 200) {
                let data = resp.data;
                console.log(data)
                // _this.chartData.rows= resp.data
                _this.chartData.rows = data
              }
            })
          },
        }
    }
</script>

<style scoped>

</style>
