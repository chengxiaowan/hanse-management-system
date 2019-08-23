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
        <el-button type="primary" @click="getlist()">搜索</el-button>
        <el-button type="success" plain @click="addservice()">添加</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th width="15%">服务名称</th>
            <th width="20%">服务提供商</th>
            <th width="20%">服务位置</th>
            <th width="10%">价格</th>
            <th width="10%">佣金比例（%）</th>
            <th width="10%">预估收益（元）</th>
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
              <td v-if="item.commissionPercent != undefined">{{item.commissionPercent}}</td>
              <td v-else>-</td>
              <td v-if="item.commissionPercent!=undefined">{{item.price*item.commissionPercent/100}}</td>
              <td v-else>-</td>
              <td class="btn-hide">
                <span>查看</span>
                <span @click=" delservice(item)">删除</span>
                <span>二维码</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="10">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "shopservice",
  data() {
    return {
      info: "旅拍管理",
      keywords: "",
      list: ""
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
        pageSize: "100"
      };

      this.$post("/shops/showAShopsService", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        }
      });
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