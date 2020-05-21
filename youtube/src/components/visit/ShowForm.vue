<template>
  <div>
<!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="房屋详情"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="房屋面积 " :label-width="formLabelWidth" prop="houseArea"  >
<!--          <el-input v-model="form.houseArea" autocomplete="off" placeholder="这里填房屋面积"></el-input>-->
          <span>{{form.houseArea}}</span>
        </el-form-item>
        <el-form-item label="房屋状态 " :label-width="formLabelWidth" prop="houseStatus">
<!--          <el-input v-model="form.houseStatus" autocomplete="off" placeholder="0:“待租” 1:“已出租”"></el-input>-->
          <span>{{form.houseStatus}}</span>
        </el-form-item>
        <el-form-item label="房屋价格/月" :label-width="formLabelWidth" prop="soldPrice">
<!--          <el-input v-model="form.soldPrice" autocomplete="off"></el-input>-->
          <span>{{form.soldPrice}}</span>
        </el-form-item>
<!--        <el-form-item label="提交日期" :label-width="formLabelWidth" prop="lastupdateTime">-->
<!--          <el-input v-model="form.lastupdateTime" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label="房屋地点" :label-width="formLabelWidth" prop="houseAddr">
<!--          <el-input v-model="form.houseAddr" autocomplete="off"></el-input>-->
          <span>{{form.houseAddr}}</span>
        </el-form-item>
<!--        <el-form-item label="房屋图片" :label-width="formLabelWidth" prop="houseCover">-->
<!--          <el-input v-model="form.houseCover" autocomplete="off" placeholder="图片 URL"></el-input>-->
<!--          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>-->
<!--        </el-form-item>-->
        <el-form-item label="房主要求" :label-width="formLabelWidth" prop="addNote" >
<!--          <el-input :disabled="true" type="textarea" v-model="form.addNote" autocomplete="off"></el-input>-->
          <span>{{form.addNote}}</span>
        </el-form-item>

        <el-form-item label="房屋类型" :label-width="formLabelWidth" prop="houseType">
<!--          <el-select :disabled="true" v-model="form.houseType" placeholder="请选择分类">-->
<!--            <el-option label="别墅" value="1"></el-option>-->
<!--            <el-option label="普通" value="2"></el-option>-->
<!--            <el-option label="3DK" value="3"></el-option>-->
<!--            <el-option label="其他" value="4"></el-option>-->
            <span>{{form.houseType}}</span>
<!--         </el-select>-->
        </el-form-item>

        <el-form-item label="历史评价" :label-width="formLabelWidth" prop="tenent_claim">
<!--          <el-input :disabled="true" type="hidden" v-model="form.houseNumber" autocomplete="off"></el-input>-->
                    <span>{{form.tenentClaim}}</span>
        </el-form-item>


        <el-form-item prop="houseNumber" style="height: 0">
          <el-input :disabled="true" type="hidden" v-model="form.houseNumber" autocomplete="off"></el-input>
<!--          <span>{{form.houseNumber}}</span>-->
        </el-form-item>

        <el-form-item prop="ownerNumber" style="height: 0">
          <el-input :disabled="true" type="hidden" v-model="form.ownerNumber" autocomplete="off"></el-input>
<!--          <span>{{form.ownerNumber}}</span>-->
        </el-form-item>

        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :preview-src-list="srcList">
        </el-image>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="yuyue">预约看房</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="gotolink">订购</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "ShowForm",
      data () {
        return {
          dialogFormVisible: false,
          form: {
            houseNumber: '',
            houseAddr: '',
            houseType: '',
            houseArea: '',
            houseStatus: '',
            houseCover: '',
            lastupdateTime: '',
            soldPrice:'',
            addNote:'',
            ownerNumber:'',//注释掉ownerNumber
            tenentClaim:'',//
            housePicture:''
             },
          formLabelWidth: '90px',
          url: '',
          srcList:[]

        }
      },
      methods: {
        clear () {
          this.form = {
            houseNumber: '',
            houseAddr: '',
            houseArea: '',
            houseStatus: '',
            houseCover: '',
            lastupdateTime: '',
            soldPrice:'',
            addNote:'',
            ownerNumber:'',//注释掉ownerNumber
            houseType: '',
            tenentClaim:'',

          }
        },
        gotolink () {
          // console.log('ShowForm里边的ownerNumber '+this.form.ownerNumber)
          // console.log('ShowForm里边的房屋编号: '+this.form.houseNumber)
          this.$router.push({
            name:'order',
            query:{
              houseNumber:this.form.houseNumber,
              soldPrice:this.form.soldPrice,
              ownerNumber:this.form.ownerNumber,
               // tenantNumber:this.form.tenantNumber
            }
          })
        },
        yuyue() {
            this.$router.push({
              name:'kanfang',
              query:{
                houseNumber:this.form.houseNumber,
                ownerNumber:this.form.ownerNumber,
              }
            })
        }
      }
    }
</script>

<style scoped>

</style>
