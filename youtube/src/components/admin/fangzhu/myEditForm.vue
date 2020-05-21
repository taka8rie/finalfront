<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">上传房屋<i class="el-icon-upload el-icon--right"  ></i></el-button>
    <el-dialog
      title="添加/修改房屋"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="form" :rules="rules" style="text-align: left" ref="form">
        <el-form-item label="房屋面积" :label-width="formLabelWidth" prop="houseArea">
          <el-input v-model="form.houseArea" autocomplete="off" placeholder="这里填房屋面积"></el-input>
        </el-form-item>

        <!--        <el-form-item label="房屋状态" :label-width="formLabelWidth" prop="houseStatus">-->
        <!--          <el-input v-model="form.houseStatus" autocomplete="off" placeholder="0:“待租” 1:“已出租”-->
        <!--"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="房屋状态" :label-width="formLabelWidth" prop="houseStatus">
          <el-select v-model="form.houseStatus" placeholder="请选择分类" >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="房屋价格" :label-width="formLabelWidth" prop="soldPrice">
          <el-input v-model="form.soldPrice" autocomplete="off"></el-input>
        </el-form-item>

        <div class="block" >
          <span class="demonstration">提交日期</span>
          <el-date-picker
            v-model="form.lastupdateTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>


        <!--        </el-form-item>-->
        <el-form-item label="房屋地点" :label-width="formLabelWidth" prop="houseAddr">
          <el-input v-model="form.houseAddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房屋图片" :label-width="formLabelWidth" prop="houseCover">
          <el-input v-model="form.houseCover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>

        </el-form-item>

        <el-form-item label="房屋内部图片" :label-width="formLabelWidth" prop="housePicture">
          <el-input v-model="form.housePicture" autocomplete="off" placeholder="内部图片 URL"></el-input>
          <picture-upload @onUpload="uploadPicture" ref="pictureUpload"></picture-upload>
        </el-form-item>

        <el-form-item label="房主要求" :label-width="formLabelWidth" prop="addNote">
          <el-input type="textarea" v-model="form.addNote" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="房屋类型" :label-width="formLabelWidth" prop="houseType">
          <el-select v-model="form.houseType" placeholder="请选择分类" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="houseNumber" style="height: 0">
          <el-input type="hidden" v-model="form.houseNumber" autocomplete="off"></el-input>
        </el-form-item>

        <!--        <el-form-item label="是否审核">-->
        <!--          <el-switch v-model="form.adminCheck" :active-value="1" :inactive-value="0" disabled></el-switch>-->
        <!--        </el-form-item>-->


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ImgUpload from "../../house/ImgUpload";
  import PictureUpload from "../../house/PictureUpload";
  export default {
    name: "myEditForm",
    components:{PictureUpload, ImgUpload},
    data () {
      return {
        //尝试替换为el-select
        options: [ {
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
        value:'',

        statusOptions:[
          {
            value:"未出租",
            label:'未出租'
          },
          {
            value: "已出租",
            label: '已出租'
          }
        ],

        dialogFormVisible: false,
        form: {
          ownerNumber:'',
          houseNumber: '',
          houseAddr: '',
          houseType: '',
          houseArea: '',
          houseStatus: '',
          houseCover: '',
          lastupdateTime: '',
          soldPrice:'',
          addNote:'',
          adminCheck:0,//房屋默认未审核
          housePicture:'' //5.18
        },
        formLabelWidth: '90px',

        rules:{
          houseArea:[{required:true,message:'请输入房屋面积',trigger:'change'}],
          houseStatus:[{required:true,message:'请选择房屋状态',trigger:'change'}],
          soldPrice:[{required:true,message:'请填入房屋价格',trigger:'blur'}],
          houseAddr:[{required:true,message:'请填入房屋地址',trigger:'blur'}],
          houseType:[{required:true,message:'请选择房屋类型',trigger:'change'}],
        }
      }
    },
    methods: {
      // haolong(key) {
      //   // 将房屋类型转换为label,并传递object.label值到Houses的houseType中
      //   let object={};
      //   object=this.options.find((item)=>{
      //     return item.value===key;
      //   })
      //   // this.form.houseType=object.label
      //   console.log('label值为: '+object.label)
      // },
      clear () {
        this.form = {
          ownerNumber: '',
          houseNumber: '',
          houseAddr: '',
          houseType: '',
          houseArea: '',
          houseStatus: '',
          houseCover: '',
          lastupdateTime: '',
          soldPrice:'',
          addNote:'',
          adminCheck:0,//修改了这里！ 4.17
          housePicture:''
        }
      },
      onSubmit () {
        this.$refs.form.validate((valid)=>{
          if (valid) {
            this.$axios
              .post('/houses', {
                // ownerNumber:this.form.ownerNumber,
                houseNumber: this.form.houseNumber,
                houseAddr: this.form.houseAddr,
                houseType: this.form.houseType,
                houseArea: this.form.houseArea,
                houseStatus: this.form.houseStatus,
                houseCover: this.form.houseCover,
                lastupdateTime: this.form.lastupdateTime,
                soldPrice:this.form.soldPrice,
                addNote:this.form.addNote,
                // adminCheck:this.form.adminCheck,//是否对房屋进行审查
                adminCheck:this.form.adminCheck,
                housePicture:this.form.housePicture
              }).then(resp => {
              if (resp && resp.status === 200) {
                this.dialogFormVisible = false
                this.$emit('onSubmit')
              }
            });
          }else{
            console.log('error submit');
            return false;
          }
        })
      },
      uploadImg() {
        this.form.houseCover=this.$refs.imgUpload.url
        console.log(this.$refs.imgUpload.url);
        console.log(this.form.houseCover);
      },
      uploadPicture() {
        console.log("水怪")
        this.form.housePicture=this.$refs.pictureUpload.url
        console.log(this.form.housePicture)
      }
    }
  }
</script>

<style scoped>

</style>
