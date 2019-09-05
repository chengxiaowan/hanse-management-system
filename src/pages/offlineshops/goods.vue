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
    <div class="goods-soso">
      <div class="keywords">
        <el-input type="text" placeholder="请输入商品名称" v-model="keywords"></el-input>
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
      <div class="type">
        审核状态：
        <div class="sele-box">
          <el-select v-model="audit" filterable placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核失败" value="2"></el-option>
            <el-option label="等待审核" value="0"></el-option>
          </el-select>
        </div>
      </div>
      <div class="type">
        上下架状态：
        <div class="sele-box">
          <el-select v-model="sellType" filterable placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="2"></el-option>
          </el-select>
        </div>
      </div>
      <div class="type">
        <el-button type="primary" @click="getlist" icon="el-icon-search">搜索</el-button>
        <el-button type="success" plain @click="addgoods" icon="el-icon-circle-plus-outline">添加商品</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="15%">商品名称</th>
            <th width="10%">分类</th>
            <th width="15%">图片</th>
            <th width="10%">销售价（元）</th>
            <th width="8%">佣金比例（%）</th>
            <th width="8%">预估收益（元）</th>
            <th width="7%">审核状态</th>
            <th width="7%">上/下架状态</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.shopsGoodsId">
              <td>{{item.name}}</td>
              <td>{{item.typeName}}</td>
              <td>
                <img :src="item.image" alt style="width:60px" />
              </td>
              <td>{{item.price}}</td>
              <td v-if="item.auditStatus == '1'">{{item.commissionPercent}}</td>
              <td v-else>--</td>
              <td
                v-if="item.auditStatus == '1'"
              >{{(item.price * (item.commissionPercent/100)).toFixed(2)}}</td>
              <td v-else>--</td>
              <td v-if="item.auditStatus == '0'">待审核</td>
              <td v-if="item.auditStatus == '1'">审核通过</td>
              <td v-if="item.auditStatus == '2'" style="color:red">审核失败</td>
              <td v-if="item.isOnsell == '1' && item.auditStatus == '1'">已上架</td>
              <td v-if="item.auditStatus == '2' || item.auditStatus == '0'">--</td>
              <td v-if="item.isOnsell == '0' && item.auditStatus == '1'">已下架</td>
              <td>
                <span
                  style="color:red"
                  v-if="item.isOnsell == '1' && item.auditStatus == '1'"
                  @click="nosell(item)"
                >下架</span>
                <span
                  v-if="item.isOnsell == '0' && item.auditStatus == '1'"
                  @click="onsell(item)"
                >上架</span>
                <span @click="ewm(item)" v-if="item.auditStatus == '1'">二维码</span>
                <span @click="open(item)" v-if="item.auditStatus == '1'">设置佣金</span>
                <span
                  @click="delgoods(item)"
                  style="color:red"
                  v-if="item.auditStatus == '0' || item.auditStatus == '2'"
                >删除</span>
                <!-- <span @click="demo(item)">测试</span> -->
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="9">没有相关数据</td>
          </tr>
        </tbody>
      </table>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
      <el-dialog title="设置佣金比例" :visible.sync="dialogVisible" width="30%" center>
        <div class="com">
          店铺提成比例(%)
          <el-input v-model="commissionPercent" disabled></el-input>
        </div>
        <div class="tabs">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>角色</th>
                <th>提成比例(%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in rolelist" :key="item.shopsRoleId">
                <td>{{item.roleName}}</td>
                <td>
                  <div class="kuang">
                    <el-input type="text" placeholder="请输入提成比例%" v-model="item.commissionPercent"></el-input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="set()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-dialog title="二维码" :visible.sync="dialogVisible2" width="30%" center>
      <img :src="ewmimg" v-if="ewmimg" class="ewmimg" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      info: "商品！！",
      keywords: "",
      type: "",
      audit: "",
      onSell: "",
      list: [],
      total: "0",
      pageNo: "",
      rolelist: [],
      dialogVisible: false,
      commissionPercent: "",
      goodsId: "",
      types: "",
      sellType: "",
      //ewm
      dialogVisible2: false,
      ewmimg: ""
    };
  },
  methods: {
    //获取数据
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        pageSize: "10",
        pageNo: this.pageNo,
        keywords: this.keywords,
        audit: this.audit,
        typeName: this.type,
        isOnsell: this.sellType
      };
      this.$post("/shops/showShopsGoods", parmars).then(res => {
        if (res.error == "00") {
          if (res.error == "00") {
            this.list = res.result.list;
            this.total = Number(res.result.total);
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    page(e) {
      this.pageNo = e;
      this.getlist();
    },
    addgoods() {
      this.$router.push({
        name: "addgoods"
      });
    },
    //删除
    delgoods(item) {
      this.$confirm("您确认删除此商品？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            id: item.id,
            tableName: "shops_goods"
          };
          this.$post("/shops/deleteTable", parmars).then(res => {
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "删除商品成功!"
              });
            } else {
              this.$message.error(res.msg);
            }
            this.getlist();
          });
        })
        .catch(() => {});
    },
    //下架
    nosell(item) {
      this.$confirm("您确认下架此商品？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsGoodsId: item.id,
            isOnsell: 0
          };
          this.$post("/shops/changeShopsGoodsIsOnsell", parmars).then(res => {
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "下架商品成功!"
              });
            } else {
              this.$message.error(res.msg);
            }
            this.getlist();
          });
        })
        .catch(() => {});
    },
    //上架
    onsell(item) {
      this.$confirm("您确认上架此商品？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsGoodsId: item.id,
            isOnsell: 1
          };
          this.$post("/shops/changeShopsGoodsIsOnsell", parmars).then(res => {
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "上架商品成功!"
              });
            } else {
              this.$message.error(res.msg);
            }
            this.getlist();
          });
        })
        .catch(() => {});
    },

    //获取角色列表以便于创建动态输入框
    getrole(item) {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId")
      };
      this.$post("/shops/shopsRoleList", parmars).then(res => {
        if (res.error == "00") {
          for (let i = 0; i < res.result.list.length; i++) {
            res.result.list[i].commissionPercent = "";
          }
          this.rolelist = res.result.list;
          this.demo(item)
        }
      });
    },
    open(item) {
      if (this.dialogVisible) {
        this.dialogVisible = false;
      } else {
        this.dialogVisible = true;
        this.commissionPercent = item.commissionPercent;
        this.goodsId = item.id;
        this.getrole(item);
        // this.demo(item);
      }
    },
    //save
    set() {
      // 遍历出数据
      let arr = [];
      for (let i = 0; i < this.rolelist.length; i++) {
        if (
          Number(this.rolelist[i].commissionPercent) >
          Number(this.commissionPercent)
        ) {
          this.$message.error("角色佣金比例不得大于店铺佣金比例");
          return;
        }
        if (this.rolelist[i].commissionPercent) {
          let obj = {};
          obj.shopsRoleId = this.rolelist[i].shopsRoleId;
          obj.commissionPercent = this.rolelist[i].commissionPercent;
          arr.push(obj);
        }
      }
      let parmars = {
        // shopsId: sessionStorage.getItem("shopsId"),
        shopsGoodsId: this.goodsId,
        roleList: JSON.stringify(arr)
        // commissionPercent: this.commissionPercent
      };
      this.$post("/shops/updateAShopsGoodsById", parmars).then(res => {
        if (res.error == "00") {
          this.$message("设置佣金比例成功！");
          this.open();
        } else {
          this.$message.error(res.msg);
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
          this.types = res.result.list;
          console.log(this.types);
        }
      });
    },
    ewm(item) {
      console.log(item);
      let parmars = {
        id:
          "goodsId=" +
          item.goodsId +
          ",relateId=" +
          sessionStorage.getItem("shopsId") +
          ",type=1",
        page: "pages/goodsDetail/goodsDetail"
      };
      this.$post("/weixin/getwxTwoEconde", parmars).then(res => {
        if (res.error == "00") {
          this.dialogVisible2 = true;
          this.ewmimg = res.result;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    demo(item) {
      let parmars = {
        id: item.id
      };
      this.$post("/shops/showShopsGoodsCommissionPercent", parmars).then(
        res => {
          if (res.error == "00" && res.result.roleList.length != 0) {
            for (let i = 0; i < this.rolelist.length; i++) {
              for (let j = 0; j < res.result.roleList.length; j++) {
                if (
                  this.rolelist[i].shopsRoleId ==
                  res.result.roleList[j].shopsRoleId
                ) {
                  this.rolelist[i].commissionPercent =
                    res.result.roleList[j].commissionPercent;
                  console.log(res.result.roleList[j].commissionPercent);
                }
              }
            }
          }
        }
      );
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
.goods {
  height: 1100px;
  /* overflow: auto; */
  padding: 15px;
  padding-bottom: 150px;
}

.goods-soso {
  width: 100%;
  overflow: hidden;
}

.keywords {
  width: 267px;
  float: left;
}

.type {
  float: left;
  margin-left: 10px;
}

.tape > .el-select {
  width: 50px;
}

.tab {
  margin-top: 15px;
}

.el-dropdown-link {
  margin-left: 10px;
}

.com {
  width: 500px;
  margin: 0 auto;
}

.tabs {
  margin: 0 auto;
  margin-top: 10px;
  width: 500px;
}

.sele-box {
  display: inline-block;
  width: 100px;
}

.kuang {
  width: 150px;
  margin: 0 auto;
}

.ewmimg {
  display: block;
  width: 150px;
  height: 150px;
  margin: 20px auto;
}

.addgoods-title {
  background: #e4e9ef;
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
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