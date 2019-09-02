<template>
  <div class="service">
    <div class="service-title">
      <div>说明</div>
      <p>
        1、服务位置即服务覆盖的省市。
        <br />2、佣金比例即商家与我方签订的商品的总佣金比例。
        <br />3、预估收益即通过商家渠道售卖商品后，商家能得到的预计总收益，具体以实际为准。
      </p>
    </div>
    <div class="service-soso">
      <div class="keywords">
        <el-input placeholder="请输入服务名称" v-model="keywords"></el-input>
      </div>
      <div class="soso-btns">
        <el-button type="primary" @click="getlist()" icon="el-icon-search">搜索</el-button>
        <el-button
          type="success"
          plain
          @click="addservice()"
          icon="el-icon-circle-plus-outline"
        >添加服务</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th width="15%">服务名称</th>
            <th width="10%">服务提供商</th>
            <th width="10%">服务位置</th>
            <th width="10%">价格</th>
            <th width="10%">佣金比例（%）</th>
            <th width="10%">预估收益（元）</th>
            <th width="10%">审核状态</th>
            <th width="10%">上/下架状态</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.serviceId">
              <td>{{item.serviceName}}</td>
              <td>{{item.photoStudioName}}</td>
              <td>{{item.province}}{{item.city}}</td>
              <td v-if="item.price!=undefined">{{item.price}}</td>
              <td v-else>-</td>
              <td
                v-if="item.commissionPercent != undefined && item.auditStatus == 1"
              >{{item.commissionPercent}}</td>
              <td v-else>--</td>
              <td
                v-if="item.commissionPercent!=undefined && item.auditStatus == 1"
              >{{item.price*item.commissionPercent/100}}</td>
              <td v-else>--</td>
              <td v-if="item.auditStatus == 1">通过</td>
              <td v-if="item.auditStatus == 2" style="color:red">失败</td>
              <td v-if="item.auditStatus == 0">待审核</td>
              <td v-if="item.isOnsell == 1 && item.auditStatus == 1">上架</td>
              <td v-else>--</td>

              <td>
                <span v-if="item.auditStatus == '1'" @click="ewm(item)">二维码</span>
                <span v-if="item.auditStatus == 1 && item.isOnsell == 0" @click="onsell(item)">上架</span>
                <span
                  style="color:red"
                  @click="nosell(item)"
                  v-if="item.auditStatus == 1 && item.isOnsell == 1"
                >下架</span>
                <el-dropdown>
                  <span class="el-dropdown-link">更多</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="item.auditStatus == 1" @click.native="open(item)">设置佣金比例</el-dropdown-item>
                    <el-dropdown-item @click.native="delservice(item)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="10">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
    <el-dialog title="设置佣金比例" :visible.sync="dialogVisible" width="30%" center>
      <div class="com">
        店铺提成比例(%)
        <el-input v-model="commissionPercent" disabled></el-input>
      </div>
      <div class="tabs">
        <table class="table table-hover table-bordered">
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
                <input type="text" placeholder="请输入提成比例%" v-model="item.commissionPercent" />
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
  name: "shopservice",
  data() {
    return {
      info: "旅拍管理",
      keywords: "",
      list: "",
      total: "",
      pageNo: "",
      rolelist: [],
      dialogVisible: false,
      commissionPercent: "",
      serviceId: "",
      //ewm
      dialogVisible2: false,
      ewmimg:""
    };
  },
  methods: {
    addservice() {
      this.$router.push({
        name: "addshopsservice"
      });
    },
    //获取数据
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        keywords: this.keywords,
        pageSize: "10"
      };

      this.$post("/shops/showAShopsService", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
          this.total = res.result.total;
        }
      });
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

    //fenye
    page(e) {
      this.pageNo = e;
      this.getlist();
    },
    //删除服务
    delservice(item) {
      this.$confirm("您确认删除此服务？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            id: item.id,
            tableName: "shops_service"
          };
          this.$get("/shops/deleteTable", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "删除服务!"
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
            message: "取消删除"
          });
        });
    },
    //下架
    nosell(item) {
      this.$confirm("您确认下架此服务？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsServicesId: item.id,
            isOnsell: 0
          };
          this.$post("/shops/changeShopsServiceIsOnsell", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "下架服务成功!"
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
            message: "取消删除"
          });
        });
    },
    //上架
    onsell(item) {
      let parmars = {
        shopsServicesId: item.id,
        isOnsell: 1
      };
      this.$post("/shops/changeShopsServiceIsOnsell", parmars).then(res => {
        if (res.error == "00") {
          this.$message("上架服务成功！");
          this.getlist();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    open(item) {
      if (this.dialogVisible) {
        this.dialogVisible = false;
      } else {
        this.dialogVisible = true;
        this.commissionPercent = item.commissionPercent;
        this.serviceId = item.id;
        this.getrole();
      }
    },
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
        shopsServiceId: this.serviceId,
        roleList: JSON.stringify(arr)
        // commissionPercent: this.commissionPercent
      };
      this.$post("/shops/updateAShopsServiceById", parmars).then(res => {
        if (res.error == "00") {
          this.$message("设置佣金比例成功！");
          this.open();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ewm(item) {
      console.log(item);
      let parmars = {
        id:
          "serviceId=" +
          item.serviceId +
          ",relateId=" +
          sessionStorage.getItem("shopsId") +
          ",type=1",
        page: "pages/clap/clap"
      };
      this.$post("/weixin/getwxTwoEconde", parmars).then(res => {
        if (res.error == "00") {
          this.dialogVisible2 == true;
          this.ewmimg == res.result;
        }else{
          this.$message.error(res.msg)
        }
      });
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style scoped>
.service {
  padding: 15px;
  height: 1000px;
  padding-bottom: 150px;
  overflow: auto;
  background: #fff;
}

.service-title {
  background: #e4e9ef;
  width: 100%;
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

.service-soso {
  overflow: hidden;
  margin-top: 20px;
}

.keywords {
  width: 260px;
  float: left;
  margin-right: 10px;
}

.soso-btns {
  float: left;
}

.tab {
  margin-top: 20px;
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

.ewmimg {
  display: block;
  width: 150px;
  height: 150px;
  margin: 20px auto;
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

td > div {
  display: none;
}

tr:hover > td > div {
  display: inline;
  margin-left: 5px;
  color: #4a90e2;
}
</style>