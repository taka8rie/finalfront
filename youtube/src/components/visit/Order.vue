<template>
  <div>
    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>
    <el-dialog
      title="订单详情"
      :visible.sync="dialogFormVisible"
      @close="clear">

      <el-form v-model="form" :rules="rules" style="text-align: left" ref="dataForm">
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



<!--        <el-form-item label="管理员编号" :label-width="formLabelWidth" prop="staffNumber">-->
<!--          <el-input v-model="form.staffNumber" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="客服人员:" :label-width="formLabelWidth" prop="houseType">
          <el-select v-model="form.staffNumber" placeholder="请选择分类"  >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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

<!--        <el-form-item label="下单处理时间" :label-width="formLabelWidth" prop="handleTime">-->
<!--          <el-input v-model="form.handleTime" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->

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
          options: [ {
            value:"3",
            label:'许昊龙'
          },
            {
              value: "1",
              label: '侯国玉'
            }, {
              value: "2",
              label: '山泥若'
            }],
          value:'',

          dialogFormVisible: true,//点击就跳出表格
          form: {
            houseNumber:this.$route.query.houseNumber,
            ownerNumber:this.$route.query.ownerNumber,
            // tenantNumber:this.$route.query.tenantNumber,
            beginTime:'',
            claim:'',
            endTime:'',
            price:this.$route.query.soldPrice,
            staffNumber:'',

          },
          formLabelWidth: '90px',
          rules:{
            beginTime:[{required:true,message:'请选择开始时间',trigger:'blur'}],
            endTime:[{required:true,message:'请选择结束时间',trigger:'blur'}],
          }
        }
      },
      methods:{
        clear () {
          this.form = {
            houseNumber:'',
            ownerNumber:'',
            // tenantNumber:'',
            beginTime:'',
            claim:'',
            endTime:'',
            price:'',
            staffNumber:'',
            // handleTime:'',
          }
        },
        onAdd(){
          this.$axios
          .post('/dealadd',{
            houseNumber: this.form.houseNumber,
            ownerNumber:this.form.ownerNumber,
            // tenantNumber:this.form.tenantNumber,
            beginTime:this.form.beginTime,
            claim:this.form.claim,
            endTime:this.form.endTime,
            price:this.form.price,
             staffNumber:this.form.staffNumber,

            // handleTime:this.form.handleTime,
          }).then(resp=>{
            if (resp && resp.status == 200) {
              this.dialogFormVisible=false
              //将数据传递给父组件里边的onAdd,父组件使用@onAdd来接受
              // this.$toastMessage("返回成功", 3000)
              this.$message("添加订单成功！"),
                this.$router.push({path: '/index'})
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
