<template>
  <div>
    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>
    <el-dialog
      title="添加/修改房屋"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="房屋面积" :label-width="formLabelWidth" prop="houseArea">
          <el-input v-model="form.houseArea" autocomplete="off" placeholder="这里填房屋面积"></el-input>
        </el-form-item>
        <el-form-item label="房屋状态" :label-width="formLabelWidth" prop="houseStatus">
          <el-input v-model="form.houseStatus" autocomplete="off" placeholder="0:“待租” 1:“已出租”
"></el-input>
        </el-form-item>
        <el-form-item label="房屋价格" :label-width="formLabelWidth" prop="soldPrice">
          <el-input v-model="form.soldPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提交日期(出版日期)" :label-width="formLabelWidth" prop="lastupdateTime">
          <el-input v-model="form.lastupdateTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房屋地点(出版社)" :label-width="formLabelWidth" prop="houseAddr">
          <el-input v-model="form.houseAddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房屋图片(封面)" :label-width="formLabelWidth" prop="houseCover">
          <el-input v-model="form.houseCover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item>
        <el-form-item label="房主要求(简介)" :label-width="formLabelWidth" prop="addNote">
          <el-input type="textarea" v-model="form.addNote" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房屋类型(分类)" :label-width="formLabelWidth" prop="houseType">
          <el-select v-model="form.houseType" placeholder="请选择分类">
            <el-option label="别墅" value="1"></el-option>
            <el-option label="普通" value="2"></el-option>
            <el-option label="3DK" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
<!--            <el-option label="经管" value="5"></el-option>-->
<!--            <el-option label="科技" value="6"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item prop="houseNumber" style="height: 0">
          <el-input type="hidden" v-model="form.houseNumber" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import ImgUpload from "./ImgUpload";
    export default {
        name: "EditForm",
      components: {ImgUpload},
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
            // category: {
            //   id: '',
            //   name: ''
            // }
            addNote:'',
          },
          formLabelWidth: '120px'
        }
      },
      methods: {
        clear () {
          this.form = {
            houseNumber: '',
            houseAddr: '',
            houseType: '',
            houseArea: '',
            houseStatus: '',
            houseCover: '',
            lastupdateTime: '',
            soldPrice:'',
            addNote:'',
          }
        },
        onSubmit () {
          this.$axios
            .post('/houses', {
              houseNumber: this.form.houseNumber,
              houseAddr: this.form.houseAddr,
              houseType: this.form.houseType,
              houseArea: this.form.houseArea,
              houseStatus: this.form.houseStatus,
              houseCover: this.form.houseCover,
              lastupdateTime: this.form.lastupdateTime,
              soldPrice:this.form.soldPrice,
              addNote:this.form.addNote,
            }).then(resp => {
            if (resp && resp.status === 200) {
              this.dialogFormVisible = false
              this.$emit('onSubmit')
            }
          })
        },
        uploadImg() {
          this.form.houseCover=this.$refs.imgUpload.url
        }
      }
    }
</script>

<style scoped>

</style>
