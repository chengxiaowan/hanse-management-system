<template>
  <div class="studio">
    <div class="studio-soso">
      <div class="keywords">
        <el-input type="text" placeholder="请输入影楼名称" v-model="keywords"></el-input>
      </div>
      <div class="soso-btn">
        <el-button type="primary">搜索</el-button>
        <el-button type="success" plain @click="add">添加</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="20%">名称</th>
            <th width="25%">地址</th>
            <th width="15%">店主</th>
            <th width="15%">手机号码</th>
            <th width="25%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.id">
              <td>{{item.name}}</td>
              <td>{{item.province}}{{item.city}}{{item.address}}</td>
              <td>{{item.userName}}</td>
              <td>{{item.mobilePhone}}</td>
              <td class="btn-hide">
                <span>查看</span>
                <span style="color:red;" @click="delStudio(item)">删除</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="7">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "studio",
  data() {
    return {
      info: "旅拍工作室",
      list: "",
      keywords: ""
    };
  },
  methods: {
    //获取影楼列表
    getList() {
      let parmars = {
        keywords: this.keywords,
        pageSize: "100"
      };
      this.$post("/service/getPhotoStudioListPage", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //删除影楼
    delStudio(item) {
      this.$confirm("您确认删除此工作室？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            id: item.id,
            delFlag: "1"
          };
          this.$post("/service/deletePhotoStudioById", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "删除工作室成功!"
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
    add(){
        this.$router.push({
            name:"Studio"
        })
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.studio {
  padding: 15px;
  height: 1000px;
  padding-bottom: 150px;
  overflow: auto;
  background: #fff;
}

.studio-soso {
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;
}

.keywords {
  width: 267px;
  float: left;
  margin-top: 10px;
}

.soso-btn {
  float: left;
  margin-left: 10px;
  width: 60%;
}

.tab {
  width: 100%;
  overflow: auto;
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
