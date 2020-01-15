<template>
  <div class="goods">
    <div class="addgoods-title">
      <div>说明</div>
      <p>
        1、只有审核成功的已上架的商品才会显示在小程序端。
        <br />2、对于审核通过的商品，请及时设置各销售角色的销售提成比例。
        <br />3、二维码可生成带有门店商品信息的小程序码，微信扫码可直接进入商品详情界面。
      </p>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      info: "新版商品",
      activeName: "first"
    };
  }
};
</script>

<style scoped>
</style>
