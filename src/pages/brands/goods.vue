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
        <el-select placeholder="请选择" v-model="solt">
          <el-option
            v-for="item in type"
            :key="item.typeId"
            :label="item.name"
            :value="item.typeId"
          ></el-option>
        </el-select>
      </div>
      <div class="goods-btn">
        <el-button type="primary" @click="getgoods()">搜索</el-button>
        <el-button type="success" @click="open()">添加</el-button>
      </div>
    </div>
    <div class="goods-tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="10%">商品名称</th>
            <th width="10%">分类</th>
            <th width="10%">品牌</th>
            <th width="12%">图片</th>
            <th width="10%">销售价（元）</th>
            <th width="10%">佣金比例（%）</th>
            <th width="10%">预估收益（元）</th>
            <th width="8%">审核状态</th>
            <th width="10%">上下架状态</th>
            <th width="15%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.shopsBrandGoodsId">
              <td>{{item.name}}</td>
              <td>{{item.typeName}}</td>
              <td>{{item.brandName}}</td>
              <td>
                <img :src="item.image" class="img-box" />
              </td>
              <td>{{item.price}}</td>
              <td v-if="item.auditStatus !='1'">-</td>
              <td v-else>{{item.commissionPercent}}</td>
              <td v-if="item.auditStatus !='1'">-</td>
              <td v-else>{{(item.price * (item.commissionPercent/100)).toFixed(2)}}</td>
              <td v-if="item.auditStatus == 0">待审核</td>
              <td v-if="item.auditStatus == 1">审核通过</td>
              <td v-if="item.auditStatus == 2">
                <p style="color: red">审核失败</p>
              </td>
              <td v-if="item.isOnsell == 1 && item.auditStatus == 1">已上架</td>
              <td v-if="item.isOnsell == 0 && item.auditStatus == 1">下架</td>
              <td v-if="item.auditStatus != 1">--</td>
              <td>
                <span>查看</span>
                <span v-if="item.isOnsell == 1 && item.auditStatus == 1">二维码</span>
                <span
                  v-if="item.isOnsell == 1 && item.auditStatus == 1"
                  style="color:red"
                  @click="onsell(item,0)"
                >下架</span>
                <span v-if="item.isOnsell == 0 && item.auditStatus == 1" @click="onsell(item,1)">上架</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
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
      type: [],
      solt: "",
      shopsBrandId: "",
      list: [],
      addlist: [],
      addgoods: 0,
      //简单分页处理
      minpage: "",
      maxpage: "",
      pageNo:"",
      total:"",
    };
  },
  methods: {
    //获取商品列表
    getgoods() {
      let parmars = {
        shopsBrandId: this.shopsBrandId,
        keywords: this.keywords,
        typeId: this.solt,
        pageSize: "10",
        pageNo:this.pageNo
      };
      this.$post("/shopsBrand/shopsBrandGoodsList", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
          this.total = res.result.total;
          // console.log(res.result.total)
        }
      });
    },
    //获取商品分类
    getType() {
      let parmars = {
        level: "1",
        pageSize: "100"
      };
      this.$get("/type/dataList", parmars).then(res => {
        if (res.error == "00") {
          this.type = res.result.list;
          console.log(this.type);
        }
      });
    },
    open() {
      this.$router.push({
        name: "goodsAdd",
        query: {
          shopsBrandGoodsId: this.shopsBrandId
        }
      });
    },
    //商品上下架
    onsell(item, type) {
      let parmars = {
        shopsBrandGoodsId: item.shopsBrandGoodsId,
        isOnsell: type
      };
      if (type == 1) {
        //上架
        this.$confirm("您确认上架此商品？?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post(
              "/shopsBrand/changeShopsBrandGoodsIsOnsell",
              parmars
            ).then(res => {
              console.log(res);
              if (res.error == "00") {
                this.$message({
                  type: "success",
                  message: "上架成功!"
                });
                this.getgoods();
              } else {
                this.$message.error(res.msg);
              }
              this.getgoods();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消上架"
            });
          });
      } else {
        this.$confirm("您确认下架此商品？?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post(
              "/shopsBrand/changeShopsBrandGoodsIsOnsell",
              parmars
            ).then(res => {
              console.log(res);
              if (res.error == "00") {
                this.$message({
                  type: "success",
                  message: "下架成功!"
                });
                this.getgoods();
              } else {
                this.$message.error(res.msg);
              }
              this.getlist();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消下架"
            });
          });
      }
    },
    page(e){
      this.pageNo = e
      this.getgoods()
    }
  },
  mounted() {
    if (sessionStorage.getItem("shopsBrandId")) {
      this.shopsBrandId = sessionStorage.getItem("shopsBrandId");
      this.getgoods();
      this.getType();
    }
  }
};
</script>
<style scoped>
.goods {
  /* height: 1500px; */
  overflow: auto;
  background: #fff;
  padding-bottom: 150px;
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
  height: 1000px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
}

.zhezhao {
  /* height: 100%; */
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.addgoods-box {
  width: 100%;
  /* height: 100%; */
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

.img-box {
  width: 60px;
  height: 60px;
  display: block;
  margin: auto;
}

.addgoods-title > span {
  float: right;
  cursor: pointer;
}

.tips {
  padding: 15px;
}

.addgoods-tab {
  height: 1000px;
  margin-top: 10px;
  padding: 0 15px;
  overflow: auto;
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
  vertical-align: middle;
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