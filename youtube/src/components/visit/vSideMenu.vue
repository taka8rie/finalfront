<template>
  <el-select
    class="side"
    v-model="value" placeholder="请选择感兴趣的类型"
    @change="typeSelect">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
    export default {
        name: "vSideMenu",
      data() {
        return {
          options: [{
            value: "全部",
            label: '全部'
          }, {
            value:"别墅",
            label:'别墅'
          },
            {
            value: "普通",
            label: '普通'
          }, {
            value: "3DK",
            label: '3DK'
          }, {
            value: "其他",
            label: '其他'
          }],
          value: ''
        }
      },
      methods:{
        typeSelect(key) {
          //这里为试读取label值(可用)
          let object = {};
        object=this.options.find((item)=>{
          return item.value===key;
        })
          console.log('vSideMenu里边key值: '+object.value)
          console.log('vSideMenu里边key对应的label值: '+object.label)
    //以下为正常代码
         this.value=key
          this.$emit('visitSelect')
        }
      }
    }
</script>

<style scoped>
.side{
  position: fixed;
  margin-left: 50%;
  left: -450px;
  top: 130px;
  width: 200px;
}
</style>
