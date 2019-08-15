<template>
  <div class="goods">
    <div class="goods-title">
      <div>说明</div>
      <p>
        1、佣金比例即商家与我方签订的商品总的佣金比例。
        <br />2、预估收益即通过商家渠道售卖商品后，商家能得到的预计总收益，具体以实际为准。
        <br />3、二维码可生成带有酒店/民宿品牌信息的小程序码，微信扫码可直接进入商品详情界面。
      </p>
    </div>
    <div class="soso-goods">
      <div class="goods-keywords">
        <el-input type="text" v-model="keywords" placeholder="请输入关键字"></el-input>
      </div>
      <div class="lei">
        分类
        <el-select placeholder="请选择">
          <el-option></el-option>
        </el-select>
      </div>
      <div class="goods-btn">
        <el-button type="primary">搜索</el-button>
        <el-button type="success" @click="addgoods()">添加</el-button>
      </div>
    </div>
    <div class="goods-tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="15%">商品名称</th>
            <th width="10%">分类</th>
            <th width="10%">品牌</th>
            <th width="12%">图片</th>
            <th width="10%">销售价（元）</th>
            <th width="10%">佣金比例（%）</th>
            <th width="10%">预估收益（元）</th>
            <th width="8%">审核状态</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>沙发垫子</td>
            <td>沙发</td>
            <td>施华洛世奇</td>
            <td>图片</td>
            <td>999</td>
            <td>888</td>
            <td>50%</td>
            <td>444</td>
            <td>
              <span>查看</span>
              <span>二维码</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 模态框 -->
    <!-- 新增的模态框 -->
    <div class="addgoods" v-if="add">
      <div class="zhezhao"></div>
      <div class="addgoods-box">
        <div class="addgoods-title">
          <div class="titlefont">添加商品</div>
          <span @click="addgoods()">X</span>
        </div>
        <div class="tips">
          <div class="goods-title">
            <div>说明</div>
            <p>
              1、销售价取自商品的最低销售价。
              <br />2、点击加入可将商品加入销售，列表里多选商品点击批量加入可以将多个商品加入销售。
            </p>
          </div>
        </div>
        <div class="soso-goods">
          <div class="goods-keywords" style="margin-left:15px;">
            <el-input type="text" v-model="keywords" placeholder="请输入关键字"></el-input>
          </div>
          <div class="lei">
            分类
            <el-select placeholder="请选择">
              <el-option></el-option>
            </el-select>
          </div>
          <div class="goods-btn">
            <el-button type="primary">搜索</el-button>
            <el-button type="success">添加</el-button>
          </div>
        </div>
        <div class="addgoods-tab">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th width="20%">商品名称</th>
                <th width="10%">分类</th>
                <th width="10%">品牌</th>
                <th width="15%">图片</th>
                <th width="10%">销售价（元）</th>
                <th width="10%">佣金比例（%）</th>
                <th width="10%">预估收益（元）</th>
                <th width="20%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>item.name</td>
                <td>item.typeName</td>
                <td>item.brandName</td>
                <td>
                  <!-- <img src="item.image"/> -->
                  ???
                </td>
                <td>item.price</td>
                <td>5</td>
                <td>(item.price * 0.05).toFixed(2)</td>
                <td class="btn-hide">
                  <span>加入</span>
                  <span>删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      info: "商品管理",
      keywords: "",
      shopsBrandId: "",
      list: [],
      addlist:[],
      add:false,
    };
  },
  methods: {
    //获取商品列表
    getgoods() {
      let parmars = {
        shopsBrandId: this.shopsBrandId
      };
      this.$post("/shopsBrand/shopsBrandGoodsList", parmars).then(res => {
        console.log(res);
      });
    },

    //模态框打开关闭
    addgoods(){
      if(this.add == false){
        this.add = true;
      }else{
        this.add = false;
      }
    },
    //获取未添加的商品列表
    getAllgoods(){
      this.$post('/goods/dataList3').then(res=>{
        console.log(res)
      })
    }
  },
  mounted() {
    if (sessionStorage.getItem("shopsBrandId")) {
      this.shopsBrandId = sessionStorage.getItem("shopsBrandId");
      this.getgoods();
    }
    this.getAllgoods()
  }
};
</script>
<style scoped>
.goods {
  height: 100vh;
}

.goods-title {
  background: #e4e9ef;
  border-radius: 4px;
  padding: 15px;
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
  line-height: 20px;
  padding-left: 14px;
}

.soso-goods {
  overflow: hidden;
  margin-top: 28px;
}

.goods-keywords {
  width: 267px;
  float: left;
}

.lei {
  float: left;
  margin-left: 14px;
}

.goods-btn {
  float: left;
  margin-left: 10px;
}

.goods-tab {
  margin-top: 10px;
}

.addgoods {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.zhezhao {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.addgoods-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  border: 1px solid #333;
}

.addgoods-title {
  width: 100%;
  height: 50px;
  background: #444a63;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 16px;
  line-height: 50px;
  color: #fff;
}
.addgoods-title > div {
  float: left;
}

.addgoods-title > span {
  float: right;
  cursor: pointer;
}

.tips {
  padding: 15px;
}

.addgoods-tab{
  margin-top: 10px;
  padding: 0 15px;
}

/*表格样式*/

/*去掉表头边框+背景*/
th {
  border: 1px solid transparent !important;
  background: #e4e9ef;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #5b5b5b;
}

td {
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #5b5b5b;
}

td > span {
  margin-left: 14px;
  color: #4a90e2;
  display: none;
  cursor: pointer;
}

tr:hover > td > span {
  display: inline;
}
</style>