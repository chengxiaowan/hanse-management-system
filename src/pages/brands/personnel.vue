<template>
  <div class="personnel">
    <div class="goods-title">
      <div>说明</div>
      <p>
        1、该页面用来管理品牌下面各门店的负责人(一般情况下为店铺的直接受益人)信息。
        <br />2、门店负责人是该门店的直接受益人，门店里的商品售出后，可享受佣金，并且可以管理其门店里的商品，销售人员，服务等。
        <br />3、一个门店只有一名门店负责人，品牌负责人在给门店负责人创建好账号后，只需要通知对应的人员登录我方后台创建其名下的门店及其他信息即可。
      </p>
    </div>
    <div class="soso-box">
      <div class="soso-inputs">
        <el-input v-model="keywords" placeholder="请输入负责人姓名"></el-input>
      </div>
      <div class="soso-btns">
        <el-button type="primary" @click="getlist()" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="success" @click="showAdd()" icon="el-icon-circle-plus-outline " size="small">新增</el-button>
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
            <th width="10%">状态</th>
            <th width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.userId">
              <td>{{item.realName}}</td>
              <td>{{item.mobilePhone}}</td>
              <td>{{item.email}}</td>
              <td>{{item.remark}}</td>
              <td v-if="item.isQuit == '1'">离职</td>
              <td v-if="item.isQuit == '0'">在职</td>
              <td>
                <span @click="getinfo(item)">查看</span>
                <span style="color:red;" @click="deluser(item)" v-if="item.isQuit == '0'">离职</span>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="5">暂时没有数据</td>
          </tr>
        </tbody>
      </table>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
    </div>

    <!-- 这里废弃了一个手写的模态框，因为太丑了，想看的画自己去找历史本 -->

    <el-dialog title="新建负责人" :visible.sync="dialogVisible" width="60%" center>
      <div class="addpop">
        <div class="input-row">
          <div class="input-col">
            姓名：
            <el-input v-model="name" placeholder="请输入负责人姓名，1-30字"></el-input>
          </div>
          <div class="input-col">
            手机号码：
            <el-input v-model="phone" placeholder="请输入负责人手机号" @blur="phonetest()"></el-input>
          </div>
        </div>
        <div class="input-row">
          <div class="input-col">
            密码：
            <el-input disabled placeholder="密码不用设置，默认12456"></el-input>
          </div>
          <div class="input-col">
            QQ：
            <el-input v-model="qq" placeholder="请输入负责人QQ号"></el-input>
          </div>
        </div>
        <div class="input-row">
          <div class="input-col">
            邮箱：
            <el-input placeholder="请输入负责人邮箱" v-model="email"></el-input>
          </div>
          <div class="input-col">
            备注：
            <el-input v-model="remark" placeholder="请输入备注信息"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save()" size="small">确 定</el-button>
      </span>
    </el-dialog>
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
      id: "",
      dialogVisible: false,
      pageNo: "",
      total: 1,
      isphone:false,
      userId:"",
    };
  },
  methods: {
    showAdd() {
      if (this.dialogVisible == false) {
        this.dialogVisible = true;
        this.name = "";
        this.phone = "";
        this.email = "";
        this.qq = "";
        this.remark = "";
        (this.id = ""), (this.flage = "");
      } else {
        this.dialogVisible = false;
      }
    },

    //手机号校验
    phonetest() {
      if(this.phone == ""){
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error("输入手机号码格式有误");
        this.isphone = false;
      } else {
        //这一块后端自己搞崩了 现在就不直接前端判断是否重复了，哈哈哈哈
        // var parmars = { username: this.phone };
        // this.$get("/shops/findByUserName", parmars).then(res => {
        //   if (res.error == "01") {
        //     this.$message.error("该手机号已被使用，请更换手机号后重试");
        //   }
        // });
        this.isphone = true;
      }
    },
    //保存用户信息
    save() {
      if (this.name == "") {
        this.$message.error("请输入负责人姓名");
      } else if (this.phone == "" && this.isphone) {
        this.$message.error("请输入负责人手机号码");
      } else {
        var parmars = {
          shopsBrandId: sessionStorage.getItem("shopsBrandId"),
          name: this.name,
          userName: this.phone,
          mobilePhone: this.phone,
          password: "123456",
          email: this.email,
          qq: this.qq,
          remark: this.remark
        };
        if (this.flage == 1) {
          parmars.shopsBrandShopsOwnerId = this.id;
          parmars.userId = this.userId;
          this.$post("/shopsBrand/editShopsBrandShopsOwner", parmars).then(
            res => {
              if (res.error == "00") {
                this.$message("修改成功");
                this.dialogVisible = false;
              } else {
                this.$message.error("该手机号码已存在");
              }
            }
          );
        } else {
          this.$post("/shopsBrand/addShopsBrandShopsOwner", parmars).then(
            res => {
              if (res.error == "00") {
                this.$message("添加负责人成功");
                this.getlist();
                this.dialogVisible = false;
              } else {
                this.$message.error("该手机号码已存在");
              }
            }
          );
        }
      }
    },
    //读取列表
    getlist() {
      let parmars = {
        keywords: this.keywords,
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        pageSize: 10,
        pageNo: this.pageNo
      };
      this.$post("/shopsBrand/shopsBrandShopsOwnerList", parmars).then(res => {
        console.log(res);
        if (res.error == "00") {
          this.list = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    //删除负责人（离职）
    deluser(item) {
      this.$confirm("是否确定将该门店负责人设置为离职？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            userId: item.userId,
            // isQuit: 1
          };
          this.$post("/user/changeIsQuit1", parmars).then(res => {
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
        });
    },
    //读取负责人信息（查看和修改）
    getinfo(item) {
      this.flage = 1;
      this.id = item.shopsBrandShopsOwnerId;
      this.userId = item.userId;
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
            this.dialogVisible = true;
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    soso() {
      this.getlist();
      this.pageNo = 1;
    },
    page(e) {
      this.pageNo = e;
      this.getlist();
    }
  },
  mounted() {
    if (sessionStorage.getItem("shopsBrandId")) {
      this.getlist();
    }
  }
};
</script>

<style scoped>
.personnel {
  /* min-height: 100vh; */
  height: 1000px;
  padding-bottom: 400px;
  /* overflow: auto; */
}

.goods-title {
  background: #e4e9ef;
  border-radius: 4px;
  padding: 15px;
}

.goods-title > div {
  font-size: 20px;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 10px;
}
.goods-title > p {
  font-size: 14px;
  color: #4a4a4a;
  line-height: 24px;
  padding-left: 14px;
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

.addpop {
  padding-bottom: 20px;
}

.input-row {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.input-col {
  width: 410px;
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

.input-col >>> .el-input > .el-input__inner{
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 2px;
  margin-top: 6px;
}

.soso-inputs >>> .el-input > .el-input__inner{
  height: 35px;
  font-size: 12px;
  line-height: 35px;
  border-radius: 2px;
  /* margin-top: 6px; */
}
</style>