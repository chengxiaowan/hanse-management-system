<template>
  <div class="login">
    <v-header></v-header>
    <div class="box">
      <el-select v-model="value" placeholder="请选择登录角色" class="role">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="username">
        <el-input v-model="username" placeholder="会员名/手机号/邮箱" autocomplete="off"></el-input>
      </div>
      <div class="username">
        <el-input
          v-model="password"
          type="password"
          placeholder="请输入登录密码"
          @keyup.enter.native="login"
          autocomplete="off"
        ></el-input>
      </div>
      <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      <div class="menu">
        <div>忘记密码</div>
        <div>
          <router-link to="/logon">注册账号</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/header";
export default {
  name: "login",
  components: {
    "v-header": top
  },
  data() {
    return {
      info: "登录",
      options: [
        {
          value: "7",
          label: "酒店"
        },
        {
          value: "8",
          label: "民宿"
        },
        {
          value: "10",
          label: "摄影"
        },
        {
          value: "9",
          label: "公寓"
        },
        {
          value: "11",
          label: "门店"
        }
      ],
      value: "",
      username: "",
      password: ""
    };
  },
  //实例上的方法
  methods: {
    login() {
      if (this.value == "") {
        this.$message.error("请选择您的角色");
        return;
      } else if (this.username == "") {
        this.$message.error("请输入您的用户名");
        return;
      } else if (this.password == "") {
        this.$message.error("请输入您的密码");
        return;
      } else {
        let parmars = {
          roleId: this.value,
          mobilePhone: this.username,
          password: this.password
        };
        //调用axios
        this.$post("/service/merchants_login", parmars)
          .then(res => {
            if (res.error == "00") {
              sessionStorage.setItem("username", this.username);
              sessionStorage.setItem("roleId", this.value);
              this.$router.push({ path: "/" });
            } else {
              this.$message.error(res.result);
            }
          })
          .catch(() => {
            this.$message.error("网络错误");
            console.log("请求失败");
          });
      }
    }
  }
};
</script>

<style>
.login {
  position: relative;
  height: 100%;
}

.logo {
  margin-top: 19px;
  margin-left: 31px;
}

.box {
  width: 600px;
  height: 410px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.role {
  width: 460px;
  height: 44px;
  margin-top: 48px;
}

.username {
  width: 460px;
  height: 44px;
  margin: 0 auto;
  margin-top: 36px;
  margin-bottom: 38px;
}

.login-btn {
  width: 460px;
  height: 44px;
}

.menu {
  width: 460px;
  height: 44px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  color: #9b9b9b;
  font-size: 14px;
  font-weight: 400;
}

.menu > div {
  cursor: pointer;
}
</style>