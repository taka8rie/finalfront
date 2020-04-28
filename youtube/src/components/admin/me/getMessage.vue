<template>
  <div>
    <el-card style="margin: 18px 2%;width: 95%">
    <say-to-user></say-to-user>
    </el-card>
  </div>
</template>

<script>
  import SayToUser from "../../communication/sayToUser";
    export default {
        name: "getMessage",
      components:{SayToUser},

    }
</script>

<style scoped>

</style>
