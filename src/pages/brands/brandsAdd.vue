<template>
  <div class="brandsadd">
    <el-page-header @back="goBack" content="添加品牌"></el-page-header>
    <div class="add-body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <v-info></v-info>
        </el-tab-pane>
        <el-tab-pane label="负责人信息" name="second">
          <v-personnel></v-personnel>
        </el-tab-pane>
        <el-tab-pane label="商品信息" name="third">
          <v-goods></v-goods>
        </el-tab-pane>
        <el-tab-pane label="服务信息" name="fourth">
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
/*页头*/
.el-page-header {
  height: 60px;
  line-height: 60px;
}
.brandsadd {
  background: #fff;
  padding: 15px;
  height: 100vh;
}
.el-tabs {
  margin-top: 5px;
}
/* .el-tab-pane{
} */
</style>