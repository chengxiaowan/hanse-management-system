<template>
  <div class="page-title">
    {{page}}
    <i class="el-icon-close bobodrool" @click="close"></i>
  </div>
</template>
<script>
export default {
  name: "heads",
  props: ["page"],
  data() {
    return {
      show: true
    };
  },
  methods:{
      close(){
          this.$router.push({
              path:"/index"
          })
      }
  }
};
</script>

<style >
.page-title {
  height: 40px;
  background: #2c3d4c;
  color: #fff;
  line-height: 40px;
  font-size: 16px;
  font-weight: 400;
  padding-left: 35px;
  border-top: 1px solid #333;
}
#app .bobodrool {
  float: right;
  margin-right: 35px;
  color: #fff;
  line-height: 40px;
  cursor: pointer;
}
</style>