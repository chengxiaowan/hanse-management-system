<template>
  <div class="offlineshop">
    <div class="shops-title">
      <div>说明</div>
      <p>1、二维码可生成带有门店信息的小程序码。</p>
    </div>
    <div class="soso">
      <div class="keywords">
        <el-input type="text" placeholder="请输入门店名称" v-model="keywords"></el-input>
      </div>
      <div class="sele">
        <span class="zi">类型</span>
        <el-select v-model="type" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="酒店" value="1"></el-option>
          <el-option label="民宿" value="2"></el-option>
        </el-select>
      </div>
      <div class="sele">
        <span class="zi">审核状态</span>
        <el-select v-model="audit" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="待审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核失败" value="2"></el-option>
        </el-select>
      </div>
      <div class="soso-btn">
        <el-button type="primary" @click="getList()" icon="el-icon-search">搜索</el-button>
        <el-button type="success" @click="add()" icon="el-icon-circle-plus-outline">新增</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="30%">门店名称</th>
            <!-- <th width="10%">联系电话</th> -->
            <th width="10%">类型</th>
            <!--<th width="20%">店铺标签</th>-->
            <!--<th width="10%">营业时间</th>-->
            <th width="30%">地址</th>
            <th width="10%">审核状态</th>
            <!--<th width="10%">创建时间</th>-->
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.shopsId">
              <td>
                <a @click="view(item);">{{item.shopsName}}</a>
              </td>
              <!-- <td>{{item.phone}}</td> -->
              <td>{{item.shopsType=='1'?'酒店':'民宿'}}</td>
              <!--<td>{{item.labels}}</td>-->
              <!--<td>{{item.businessHours}}</td>-->
              <td>{{item.province}} {{item.city}} {{item.area}} {{item.address}}</td>
              <td v-if="item.status == 0">待审核</td>
              <td v-if="item.status == 1">审核通过</td>
              <td v-if="item.status == 2" style="color:red">审核失败</td>
              <!--<td>{{item.createTime}}</td>-->
              <td>
                <span @click="open(item)">查看</span>
                <span v-if="item.status=='1'" @click="ewm(item)">二维码</span>
                <span style="color:#D0021B" @click="delshpos(item)">删除</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="9">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog title="二维码" :visible.sync="dialogVisible" width="30%" center>
      <img :src="ewmimg" v-if="ewmimg" class="ewmimg" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "offlineshop",
  data() {
    return {
      info: "门店管理",
      keywords: "",
      type: "",
      audit: "",
      list: [],
      dialogVisible: false,
      ewmimg: ""
    };
  },
  methods: {
    //获取列表
    getList() {
      let parmars = {
        keywords: this.keywords,
        shopsType: this.type,
        status: this.audit,
        pageSize: "100"
      };
      this.$post("/shops/dataList", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        } else {
          this.$message.error(res.msg);
        }
        console.log(res);
      });
    },
    //跳转添加界面
    add() {
      sessionStorage.removeItem("shopsId");
      sessionStorage.removeItem("shopslabel");
      sessionStorage.setItem("shopsType", "1");

      this.$router.push({
        name: "addOffineShops"
      });
    },
    //底跳
    open(item) {
      console.log(item);
      sessionStorage.setItem("shopsId", item.shopsId);
      sessionStorage.setItem("shopslabel", item.labels);
      sessionStorage.setItem("shopsBrandId", item.shopsBrandId);
      if (item.status == "0" || item.status == "0") {
        sessionStorage.setItem("shopsType", "1");
        this.$router.push({
          name: "addOffineShops"
        });
      } else {
        sessionStorage.setItem("shopsType", "0");
        this.$router.push({
          name: "shopsinfo"
        });
      }
    },
    //删除
    delshpos(item) {
      this.$confirm("您确认删除此门店？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsId: item.shopsId
          };
          this.$post("/shops/del", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "删除门店成功!"
              });
            } else {
              this.$message.error(res.msg);
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    ewm(item) {
      console.log(item);
      let parmars = {
        id: "relateId=" + item.shopsId + ",type=1",
        page: "pages/shopDetail/shopDetail"
      };
      this.$post("/weixin/getwxTwoEconde", parmars).then(res => {
        if (res.error == "00") {
          this.dialogVisible = true;
          this.ewmimg = res.result;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style scoped>
.offlineshop {
  padding: 15px;
  min-height: 1000px;
  padding-bottom: 150px;
  /* overflow: auto; */
  background: #fff;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}

.shops-title {
  width: 100%;
  background: #e4e9ef;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
}

.shops-title > div {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #4a4a4a;
}

.shops-title > p {
  font-size: 14px;
  font-weight: 400;
  color: #4a4a4a;
  padding-top: 18px;
  margin-left: 20px;
}

.soso {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.soso > .keywords {
  float: left;
  margin-right: 10px;
  width: 300px;
}

.sele {
  float: left;
  margin-right: 10px;
}

.sele > .el-select {
  width: 100px;
}

.soso-btn {
  float: left;
  width: 200px;
  margin-top: 0;
  margin-left: 10px;
}

.tab {
  width: 100%;
  overflow: auto;
}

.htz-red {
  color: red;
}

.ewmimg {
  display: block;
  width: 150px;
  height: 150px;
  margin: 20px auto;
}

.zi{
  margin-right: 5px;
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