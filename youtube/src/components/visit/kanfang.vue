<template>
  <div>
<!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="看房申请表"
      :visible.sync="dialogFormVisible"
      @close="clear">

      <el-form v-model="form" style="text-align: left" ref="dataForm">

        <el-form-item label="房屋编号" :label-width="formLabelWidth" prop="houseNumber">
          <el-input v-model="form.houseNumber" autocomplete="off" placeholder="这里是房屋编号”
"></el-input>
        </el-form-item>
        <el-form-item label="房主编号" :label-width="formLabelWidth" prop="ownerNumber">
          <el-input v-model="form.ownerNumber" autocomplete="off"></el-input>
        </el-form-item>

        <div class="block" style="margin-left: 33px">
          <span class="demonstration">预定看房时间</span>
          <el-date-picker
            v-model="form.seeTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form>

        <!--        <el-form-item label="下单处理时间" :label-width="formLabelWidth" prop="handleTime">-->
        <!--          <el-input v-model="form.handleTime" autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->

<!--        <el-form-item label="看房后评价" :label-width="formLabelWidth" prop="addNote">-->
<!--          <el-input type="textarea" v-model="form.claim" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->


      <div slot="footer" class="dialog-footer">

        <el-button @click="cancelKanfang">取 消</el-button>
        <el-button type="primary" @click="onAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "kanfang",
      data() {
        return {
          dialogFormVisible: true,//点击就跳出表格
          form: {
            houseNumber:this.$route.query.houseNumber,
            ownerNumber:this.$route.query.ownerNumber,
            // tenantNumber:this.$route.query.tenantNumber,
            seeTime:'',
            staffNumber:'',

          },
          formLabelWidth: '120px'
        }
      },
      methods:{
        clear () {
          this.form = {
            houseNumber:'',
            ownerNumber:'',
            // tenantNumber:'',
            seeTime:'',
            staffNumber:'',
            // handleTime:'',
          }
        },
        onAdd(){
          this.$axios
            .post('/kanfangadd',{
              houseNumber: this.form.houseNumber,
              ownerNumber:this.form.ownerNumber,
              // tenantNumber:this.form.tenantNumber,
              seeTime:this.form.seeTime,
              // handleTime:this.form.handleTime,
            }).then(successResponse=>{
            if (successResponse.data.code === 200) {
              this.dialogFormVisible=false
              //将数据传递给父组件里边的onAdd,父组件使用@onAdd来接受
              this.$toastMessage("添加成功", 3000)
              this.$emit('onAdd')
              this.$router.push('/index')
            }else{
              this.$message("你已经添加过该预约订单了！"),
                this.$router.push({path: '/index'})
            }
          })
        },
        cancelKanfang() {
          this.dialogFormVisible=false
          this.$router.push({path:'/index'})
        }
      }
    }
</script>

<style scoped>

</style>
