<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input v-model.number="ruleForm.account"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="tel">
      <el-input type="text" v-model="ruleForm.tel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "ForgetPassword",
      data() {
        var checkAccount = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('账号不能为空'));
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        var validateTel=(rule,value,callback)=>{
          if (value === '') {
            callback(new Error('请输入电话,用于忘记密码后修改密码'));
          }
        }

        return {
          ruleForm: {
            pass: '',
            checkPass: '',
            // account: '',//由age已经修改为account
            tel:''
          },
          // radio:'1',
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            account: [
              { validator: checkAccount, trigger: 'blur' }
            ],
            tel:[{
              validator:validateTel,trigger:'blur'
            }]
          },
        };
      },
      methods:{
        submitForm(){
          this.$axios.post('/forgetpassword',{
            username:this.ruleForm.account,
            password:this.ruleForm.pass,
            tel:this.ruleForm.tel,
          }) .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$alert('修改成功','提示',{confirmButtonText: '确定'})
              this.$router.replace({path: '/login'})
            }
          }).catch(failResponse=>{})
        }
      }
    }
</script>

<style scoped>

</style>
