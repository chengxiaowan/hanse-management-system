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
          <i class="el-icon-search"></i>搜索
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
                <span>查看</span>
                <span style="color:red;">删除</span>
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
      remark: ""
    };
  },
  methods: {
    showAdd() {
      if (this.add == false) {
        this.add = true;
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
        this.$post("/shopsBrand/addShopsBrandShopsOwner", parmars).then(res => {
          if (res.error == "00") {
            this.$message("添加负责人成功");
            setTimeout(function() {
              this.add = false;
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    //读取列表
    getuser() {
      let parmars = {
        keywords: this.keywords,
        shopsBrandId: sessionStorage.getItem("shopsBrandId")
      };
      this.$post("/shopsBrand/shopsBrandShopsOwnerList", parmars).then(res => {
        console.log(res)
        if(res.error == "00"){
          this.list = res.result.list;
          console.log(this.list)
        }
      });
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
  line-height: 28px;
  color: #4a4a4a;
  text-indent: 15px;
  padding-bottom: 5px;
}

.personnel-title > p {
  font-size: 14px;
  line-height: 10px;
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