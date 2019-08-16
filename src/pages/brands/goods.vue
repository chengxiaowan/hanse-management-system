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
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.shopsBrandGoodsId">
              <td>{{item.name}}</td>
              <td>{{item.typeName}}</td>
              <td>{{item.brandName}}</td>
              <td>
                <img :src="item.image" alt class="img-box" />
              </td>
              <td>{{item.price}}</td>
              <td>{{item.commissionPercent}}</td>
              <td>{{item.price * item.commissionPercent}}</td>
              <td>{{item.auditStatus}}</td>
              <td>
                <span>查看</span>
                <span>二维码</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- 模态框 -->
    <!-- 新增的模态框 -->
    <div class="addgoods" v-if="addgoods">
      <div class="zhezhao"></div>
      <div class="addgoods-box">
        <div class="addgoods-title">
          <div class="titlefont">添加商品</div>
          <span @click="open()">X</span>
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
            <el-select placeholder="请选择" v-model="solt">
              <el-option label="" value=""></el-option>
              <el-option
                v-for="item in type"
                :key="item.typeId"
                :label="item.name"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </div>
          <div class="goods-btn">
            <el-button type="primary" @click="getAllgoods()">搜索</el-button>
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
              <tr v-for="item in addlist" :key="item.goodsId">
                <td>{{item.name}}</td>
                <td>{{item.typeName}}</td>
                <td>{{item.brandName}}</td>
                <td>
                  <img :src="item.image" class="img-box" />
                </td>
                <td>{{item.price}}</td>
                <td>5</td>
                <td>{{(item.price * 0.05).toFixed(2)}}</td>
                <td class="btn-hide">
                  <span @click="addgoodsinbrand(item)">加入</span>
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
      type: [],
      solt: "",
      shopsBrandId: "",
      list: [],
      addlist: [],
      addgoods: 0,
      //简单分页处理
      minpage: "",
      maxpage: ""
    };
  },
  methods: {
    //获取商品列表
    getgoods() {
      let parmars = {
        shopsBrandId: this.shopsBrandId,
        keywords: this.keywords,
        typeId: this.solt,
      };
      this.$post("/shopsBrand/shopsBrandGoodsList", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        }
      });
    },

    //模态框打开关闭
    open() {
      if (this.addgoods == 0) {
        this.addgoods = 1;
      } else if (this.addgoods == 1) {
        this.addgoods = 0;
        this.getgoods();
      }
    },
    //获取未添加的商品列表
    getAllgoods() {
      let parmars = {
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        keywords: this.keywords,
        typeId: this.solt,
        skipType: 1
      };
      this.$post("/goods/dataList3", parmars).then(res => {
        if (res.error == "00") {
          this.addlist = res.result.list;
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
    //添加商品
    addgoodsinbrand(item) {
      this.$confirm("您确认加入此商品？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsBrandId: this.shopsBrandId,
            goodsList: item.goodsId
          };
          this.$post("/shopsBrand/batchAddShopsBrandGoodsList", parmars).then(
            res => {
              console.log(res);
              if (res.error == "00") {
                this.$message({
                  type: "success",
                  message: "加入商品成功!"
                });
              } else {
                this.$message.error(res.msg);
              }
              this.getAllgoods();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消加入"
          });
        });
    }
  },
  mounted() {
    if (sessionStorage.getItem("shopsBrandId")) {
      this.shopsBrandId = sessionStorage.getItem("shopsBrandId");
      this.getgoods();
      this.getType();
    }
    this.getAllgoods();
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
  margin:auto;
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