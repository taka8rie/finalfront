<template>
  <body id="poster">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-container">
    <h3 class="login_title">修改密码</h3>
    <el-form-item label="账号" prop="account">
      <el-input v-model.number="ruleForm.account"></el-input>
    </el-form-item>
    <el-form-item label="口令" prop="forgetToken">
      <el-input type="text" v-model="ruleForm.forgetToken" autocomplete="off"></el-input>
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
  </body>
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
        var validateToken=(rule,value,callback)=>{
          if (value === '') {
            callback(new Error('请输入口令,用于忘记密码后修改密码'));
          }
        }

        return {
          ruleForm: {
            pass: '',
            checkPass: '',
            // account: '',//由age已经修改为account
            // tel:'',
            forgetToken:''
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
            forgetToken:[{
              validator:validateToken,trigger:'blur'
            }]
          },
        };
      },
      methods:{
        submitForm(){
          this.$axios.post('/forgetpassword',{
            username:this.ruleForm.account,
            password:this.ruleForm.pass,
            forgetToken:this.ruleForm.forgetToken,
          }) .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$alert('修改成功','提示',{confirmButtonText: '确定'})
              this.$router.replace({path: '/login'})
            }
            else{
              this.$alert(successResponse.data.message,'提示',{
                confirmButtonText: '确定'
              }).catch();
            }
          }).catch(failResponse=>{})
        },
        resetForm(ruleForm) {
          this.$refs[ruleForm].resetFields();
        }
      }
    }
</script>

<style scoped>
  #poster {
    background: url("../assets/江南.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
