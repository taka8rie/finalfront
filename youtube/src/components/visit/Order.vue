<template>
  <div>
    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>
    <el-dialog
      title="订单详情"
      :visible.sync="dialogFormVisible"
      @close="clear">


      <el-form v-model="form" style="text-align: left" ref="dataForm">
<!--        <el-form-item label="账单编号" :label-width="formLabelWidth" prop="dealNumber">-->
<!--          <el-input v-model="form.dealNumber" autocomplete="off" placeholder="这里填订单编号"></el-input>-->
<!--        </el-form-item>-->


        <el-form-item label="房屋编号" :label-width="formLabelWidth" prop="houseNumber">
          <el-input v-model="form.houseNumber" autocomplete="off" placeholder="这里是房屋编号”
"></el-input>
        </el-form-item>
        <el-form-item label="房主编号" :label-width="formLabelWidth" prop="ownerNumber">
          <el-input v-model="form.ownerNumber" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="租客编号" :label-width="formLabelWidth" prop="ownerNumber">
          <el-input v-model="form.ownerNumber" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="管理员编号" :label-width="formLabelWidth" prop="staffNumber">
          <el-input v-model="form.staffNumber" autocomplete="off"></el-input>
        </el-form-item>

        <div class="block">
          <span class="demonstration">租房起始时间</span>
          <el-date-picker
            v-model="form.beginTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">租房截止时间</span>
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <el-form-item label="总价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="下单处理时间" :label-width="formLabelWidth" prop="handleTime">
          <el-input v-model="form.handleTime" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="看房后评价" :label-width="formLabelWidth" prop="addNote">
          <el-input type="textarea" v-model="form.claim" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "Order",
      data(){
        return {
          dialogFormVisible: true,
          form: {
            houseNumber:this.$route.query.houseNumber,
            ownerNumber:this.$route.query.ownerNumber,
            tenantNumber:this.$route.query.tenantNumber,
            beginTime:'',
            claim:'',
            endTime:'',
            price:this.$route.query.soldPrice,
            staffNumber:'',
            handleTime:'',
          },
          formLabelWidth: '120px'
        }
      },
      methods:{
        clear () {
          this.form = {
            houseNumber:'',
            ownerNumber:'',
            tenantNumber:'',
            beginTime:'',
            claim:'',
            endTime:'',
            price:'',
            staffNumber:'',
            handleTime:'',
          }
        },
        onAdd(){
          this.$axios
          .post('/dealadd',{
            houseNumber: this.form.houseNumber,
            ownerNumber:this.form.ownerNumber,
            tenantNumber:this.form.tenantNumber,
            beginTime:this.form.beginTime,
            claim:this.form.claim,
            endTime:this.form.endTime,
            price:this.form.price,
            staffNumber:this.form.staffNumber,
            handleTime:this.form.handleTime,
          }).then(resp=>{
            if (resp && resp.status == 200) {
              this.dialogFormVisible=false
              //将数据传递给父组件里边的onAdd,父组件使用@onAdd来接受
              this.$toastMessage("返回成功", 3000)
              this.$emit('onAdd')
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
