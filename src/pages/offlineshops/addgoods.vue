<template>
  <div class="addgoods">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <div class="addgoods-title">
      <div>说明：</div>
      <p>
        1、销售价取自商品的最低销售价。
        <br />2、点击加入可将商品加入销售，列表里多选商品点击批量加入可以将多个商品加入销售。
      </p>
    </div>
    <div class="addgoods-soso">
      <div class="keywords">
        <el-input class="text" placeholder="请输入商品名称" v-model="keywords"></el-input>
      </div>
      <div class="type">
        分类：
        <el-select v-model="type" filterable placeholder="请选择">
          <el-option label="全部" value></el-option>
        </el-select>
      </div>
      <div class="price">
        <el-input class="price-input" v-model="minp" placeholder="最低价"></el-input>
      </div>
      <div class="xian">-</div>
      <div class="price">
        <el-input class="price-input" v-model="maxp" placeholder="最高价"></el-input>
      </div>
    </div>
    <div class="tab">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th width="30%">商品名称</th>
            <th width="10%">分类</th>
            <th width="20%">品牌</th>
            <th width="10%">图片</th>
            <th width="10%">销售价</th>
            <th width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length !='0' ">
            <tr v-for="item in list" :key="item.goodsId">
              <td>{{item.name}}</td>
              <td>{{item.typeName}}</td>
              <!--<td>{{item.supplierName}}</td>-->
              <td>{{item.brandName}}</td>
              <td>
                <img :src="item.image" style="width: 60px" />
              </td>
              <td>{{item.price}}</td>
              <td>
                <span @click="addgoods()">加入</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="6">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "addgoods",
  data() {
    return {
      info: "门店商品添加",
      type: "",
      keywords: "",
      maxp: "",
      minp: "",
      list: [],
      commissionPercent:"10"
    };
  },
  methods: {
    //返回
    goback() {
      console.log("ok");
    },

    //获取待添加列表
    getlist() {
      let parmars = {
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        shopsId: sessionStorage.getItem("shopsId"),
        pageSize: "100",
        auditStatus: 1,
        keywords: this.keywords,
        typeName: this.type,
        minPrice: this.minp,
        maxPrice: this.maxp
      };
      this.$post("/shopsBrand/showAShopsBrandGoods", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        }
      });
    },
    //加入商品
    addgoods(item) {
      this.$confirm("您确加入此商品？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            goodsId: item.goodsId,
            shopsId: sessionStorage.getItem('shopsId'),
            commissionPercent: that.commissionPercent
          };
          this.$post("/shopsBrand/del", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "加入商品成功!"
              });
            } else {
              this.$message.error(res.msg);
            }
            this.getlist();
          });
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
    this.getlist();
  }
};
</script>

<style scoped>
.addgoods {
  padding: 15px;
  height: 1000px;
  padding-bottom: 150px;
  overflow: auto;
  background: #fff;
}

.addgoods-title {
  background: #e4e9ef;
  width: 100%;
  margin-top: 30px;
  padding: 15px;
  border-radius: 4px;
}

.addgoods-title > div {
  font-size: 20px;
  font-weight: 600;
  color: #4a4a4a;
}

.addgoods-title > p {
  font-weight: 14px;
  line-height: 2em;
  font-weight: 400;
}

.addgoods-soso {
  overflow: hidden;
  margin-top: 20px;
}

.keywords {
  width: 200px;
  float: left;
  margin-right: 10px;
}

.type {
  float: left;
  margin-right: 10px;
}

.xian {
  float: left;
  font-size: 16px;
  color: #333;
  margin-right: 10px;
  line-height: 40px;
}

.price {
  float: left;
  margin-right: 10px;
  width: 80px;
}

.tab {
  margin-top: 20px;
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