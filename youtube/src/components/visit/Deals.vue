<template>
<child @onAdd="saveDeal()" ref="msg"></child>
<!--子类传递给父类-->
</template>

<script>
  import Order from "./Order";
    export default {
        name: "Deals",
      components:{Order},
    }
</script>

<style scoped>

</style>
