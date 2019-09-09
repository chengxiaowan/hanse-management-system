<template>
    <div class="header">
      <img src="../assets/image/login.png" alt class="logo" />
    </div>
</template>
<script>
export default {
    name:"top",
    data(){
        return{
            show:true,
        }
    }
}
</script>
<style>
.header {
  width: 100%;
  height: 60px;
  background: rgb(245, 245, 246);
  box-shadow: 0 1px 1px 0 rgba(199, 199, 199, 0.5);
}
</style>