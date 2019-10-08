<template>
  <div class="addgoods">
    <el-page-header @back="goBack" content="添加商品"></el-page-header>
    <el-divider></el-divider>
    <div class="max-box">
      <div class="addgoods-title">
        <div>说明</div>
        <p>
          1、销售价取自商品的最低销售价。
          <br />2、预估佣金比例即商家预计能得到的佣金比例，具体以实际佣金比例为准。
          <br />3、预估收益即通过商家渠道售卖商品后，商家能得到的预计收益，具体以实际为准。
          <br />4、申请加入商品后，需由我方审核后才能上架。
        </p>
      </div>
      <div class="soso">
        <div class="keywords">
          <el-input type="text" v-model="keywords" placeholder="请输入商品名称"></el-input>
        </div>
        <div class="lei">
          分类
          <div class="sele-box">
            <el-select placeholder="请选择" v-model="solt">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in type"
                :key="item.typeId"
                :label="item.name"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </div>
        </div>
        <el-button type="primary" id="soso" @click="getAllgoods()" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="tab">
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
              <tr v-for="item in list.list" :key="item.goodsId">
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
                  <span @click="addgoodsinbrand(item)">申请加入</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="list.total"
          @current-change="page"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addgoods",
  data() {
    return {
      shopsBrandId: "",
      info: "品牌商品添加",
      list: {},
      keywords: "",
      solt: "",
      type: [],
      pageNo: ""
    };
  },
  methods: {
    //返回商品页面
    goBack() {
      sessionStorage.setItem("table", "third");
      sessionStorage.setItem("goods-table", "second");
      this.$router.push({
        name: "brandsadd"
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
    //获取未添加的商品列表
    getAllgoods() {
      let parmars = {
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        keywords: this.keywords,
        typeId: this.solt,
        skipType: 1,
        pageNo: this.pageNo
      };
      this.$post("/goods/dataList3", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result;
        }
      });
    },
    //添加商品
    addgoodsinbrand(item) {
      console.log(item);
      this.$confirm("是否确定加入该商品？?", "提示", {
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
          console.log("1");
        });
    },
    page(e) {
      this.pageNo = e;
      this.getAllgoods();
    }
  },
  mounted() {
    this.shopsBrandId = sessionStorage.getItem("shopsBrandId");
    this.getType();
    this.getAllgoods();
  }
};
</script>

<style scoped>
.addgoods {
  height: 1000px;
  overflow: scroll;
  /* padding: 15px; */
  padding-bottom: 150px;
  background: #fff;
  padding-top: 0;
}

.el-page-header {
  height: 45px;
  line-height: 45px;
}

.addgoods-title {
  background: #e4e9ef;
  padding: 15px;
  border-radius: 2px;
  margin: 0 10px;
}
.addgoods-title > div {
  font-size: 20px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(74, 74, 74, 1);
  line-height: 28px;
  padding-bottom: 10px;
}

.addgoods-title > p {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 24px;
  margin-left: 10px;
}

.soso {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.keywords {
  float: left;
  width: 260px;
}

.lei {
  float: left;
  margin-left: 10px;
}

#soso {
  float: left;
  margin-left: 10px;
}

.img-box {
  width: 60px;
}

.el-page-header {
  border-radius: 2px;
}

.sele-box {
  width: 100px;
  display: inline-block;
}

.el-divider {
  margin: 0 auto;
  margin-bottom: 20px;
}

.max-box{
  padding:0 15px;
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