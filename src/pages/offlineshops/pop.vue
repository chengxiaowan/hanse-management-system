<template>
  <div class="pop">
    <div class="flex-box">
      <div class="menu-box">
        <div class="menu-box-title">
          <span>销售角色</span>
          <div class="btn-box">
            <el-button type="primary" style="width:72px;" @click="addRole">新增</el-button>
          </div>
        </div>
        <ul class="role-box">
          <li @click="setrole()">所有角色</li>
          <li v-for="item in rolelist" :key="item.shopsRoleId" @click="setrole(item)">
            {{item.roleName}}
            <i class="el-icon-more"></i>
          </li>
        </ul>
      </div>
      <div class="pop-box">
        <div class="soso-pop">
          <div class="keywords">
            <el-input type="text" v-model="keywords"></el-input>
          </div>
          <div class="soso-btns">
            <el-button type="primary">搜索</el-button>
            <el-button type="success" plain @click="addUser">添加</el-button>
          </div>
        </div>
        <div class="tab">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th width="30%">姓名</th>
                <th width="15%">手机号</th>
                <th width="20%">邮箱</th>
                <th width="15%">状态</th>
                <th width="20%">操作</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="list.length != 0">
                <tr v-for="item in list" :key="item.userId">
                  <td>{{ item.realName }}</td>
                  <td>{{ item.mobilePhone }}</td>
                  <td>{{ item.email }}</td>
                  <td v-if="item.isQuit == '0'">在职</td>
                  <td v-if="item.isQuit == '1'">离职</td>
                  <td class="btn-hide">
                    <span>编辑</span>
                    <span style="color:red;" v-if="item.isQuit == '0'" @click="deluser(item)">离职</span>
                  </td>
                </tr>
              </template>
              <tr class="main_info" v-else>
                <td colspan="5">没有相关数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <el-dialog title="新增销售角色" :visible.sync="centerDialogVisible" width="30%">
      <div>请输入您要新增加的销售角色名称</div>
      <div class="keywords">
        <el-input type="text" maxlength="30" v-model="roleName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newRole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建销售人员" :visible.sync="centerDialogVisible2" width="60%" center>
      <div class="flex-row">
        <div class="min-box">
          姓名：
          <el-input type="text" maxlength="30" placeholder="请输入负责人姓名 1-30字" v-model="name"></el-input>
        </div>
        <div class="min-box">
          电话：
          <el-input type="text" maxlength="11" placeholder="请输入手机号码" v-model="phone"></el-input>
        </div>
      </div>
      <div class="flex-row">
        <div class="min-box">
          <div class="minn-box">
            销售角色：
            <el-select v-model="roleId" filterable placeholder="请选择销售角色">
              <el-option
                v-for="item in rolelist"
                :key="item.shopsRoleId"
                :label="item.roleName"
                :value="item.shopsRoleId"
              ></el-option>
            </el-select>
          </div>
          <div class="minn-box">
            QQ:
            <el-input type="text" placeholder="请输入QQ号" v-model="QQ"></el-input>
          </div>
        </div>
        <div class="min-box">
          邮箱：
          <el-input type="text" v-model="email" placeholder="请输入邮箱"></el-input>
        </div>
      </div>
      <div class="flex-row">
        <div class="min-box">
          备注：
          <el-input type="text" v-model="remarks" placeholder="请输入备注信息"></el-input>
        </div>
        <div class="min-box"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="newUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "pop",
  data() {
    return {
      info: "人员",
      shopsId: "",
      keywords: "",
      list: [],
      rolelist: [],
      role: "",
      roleName: "",
      centerDialogVisible: false,
      centerDialogVisible2: false,
      //新增
      name: "",
      phone: "",
      roleId: "",
      QQ: "",
      email: "",
      remarks: ""
    };
  },
  methods: {
    //获取角色列表
    getrole() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        pageSzie: "100"
      };
      this.$post("/shops/shopsRoleList", parmars).then(res => {
        if (res.error == "00") {
          this.rolelist = res.result.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //筛选角色
    setrole(item) {
      if (item) {
        this.role = item.shopsRoleId;
      } else {
        this.role = "";
      }
      this.getlist();
      console.log("点了");
    },

    //获取人员列表
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        keywords: this.keywords,
        shopsRoleId: this.role,
        pageSzie: "100"
      };
      this.$post("/shops/shopsDistributorList", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //离职
    deluser(item) {
      this.$confirm("您确认此人员离职？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            userId: item.userId
          };
          this.$post("/user/changeIsQuit", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "人员离职成功!"
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
    //打开模态框
    addRole(item) {
      if (this.centerDialogVisible) {
        this.centerDialogVisible = false;
      } else {
        this.centerDialogVisible = true;
      }
    },

    //新增角色
    newRole() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        roleName: this.roleName
      };
      if (this.roleName == "") {
        this.$message.error("请输入您要新增的角色名称");
      } else {
        this.$post("/shops/addShopsRole", parmars).then(res => {
          if (res.error == "00") {
            this.$message("添加销售角色成功");
            this.getrole();
            this.centerDialogVisible = false;
          }
        });
      }
    },
    //新增人员
    addUser() {
      if (this.centerDialogVisible2) {
        this.centerDialogVisible2 = false;
      } else {
        this.centerDialogVisible2 = true;
      }
    },

    newUser() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        userName: this.phone,
        mobilePhone: this.phone,
        password: "123456",
        name: this.name,
        email: this.email,
        QQ: this.QQ,
        remark: this.remarks,
        shopsRoleId: this.roleId
      };
      if (this.name == "") {
        this.$message.error("请输入人员姓名");
      } else if (this.phone == "") {
        this.$message.error("请输入人员联系电话");
      } else if (this.roleId == "") {
        this.$message.error("请选择人员所属角色");
      } else {
        this.$post("/shops/addShopsDistributor", parmars).then(res => {
          if (res.error == "00") {
            this.$message("添加人员成功");
            this.getlist();
            this.addUser();
          }
        });
      }
    }
  },
  mounted() {
    this.getrole();
    this.getlist();
  }
};
</script>

<style scoped>
/* .pop {
} */

.flex-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.menu-box {
  flex-grow: 1;
  height: 500px;
  background: #fff;
  margin-left: 20px;
  border: 1px solid #f4f4f4;
  margin-right: 20px;
}

.pop-box {
  flex-grow: 6;
  height: 500px;
}

.menu-box-title {
  height: 50px;
  background: #e2e9f0;
  font-size: 16px;
  color: #626262;
  line-height: 50px;
  border-radius: 2px;
}

.menu-box-title > span {
  float: left;
  margin-left: 10px;
}

.menu-box-title > .btn-box {
  float: right;
  margin-right: 10px;
}

.role-box {
  margin: 0;
  padding: 0;
}

.role-box > li {
  height: 35px;
  font-size: 12px;
  font-weight: 400;
  line-height: 35px;
  padding-left: 12px;
  cursor: pointer;
}

.role-box > li > i {
  float: right;
  margin-right: 15px;
  line-height: 35px;
}

.role-box > li:hover {
  background: #f5f5f5;
}

.soso-pop {
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
}

.keywords {
  width: 273px;
  margin-top: 5px;
  float: left;
}
.soso-btns {
  width: 200px;
  float: left;
  margin-top: 5px;
  margin-left: 10px;
}

.flex-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}

.min-box {
  width: 500px;
  overflow: hidden;
}

.minn-box {
  width: 200px;
  margin-right: 50px;
  float: left;
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