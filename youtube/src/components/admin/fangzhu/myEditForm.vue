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


        <div class="block">
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
        <el-form-item label="房主要求" :label-width="formLabelWidth" prop="addNote">
          <el-input type="textarea" v-model="form.addNote" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="房屋类型" :label-width="formLabelWidth" prop="houseType">
          <el-select v-model="form.houseType" placeholder="请选择分类"  @change="haolong">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 import ImgUpload from "../../house/ImgUpload";
    export default {
        name: "myEditForm",
      components:{ImgUpload},
      data () {
        return {
          //尝试替换为el-select
          options: [ {
            value:"1",
            label:'别墅'
          },
            {
              value: "2",
              label: '普通'
            }, {
              value: "3",
              label: '3DK'
            }, {
              value: "4",
              label: '其他'
            }],
          value:'',

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
            adminCheck:false,//房屋默认未审核
          },
          formLabelWidth: '120px'
        }
      },
      methods: {
        haolong(key) {
          // 将房屋类型转换为label,并传递object.label值到Houses的houseType中
          let object={};
          object=this.options.find((item)=>{
            return item.value===key;
          })
          // this.form.houseType=object.label
          console.log('label值为: '+object.label)
        },
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
            adminCheck:false,
          }
        },
        onSubmit () {
          console.log("审查的值为: "+this.form.adminCheck)
          if (this.form.houseType == '1DK') {
            this.form.houseType='1'
          }else if (this.form.houseType == '别墅') {
            this.form.houseType='2'
          }else if (this.form.houseType == '3DK') {
            this.form.houseType='3'
          }else {
            this.form.houseType='0'
          }
          if (this.form.houseStatus == "未被订购") {
            this.form.houseStatus='0'
          }else{
            this.form.houseStatus='1'
          }

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
              adminCheck:this.form.adminCheck

            }).then(resp => {
            if (resp && resp.status === 200) {
              this.dialogFormVisible = false
              this.$emit('onSubmit')
            }
          });
        },
        uploadImg() {
          this.form.houseCover=this.$refs.imgUpload.url
          console.log(this.$refs.imgUpload.url);
          console.log(this.form.houseCover);
        }
      }
    }
</script>

<style scoped>

</style>
