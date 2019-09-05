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
          <li @click="setrole()" :class="activeClass == '-1' ? 'active':''">所有角色</li>
          <li
            v-for="item in rolelist"
            :key="item.shopsRoleId"
            @click="setrole(item)"
            :class="activeClass == item.shopsRoleId ? 'active':''"
          >
            {{item.roleName}}
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editRole(item)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="delrole(item)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <div class="pop-box">
        <div class="soso-pop">
          <div class="keywords">
            <el-input type="text" v-model="keywords" placeholder="请输入姓名、手机号码"></el-input>
          </div>
          <div class="soso-btns">
            <el-button type="primary" icon="el-icon-search" @click="getlist()">搜索</el-button>
            <el-button type="success" plain @click="addUser" icon="el-icon-circle-plus-outline">新增销售</el-button>
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
                    <span @click="getuserinfo(item)">编辑</span>
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
    <el-dialog title="新增销售角色" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="new-box">
        <div class="new-title">角色名称:</div>
        <div class="keywords">
          <el-input type="text" maxlength="30" v-model="roleName" placeholder="请输入销售角色名称，1~30字"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newRole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑销售角色" :visible.sync="edit" width="30%" center>
      <div class="new-box">
        <div class="new-title">角色名称:</div>
        <div class="keywords">
          <el-input type="text" maxlength="30" v-model="roleNames" placeholder="请输入销售角色名称，1~30字"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="roles()">确 定</el-button>
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
      remarks: "",
      shopsDistributorId: "",
      flage: 0,
      userId: "",
      roleNames: "",
      edit: false,
      editroleId: "",
      activeClass: -1 // 0为默认选择第一个，-1为不选择
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
        this.roleId = item.shopsRoleId;
        this.activeClass = item.shopsRoleId;
      } else {
        this.role = "";
        this.activeClass = -1;
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
        .catch(() => {});
    },
    //打开模态框
    addRole(item) {
      if (this.centerDialogVisible) {
        this.centerDialogVisible = false;
      } else {
        this.centerDialogVisible = true;
        this.roleName = "";
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
          } else {
            this.$message.error(res.msg);
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
        this.flage = 0;
        this.name = "";
        this.phone = "";
        this.QQ = "";
        this.email = "";
        this.remarks = "";
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
      } else if (this.flage == 0) {
        this.$post("/shops/addShopsDistributor", parmars).then(res => {
          if (res.error == "00") {
            this.$message("添加人员成功");
            this.getlist();
            this.addUser();
          } else if (res.error == "101") {
            this.$message.error("该销售人员已存在");
          } else {
            this.$message.error(res.msg);
          }
        });
      } else if (this.flage == 1) {
        //进入修改流程
        parmars.shopsDistributorId = this.shopsDistributorId;
        parmars.userId = this.userId;
        this.$post("/shops/editShopsDistributor", parmars).then(res => {
          if (res.error == "00") {
            this.$message("修改人员信息成功");
            this.getlist();
            this.centerDialogVisible2 = false;
          } else if (res.error == "101") {
            this.$message.error("该手机号已存在");
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    //删除角色
    delrole(item) {
      this.$confirm("您确认删除此角色？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsRoleId: item.shopsRoleId
          };
          this.$post("/shops/delShopsRole", parmars).then(res => {
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "删除角色成功!"
              });
              this.getrole();
            } else {
              this.$message.error(res.msg);
            }
            this.getlist();
          });
        })
        .catch(() => {});
    },
    //编辑角色前的获取信息
    getuserinfo(item) {
      let parmars = {
        shopsDistributorId: item.shopsDistributorId
      };
      this.shopsDistributorId = item.shopsDistributorId;
      this.$post("/shops/editShopsDistributorInfo", parmars).then(res => {
        if (res.error == "00") {
          let drool = res.result;
          this.name = drool.realName;
          this.phone = drool.mobilePhone;
          this.QQ = drool.QQ;
          this.roleId = drool.shopsRoleId;
          this.email = drool.email;
          this.remarks = drool.remark;
          this.userId = drool.userId;
          this.centerDialogVisible2 = true;
          this.flage = 1;
        }
      });
    },
    editRole(item) {
      this.editroleId = item.shopsRoleId;
      this.roleNames = item.roleName;
      this.edit = true;
    },

    roles() {
      let parmars = {
        roleName: this.roleNames,
        shopsRoleId: this.editroleId,
        shopsId: sessionStorage.getItem("shopsId")
      };
      this.$post("/shops/editShopsRole", parmars).then(res => {
        if (res.error == "00") {
          this.$message("修改角色名称成功");
          this.getrole();
          this.edit = false;
        } else {
          this.$message.error(res.msg);
        }
      });
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
  background: #d5d5d5;
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
  margin-bottom: 10px;
}
.soso-btns {
  width: 300px;
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

.el-dropdown {
  float: right;
  margin-right: 15px;
}

.new-box {
  width: 300px;
  padding-bottom: 20px;
  margin: 0 auto;
}

.new-title {
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
}

.active {
  background: #f5f5f5;
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