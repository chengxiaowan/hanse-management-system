<template>
  <div class="shopsinfo">
    <el-page-header @back="goBack()" content="店铺详情"></el-page-header>
    <div class="add-body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="店铺全景" name="info">
          <v-info></v-info>
        </el-tab-pane>
        <el-tab-pane label="人员信息" name="pop">
          <v-pop></v-pop>
        </el-tab-pane>
        <el-tab-pane label="商品信息" name="goods">
          <v-goods></v-goods>
        </el-tab-pane>
        <el-tab-pane label="服务信息" name="service">
          <v-service></v-service>
        </el-tab-pane>
        <el-tab-pane label="房间信息" name="room">
          <v-room></v-room>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import addShops from "./addShops";
import pop from "./pop";
import goods from "./goods";
import shopsservice from './service'
import room from './room'
export default {
  name: "shopsinfo",
  components: {
    "v-info": addShops,
    "v-pop": pop,
    "v-goods":goods,
    "v-service":shopsservice,
    "v-room":room
  },
  data() {
    return {
      info: "门店详情",
      activeName: "service"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    goBack() {
      console.log("go back");
      this.$router.push({
        name: "offlineshop"
      });
    }
  },
  mounted(){
    if(sessionStorage.getItem("shopsId")){
      console.log("读取信息")
    }
  }
};
</script>
<style scoped>
.shopsinfo {
  background: #fff;
  height: 100Vh;
}

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
</style>
    
