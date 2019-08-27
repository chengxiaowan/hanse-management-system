<template>
  <div class="personnel">
    <div class="personnel-title">
      <div>说明</div>
      <p>1、该页面用来管理品牌下面各门店的负责人(一般情况下为店铺的直接受益人)信息。</p>
      <p>2、门店负责人是该门店的直接受益人，门店里的商品售出后，可享受佣金，并且可以管理其门店里的商品，销售人员，服务等。</p>
      <p>3、一个门店只有一名门店负责人，品牌负责人在给门店负责人创建好账号后，只需要通知对应的人员登录我方后台创建其名下的门店及其他信息即可。</p>
    </div>
    <div class="soso-box">
      <div class="soso-inputs">
        <el-input v-model="keywords" placeholder="请输入负责人姓名"></el-input>
      </div>
      <div class="soso-btns">
        <el-button type="primary">
          <i class="el-icon-search" @click="getuser()"></i>搜索
        </el-button>
        <el-button type="success" @click="showAdd()">添加</el-button>
      </div>
    </div>
    <div class="user-list">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="20%">姓名</th>
            <th width="20%">手机号</th>
            <th width="20%">邮箱</th>
            <th width="20%">备注</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.userId">
              <td>{{item.realName}}</td>
              <td>{{item.mobilePhone}}</td>
              <td>{{item.email}}</td>
              <td>{{item.remark}}</td>
              <td>
                <span @click="getinfo(item)">查看</span>
                <span style="color:red;" @click="deluser(item)" v-if="item.isQuit == '0'">离职</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- 新增的模态框 -->
    <div class="adduser" v-if="add">
      <div class="zzc"></div>
      <div class="adduser-box">
        <div class="adduser-title">
          <div>新建联系人</div>
          <span @click="showAdd()">X</span>
        </div>
        <div class="adduser-content">
          <div class="adduser-input">
            <div>姓名:</div>
            <el-input v-model="name"></el-input>
          </div>
          <div class="adduser-input">
            <div>手机号码:</div>
            <el-input v-model="phone" @blur="phonetest()" maxlength="11"></el-input>
          </div>
        </div>

        <div class="adduser-content">
          <div class="adduser-input">
            <div>QQ:</div>
            <el-input v-model="qq"></el-input>
          </div>
          <div class="adduser-input">
            <div>邮箱:</div>
            <el-input v-model="email"></el-input>
          </div>
        </div>
        <div class="adduser-content">
          <div class="adduser-input">
            <div>备注:</div>
            <el-input v-model="remark"></el-input>
          </div>
          <div class="adduser-input">
            <div></div>
            <!-- <el-input></el-input> -->
          </div>
        </div>
        <div class="save-btn">
          <el-button type="primary" @click="save()">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      info: "负责人",
      keywords: "",
      add: false,
      list: [],
      name: "",
      phone: "",
      qq: "",
      email: "",
      remark: "",
      flage: "",
      id: ""
    };
  },
  methods: {
    showAdd() {
      if (this.add == false) {
        this.add = true;
        this.name = "";
        this.phone = "";
        this.email = "";
        this.qq = "";
        this.remark = "";
        (this.id = ""), (this.flage = "");
      } else {
        this.add = false;
      }
    },

    //手机号校验
    phonetest() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error("输入手机号码格式有误");
      } else {
        var parmars = { username: this.phone };
        this.$get("/shops/findByUserName", parmars).then(res => {
          if (res.error == "01") {
            this.$message.error("该手机号已被使用，请更换手机号后重试");
          }
        });
      }
    },
    //保存用户信息
    save() {
      if (this.name == "") {
        this.$message.error("请输入负责人姓名");
      } else if (this.phone == "") {
        this.$message.error("请输入负责人手机号码");
      } else {
        var parmars = {
          shopsBrandId: sessionStorage.getItem("shopsBrandId"),
          name: this.name,
          userName: this.phone,
          mobilePhone: this.phone,
          password: "123456",
          email: this.email,
          QQ: this.qq,
          remark: this.remark
        };
        if (this.flage == 1) {
          parmars.shopsBrandShopsOwnerId = this.id;
          this.$post("/shopsBrand/editShopsBrandShopsOwner", parmars).then(
            res => {
              if (error == "00") {
                this.message("修改成功");
                this.add();
              }
            }
          );
        } else {
          this.$post("/shopsBrand/addShopsBrandShopsOwner", parmars).then(
            res => {
              if (res.error == "00") {
                this.$message("添加负责人成功");
                this.showAdd();
                this.getuser();
              } else {
                this.$message.error(res.msg);
              }
            }
          );
        }
      }
    },
    //读取列表
    getuser() {
      let parmars = {
        keywords: this.keywords,
        shopsBrandId: sessionStorage.getItem("shopsBrandId")
      };
      this.$post("/shopsBrand/shopsBrandShopsOwnerList", parmars).then(res => {
        console.log(res);
        if (res.error == "00") {
          this.list = res.result.list;
          console.log(this.list);
        }
      });
    },
    //删除负责人（离职）
    deluser(item) {
      this.$confirm("您确认离职此负责人？?", "提示", {
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
                message: "离职负责人成功!"
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
            message: "取消离职"
          });
        });
    },
    //读取负责人信息（查看和修改）
    getinfo(item) {
      this.showAdd();
      this.flage = 1;
      this.id = item.shopsBrandShopsOwnerId;
      let parmars = {
        shopsBrandShopsOwnerId: item.shopsBrandShopsOwnerId
      };
      this.$post("/shopsBrand/editShopsBrandShopsOwnerInfo", parmars).then(
        res => {
          if (res.error == "00") {
            let drool = res.result;
            this.name = drool.realName;
            this.phone = drool.mobilePhone;
            this.email = drool.email;
            this.qq = drool.QQ;
            this.remark = drool.remark;
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    }
  },
  mounted() {
    if (sessionStorage.getItem("shopsBrandId")) {
      this.getuser();
    }
  }
};
</script>

<style scoped>
.personnel {
  height: 100vh;
}

.personnel-title {
  padding: 10px 0;
  background: #e4e9ef;
  border-radius: 4px;
}

.personnel-title > div {
  font-size: 20px;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 10px;
  margin-left: 18px;
}

.personnel-title > p {
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 400;
  text-indent: 25px;
}

.soso-box {
  margin-top: 24px;
  overflow: hidden;
  margin-bottom: 25px;
}
.soso-inputs {
  width: 350px;
  float: left;
}
.soso-btns {
  float: left;
  margin-left: 20px;
}

/*模态框*/
.adduser {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
}

.adduser > .zzc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
}

.adduser-box {
  width: 1450px;
  height: 700px;
  background: #fff;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}

.adduser-title {
  height: 50px;
  font-size: 18px;
  font-weight: 400;
  background: #233646;
  color: #fff;
  line-height: 50px;
  margin-bottom: 70px;
}

.adduser-title > div {
  float: left;
  margin-left: 36px;
}

.adduser-title > span {
  float: right;
  margin-right: 36px;
  cursor: pointer;
}

.adduser-content {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.adduser-input {
  width: 527px;
}

.save-btn {
  width: 60px;
  margin: 0 auto;
  margin-top: 110px;
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