<template>
  <div class="brandsadd">
    <el-page-header @back="goBack" content="品牌详情"></el-page-header>
    <!-- 各种丑，涮了 不要了 -->
    <!-- <el-divider></el-divider> -->
    <div class="add-body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <v-info></v-info>
        </el-tab-pane>
        <el-tab-pane label="门店负责人" name="second">
          <v-personnel></v-personnel>
        </el-tab-pane>
        <el-tab-pane label="商品信息" name="third">
          <v-goods></v-goods>
        </el-tab-pane>
        <el-tab-pane label="周边服务" name="fourth">
          <v-service></v-service>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
//这个tab的的页面都是组件，Vue真香
import brandinfo from "./info";
import personnel from './personnel'
import goods from './goods'
import service from './service'
export default {
  name: "brandsadd",
  components: {
    "v-info": brandinfo,
    "v-personnel":personnel,
    "v-goods":goods,
    "v-service":service
  },
  data() {
    return {
      info: "创建品牌",
      activeName: "first"
    };
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.push({
        name:"brand"
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted(){
    let table = sessionStorage.getItem('table')
    if(table){
      this.activeName = table
    }
    console.log(table)
  }
};
</script>

<style scoped>

.brandsadd{
  overflow: auto;
}
/*页头*/
.el-page-header {
  height: 45px;
  line-height: 45px;
}
.brandsadd {
  background: #fff;
  /* padding: 15px; */
  /* height: 100vh; */
}
.el-tabs {
  margin-top: 5px;
}
/* .el-tab-pane{
} */

.el-divider{
  margin:0 auto;
}

.add-body{
  padding: 0 20px;
}
</style>