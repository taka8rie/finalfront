<template>
   <body id="poster">
   <el-form>
        <el-form class="login-container" label-position="left"
                 label-width="0px">
          <h3 class="login_title">系统登录</h3>
          <el-form-item>
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input type="text" v-model="loginForm.yanzhengma"
                      auto-complete="off" placeholder="验证码"></el-input>
          </el-form-item>
<!--          <codetest></codetest>-->
          <identify :identifyCode="identifyCode"></identify>

<!--         <el-form-item>-->
<!--           <el-radio-group v-model="radio">-->
<!--             <el-radio :label="2">房东</el-radio>-->
<!--             <el-radio :label="3">租客</el-radio>-->
<!--             <el-radio :label="1">管理员</el-radio>-->
<!--           </el-radio-group>-->
<!--         </el-form-item>-->
          <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
          </el-form-item>
        </el-form>
      <el-form-item>
        <el-button type="primary" @click="gotoregister">注册</el-button>
      </el-form-item>
   </el-form>
    </body>

</template>

<script>

  import Codetest from "./yanzhengma/codetest";
  import Identify from "./yanzhengma/identify";
  export default {
    name: 'Login',
    components: {Identify, Codetest},
    data () {
      return {
        loginForm: {
          username: '',//loginForm里边的用户名
         password: '',
          yanzhengma:'',
        },
        radio:3,
        responseResult: [],
        toastShow: false,
        toastText: '',
        //验证码部分:
        identifyCodes: "1234567890",
        identifyCode: ""
      }
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      login () {
        this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password,
            accountType:this.radio.valueOf(), //传label的值过去
            withCredentials:true,//获取session
          })
          .then(successResponse => {
            if (successResponse.data.code === 200&&this.identifyCode===this.loginForm.yanzhengma) {
              this.$router.replace({path: '/index'})
              //获取session
              // sessionStorage.setItem('name',JSON.stringify(successResponse.data.username));
              // let myName=JSON.parse(sessionStorage.getItem("name"));
              // console.log("session is : "+myName)
            }else{
            //这里需要填充
              this.$toastMessage({message:'用户名和密码错误',time:3000})
            }
          })
          .catch(failResponse => {
          })
      },
      gotoregister(){
        this.$router.replace('/register')
      },
      //验证码部分:
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
      }
    }
  }
</script>

<style>
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

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }



  #poster {
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }

</style>


