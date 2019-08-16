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
    <div class="soso">
      <div class="keywords">
        <el-input type="text" v-model="keywords" placeholder="请输入服务关键字"></el-input>
      </div>
      <el-button type="primary" id="soso" @click="getlist">搜索</el-button>
      <el-button type="success" plain id="soso" @click="addservice()">添加</el-button>
    </div>
    <div class="teb">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="15%">服务名称</th>
            <th width="15%">服务提供商</th>
            <th width="20%">服务位置</th>
            <th width="7%">价格</th>
            <th width="10%">佣金比例（%）</th>
            <th width="10%">预估收益（元）</th>
            <th width="8%">审核状态</th>
            <th width="15%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length > 0">
            <tr v-for="item in list" :key="item.id">
              <td>{{item.serviceName}}</td>
              <td>{{item.photoStudioName}}</td>
              <td>{{item.province}}{{item.city}}</td>
              <td v-if="item.price != undefined">{{item.price}}</td>
              <td v-else>-</td>
              <td v-if="item.auditStatus == 1">{{item.commissionPercent}}</td>
              <td v-else>-</td>
              <td
                v-if="item.auditStatus == 1"
              >{{(item.price*(item.commissionPercent)/100).toFixed(2)}}</td>
              <td v-else>-</td>
              <td v-if="item.auditStatus == 0">待审核</td>
              <td v-if="item.auditStatus == 1">审核成功</td>
              <td v-if="item.auditStatus == 2">
                <em class="failure">审核失败</em>
              </td>
              <td class="btn-hide">
                <span>查看</span>
                <span @click="delservice(item)">删除</span>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="10">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "service",
  data() {
    return {
      info: "品牌服务管理",
      keywords: "",
      list: [],
      shopsBrandId: ""
    };
  },
  methods: {
    //新增服务
    addservice() {
      this.$router.push({
        name: "addService"
      });
    },
    //获取列表
    getlist() {
      let parmars = {
        shopsBrandId: this.shopsBrandId,
        keywords: this.keywords
      };
      this.$post("/shopsBrand/showAShopsBrandService", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        } else {
          this.$message.error("res.msg");
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
            delFlag: "1"
          };
          this.$post("/shopsBrand/deleteAShopsBrandServiceById", parmars).then(
            res => {
              console.log(res);
              if (res.error == "00") {
                this.$message({
                  type: "success",
                  message: "删除服务成功!"
                });
              } else {
                this.$message.error(res.msg);
              }
              this.getlist();
            }
          );
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
    if (sessionStorage.getItem("shopsBrandId")) {
      this.shopsBrandId = sessionStorage.getItem("shopsBrandId");
      this.getlist();
    }
  }
};
</script>

<style scoped>
.service {
  height: 1000px;
  overflow: auto;
}

.service-title {
  background: #e4e9ef;
  padding: 15px;
}
.service-title > div {
  font-size: 20px;
  font-weight: 500;
  color: #4a4a4a;
  padding-bottom: 10px;
}

.service-title > p {
  font-size: 14px;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 20px;
  padding-left: 18px;
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

#soso {
  float: left;
  margin-left: 10px;
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