<template>
  <div class="logon">
    <v-header></v-header>
    <div class="logon-box">
      <div class="title">
        <p style="font: 400 36px/50px ''">{{info}}</p>
        <div class="logon-login">
          已有Home+账号？
          <router-link to="/login">快捷登录 ></router-link>
        </div>
      </div>
      <el-select v-model="value" placeholder="请选择登录角色" class="logon-role">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="logon-input">
        <el-input v-model="phone" placeholder="请输入手机号"></el-input>
      </div>
      <div class="logon-input">
        <el-input v-model="password" type="password" placeholder="请输入您的登录密码" autocomplete="off"></el-input>
      </div>
      <div class="logon-input">
        <el-input v-model="password2" type="password" placeholder="请再次输入您的登录密码" autocomplete="off"></el-input>
      </div>
      <div class="code">
        <div class="code-input">
          <el-input v-model="code" placeholder="请输入短信验证码" autocomplete="off"></el-input>
        </div>
        <el-button class="code-btn" @click="phoneTest">获取验证码</el-button>
      </div>
      <el-button type="primary" class="logon-submit" @click="drool">同意条款并注册</el-button>
      <div class="rule">
        <el-checkbox v-model="rule"></el-checkbox>
        <a href="#">《寒舍网站服务条款》</a>
        |
        <a href="#">《法律声明和隐私政策》</a>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/header";
export default {
  name: "logon",
  components: {
    "v-header": top
  },
  //data实例需要return
  data() {
    return {
      info: "欢迎注册Home+",
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
        }
      ],
      value: "",
      phone: "",
      password: "",
      password2: "",
      code: "",
      rule: ""
    };
  },
  //实例上的方法
  methods: {
    drool() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error("请检查手机号是否正确");
      } else if (this.password != this.password2) {
        this.$message.error("请保持两次输入的密码一致");
      } else if (this.code == "") {
        this.$message.error("请输入您的手机验证码");
      } else if (this.rule != true) {
        this.$message.error("请点击下方框以同意用户协议");
      } else if (this.value == "") {
        this.$message.error("请选择您的角色");
      } else {
        let parmars = {
          roleId: this.value,
          mobilePhone: this.phone,
          verificationCode: this.code,
          password: this.password2
        };
        this.$post("/service/registerMerchantsUser", parmars).then(res => {
          this.$alert("注册成功，即将跳转到登录页面", "注册成功", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push({
                name: "login"
              });
            }
          });
        }).catch(()=>{
          console.log("失败")
        });
      }
    },
    //手机验证码
    phoneTest() {
      let parmars = {
        mobilePhone: this.phone,
        flag: 0
      };
      this.$post("/service/getVerificationCode", parmars)
        .then(res => {
          //在这里处理按钮1分钟不可用
          console.log(res);
        })
        .catch(() => {
          console.log("失败");
        });
    }
  }
};
</script>
<style>
.logon {
  position: relative;
  height: 100vh;
}

.logon-box {
  width: 1200px;
  height: 672px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.title {
  margin-top: 41px;
  position: relative;
}

.title > p {
  font: 400 36px/50px "";
}

.title > div {
  position: absolute;
  right: 21px;
  top: 50%;
  font: 14px;
  font-weight: 400;
}

.title > div > a {
  color: #4a90e2;
}

.logon-role {
  width: 460px;
  height: 44px;
  margin-top: 52px;
}

.logon-input {
  width: 460px;
  height: 44px;
  margin: 0 auto;
  margin-top: 20px;
}

.code {
  margin: 0 auto;
  margin-top: 20px;
  width: 460px;
  position: relative;
  margin-bottom: 20px;
}

.code-input {
  width: 351px;
  height: 44px;
}

.code-btn {
  position: absolute;
  height: 40px;
  width: 105px;
  right: 0;
  top: 0;
}

.logon-submit {
  width: 460px;
  height: 40px;
}

.rule {
  margin-top: 29px;
}

.rule > a {
  color: #4a90e2;
  font: 14px;
  font-weight: 500;
}
</style>
