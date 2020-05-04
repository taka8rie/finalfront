<template>
  <div>
      <house-photo style="width: 30%"></house-photo>
<!--    <user-photo ></user-photo>-->
  </div>

</template>

<script>
  import HousePhoto from "./housePhoto";
  import UserPhoto from "./userPhoto";
  export default {
    name: 'photo',
    components: {UserPhoto, HousePhoto},
  }




</script>

<style scoped>

</style>
