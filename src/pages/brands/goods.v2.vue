<template>
  <div class="goodsv2">
    <div class="goods-title">
      <div>说明</div>
      <p>
        1、佣金比例即商家与我方签订的商品总的佣金比例。
        <br />2、预估收益即通过商家渠道售卖商品后，商家能得到的预计总收益，具体以实际为准。
        <br />3、二维码可生成带有门店品牌信息的小程序码，微信扫码可直接进入商品详情界面。
      </p>
    </div>
    <div class="goods-body">
      <el-tabs v-model="activeName">
        <el-tab-pane label="自营商品" name="first">
          <v-owngoods></v-owngoods>
        </el-tab-pane>
        <el-tab-pane label="平台商品" name="second">
          <v-goods></v-goods>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import goods from "./goods";
import owngoods from "./owngoods";
export default {
  components: {
    "v-goods": goods,
    "v-owngoods": owngoods
  },
  name: "goodsV2",
  data() {
    return {
      info: "新版goods",
      activeName: "first"
    };
  }
};
</script>
<style scoped>
.goodsv2 {
  /* height: 5000px; */
}

.goods-title {
  background: #e4e9ef;
  border-radius: 4px;
  padding: 15px;
  margin: 0 10px;
}

.goods-title > div {
  font-size: 20px;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 10px;
}
.goods-title > p {
  font-size: 14px;
  color: #4a4a4a;
  line-height: 24px;
  padding-left: 14px;
}

.goods-body {
  margin-top: 50px;
}

.goods-body >>> .el-tabs__header {
  margin-bottom: 0;
}
</style>