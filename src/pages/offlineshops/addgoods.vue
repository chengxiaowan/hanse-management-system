<template>
  <div class="addgoods">
    <el-page-header @back="goback" content="添加商品"></el-page-header>
    <el-divider></el-divider>
    <div class="addgoods-title">
      <div>说明：</div>
      <p>
        1、销售价取自商品的最低销售价。
        <br />2、申请加入后的商品，需由门店对应的品牌方审核设置佣金比例等。
      </p>
    </div>
    <div class="addgoods-soso">
      <div class="keywords">
        <el-input class="text" placeholder="请输入商品名称" v-model="keywords"></el-input>
      </div>
      <div class="type">
        分类：
        <div class="sele-box">
          <el-select v-model="type" filterable placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="item in types"
              :key="item.typeId"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="getlist()" size="small">搜索</el-button>
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
                <span @click="addgoods(item)">申请加入</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="6">没有相关数据</td>
          </tr>
        </tbody>
      </table>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
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
      commissionPercent: "",
      rolelist: "",
      dialogVisible: false,
      commissionPercent: "",
      goodsId: "",
      brandcom: "",
      total: "",
      pageNo: "",
      types: ""
    };
  },
  methods: {
    //返回
    goback() {
      console.log("ok");
      sessionStorage.setItem("table2", "goods");
      history.go(-1);
    },

    //获取角色列表以便于创建动态输入框
    getrole() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId")
      };
      this.$post("/shops/shopsRoleList", parmars).then(res => {
        if (res.error == "00") {
          this.rolelist = res.result.list;
        }
      });
    },

    //获取待添加列表
    getlist() {
      let parmars = {
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        shopsId: sessionStorage.getItem("shopsId"),
        pageSize: "10",
        auditStatus: 1,
        pageNo: this.pageNo,
        keywords: this.keywords,
        typeName: this.type,
        isOnsell:"1"
      };
      this.$post("/shopsBrand/showAShopsBrandGoods", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    //分页
    page(e) {
      this.pageNo = e;
      this.getlist();
    },
    //add model
    open(item) {
      if (this.dialogVisible == false) {
        this.dialogVisible = true;
        this.goodsId = item.goodsId;
        this.brandcom = item.commissionPercent;
      } else {
        this.dialogVisible = false;
        this.goodsId = "";
        this.brandcom = "";
      }
    },

    //加入商品
    addgoods(item) {
      this.$confirm("您确认加入此商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsId: sessionStorage.shopsId,
            goodsId: item.goodsId
          };
          this.$post("/shops/addShopsGoods", parmars).then(res => {
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
        .catch(() => {});
    },
    //获取商品分类
    getType() {
      let parmars = {
        level: "1",
        pageSize: "100"
      };
      this.$get("/type/dataList", parmars).then(res => {
        if (res.error == "00") {
          this.types = res.result.list;
          console.log(this.types);
        }
      });
    }
  },
  mounted() {
    this.getlist();
    this.getrole();
    this.getType();
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
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(74, 74, 74, 1);
  line-height: 28px;
  margin-bottom: 10px;
}

.addgoods-title > p {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 20px;
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

.el-divider {
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 15px;
}

.sele-box{
  width: 100px;
  display: inline-block;
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

.keywords >>> .el-input__inner {
  height: 35px;
  border-radius: 2px;
}

.sele-box >>> .el-input__inner {
  height: 35px;
  font-size: 12px;
  line-height: 35px;
}
</style>