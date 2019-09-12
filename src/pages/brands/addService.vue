<template>
  <div class="addService">
    <el-page-header @back="goBack" content="添加服务"></el-page-header>
    <el-divider></el-divider>
    <div class="max-box">
      <div class="service-title">
        <div>说明</div>
        <p>
          1、服务位置即服务覆盖的省市。
          <br />2、佣金比例即商家与我方签订的商品的总佣金比例。
          <br />3、预估收益即通过商家渠道售卖商品后，商家能得到的预计总收益，具体以实际为准。
          <br />4、申请加入服务后，需由我方审核后才能上架。
        </p>
      </div>
      <div class="soso">
        <div class="keywords">
          <el-input type="text" v-model="keywords" placeholder="请输入服务名称"></el-input>
        </div>
        <el-button type="primary" id="soso" @click="getlist()">搜索</el-button>
      </div>
      <div class="tab">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th width="20%">名称</th>
              <th width="20%">服务位置</th>
              <th width="10%">类型</th>
              <th width="10%">价格</th>
              <th width="10%">佣金比例（%）</th>
              <th width="10%">预估收益</th>
              <th width="20%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.serviceId">
              <td>{{item.serviceName}}</td>
              <td>{{item.province}} {{item.city}}</td>
              <td v-if="item.type == 1">定值</td>
              <td v-else>团购</td>
              <td>{{item.price}}</td>
              <td>5</td>
              <td>{{(item.price*0.05).toFixed(2)}}</td>
              <td>
                <!-- <span>查看</span> -->
                <span @click="addservice(item)">申请加入</span>
              </td>
            </tr>
          </tbody>
        </table>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addServe",
  data() {
    return {
      info: "品牌服务添加",
      shopsBrandId: "",
      list: "",
      keywords: "",
      total: "",
      pageNo: ""
    };
  },
  methods: {
    //返回
    goBack() {
      sessionStorage.setItem("table", "fourth");
      this.$router.push({
        name: "brandsadd"
      });
    },
    //获取全部未添加服务
    getlist() {
      let parmars = {
        keywords: this.keywords,
        shopsBrandId: this.shopsBrandId,
        pageSize: "10",
        pageNo: this.pageNo
      };
      this.$post("/shopsBrand/showShopsBrandService", parmars).then(res => {
        this.list = res.result.list;
        this.total = res.result.total;
      });
    },
    //加入服务
    addservice(item) {
      this.$confirm("您确认加入此服务？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsBrandId: this.shopsBrandId,
            serviceId: item.serviceId
          };
          this.$post("/shopsBrand/addShopsBrandService", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "加入服务成功!"
              });
            } else {
              this.$message.error(res.msg);
            }
            this.getlist();
          });
        })
        .catch(() => {});
    },
    page(e) {
      this.pageNo = e;
      this.getlist();
    },
    //时间格式化
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000 var date = new Date(timestamp*1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  mounted() {
    this.shopsBrandId = sessionStorage.getItem("shopsBrandId");
    this.getlist();
  }
};
</script>

<style scoped>
.addService {
  /* padding: 15px; */
  height: 1000px;
  overflow: auto;
  background: #fff;
  padding-top: 0;
}

.service-title {
  background: #e4e9ef;
  padding: 15px;
  border-radius: 2px;
  margin: 0 10px;
}

.service-title > div {
  font-size: 20px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(74, 74, 74, 1);
  line-height: 28px;
  padding-bottom: 10px;
}

.service-title > p {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 24px;
  margin-left: 18px;
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

.el-divider {
  margin: 0 auto;
  margin-bottom: 20px;
}

.max-box{
  padding: 0 15px;
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