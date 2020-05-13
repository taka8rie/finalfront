<template>
  <el-card style="width: 50%;margin-left: 450px;margin-top: 150px">
  <el-form :model="form" label-width="80px">

    <el-card style="height: 300px;width: 800px;overflow: scroll;">
      <div style="float: left; ">
        <div v-for="item in message_array" :key="item"  style="margin: 10px">
          {{item}}
        </div>
      </div>
    </el-card>


    <el-input
      type="textarea"
      autosize
      placeholder="请输入内容"
      v-model="form.textarea">
    </el-input>

    <el-button type="danger" @click="sendMessages">发送信息</el-button>

  </el-form>
  </el-card>
</template>

<script>
    export default {
        name: "say",
      data() {
        return {
          message_array:[],
          form: {
            textarea:'',
          }
        }
      },
      methods:{
        sendMessages() {
          this.$goEasy.publish({
            channel: "toAdmin", //替换为您自己的channel
            message:this.form.textarea ,//替换为您想要发送的消息内容
          })
        }
      },
      mounted :function () {
        var vm=this
        this.$goEasy.subscribe({
          channel: "toUser",//替换为您自己的channel
          onMessage: function (message1) {
            vm.message_array.push("对方: "+message1.content);
          }
        })

        this.$goEasy.subscribe({
          channel: "toAdmin",//替换为您自己的channel
          onMessage: function (message1) {
            vm.message_array.push("自己: "+message1.content);
          }
        })

      }
    }
</script>

<style scoped>

</style>
