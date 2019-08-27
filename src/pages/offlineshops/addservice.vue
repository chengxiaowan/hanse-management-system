<template>
  <div class="addservice">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
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
        <el-input placeholder="请输入服务名称"></el-input>
      </div>
      <div class="soso-btns">
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th width="20%">服务名称</th>
            <th width="20%">服务提供商</th>
            <th width="20%">服务位置</th>
            <th width="20%">价格</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.serviceId">
              <td>{{item.serviceName}}</td>
              <td>{{item.photoStudioName}}</td>
              <td>{{item.province}}{{item.city}}</td>
              <td>{{item.price}}</td>
              <td class="btn-hide">
                <!--<a class="btn btn-success" title="查看" @click="view(item.serviceId);">查看</a>-->
                <span @click="open(item)">加入</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="7">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <div class="mony">
        请设置店铺佣金比例
        <el-input v-model="commissionPercent"></el-input>
      </div>
      <table class="com table table-bordered table-hover">
        <thead>
          <tr>
            <th>门店角色</th>
            <th>佣金比例（%）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in rolelist" :key="item.shopsRoleId">
            <td>{{item.roleName}}</td>
            <td>
              <div class="com-input">
                <el-input v-model="item.commissionPercent" placeholder="请输入佣金比例"></el-input>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addservice()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "addshopsservice",
  data() {
    return {
      info: "店铺服务添加",
      keywords: "",
      list: [],
      commissionPercent: "",
      rolelist: "",
      dialogVisible: false,
      commissionPercent: "",
      goodsId: "",
      brandcom: "",
      serviceId: ""
    };
  },
  methods: {
    goBack() {
      sessionStorage.setItem("table2","service")
      history.go(-1);
    },
    //获取未加入的服务列表
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        keywords: this.keywords
      };
      this.$post("/shopsBrand/showAShopsBrandService", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
          console.log(res);
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

    //加入服务{}
    addservice() {
      if (this.commissionPercent == "") {
        this.$message("请输入店铺提成比例");
        return;
      } else if (Number(this.commissionPercent) > Number(this.brandcom)) {
        this.$message.error("店铺提成比例不得大于品牌提成比例");
        return;
      }
      let list = [];
      for (let i = 0; i < this.rolelist.length; i++) {
        let obj = {};
        if (
          this.rolelist[i].commissionPercent &&
          Number(this.rolelist[i].commissionPercent) <
            Number(this.commissionPercent)
        ) {
          obj.shopsRoleId = this.rolelist[i].shopsRoleId;
          obj.commissionPercent = this.rolelist[i].commissionPercent;
          list.push(obj);
        } else {
          this.$message.error("角色提成比例不得大于店铺提成比例");
          return;
        }
      }
      let parmars = {
        shopsId: sessionStorage.shopsId,
        serviceId: this.serviceId,
        roleList: JSON.stringify(list) || []
      };
      this.$post("/shops/addShopsService", parmars).then(res => {
        if (res.error == "00") {
          this.$message("加入商品成功");
          this.open();
          this.getlist();
        }
      });
    },
    //add model
    open(item) {
      if (this.dialogVisible == false) {
        this.dialogVisible = true;
        this.serviceId = item.serviceId;
        this.brandcom = item.commissionPercent;
      } else {
        this.dialogVisible = false;
        this.goodsId = "";
        this.brandcom = "";
      }
    }
  },
  mounted() {
    this.getlist();
    this.getrole()
  }
};
</script>

<style scoped>
.addservice {
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
  margin-top: 10px;
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
.com {
  width: 500px;
  margin: 0 auto;
  margin-top: 15px;
}

.com-input {
  width: 120px;
  display: inline-block;
}
.mony {
  width: 500px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0 auto;
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