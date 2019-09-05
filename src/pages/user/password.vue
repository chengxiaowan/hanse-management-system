<template>
  <div class="password">
    <v-title page="设置登录密码"></v-title>
    <div class="password-title">通过手机号修改密码</div>
    <div class="password-form">
      <el-input v-model="phone" placeholder="请输入您的手机号码" maxlength="11" @blur="textPhone" disabled>
        <!-- <template slot="prepend">+86</template> -->
      </el-input>
      <el-input v-model="password" type="password" placeholder="请设置您的登陆密码" maxlength="16"></el-input>
      <el-input
        v-model="password2"
        type="password"
        placeholder="请再次输入您的登陆密码"
        @blur="passwordText"
        maxlength="16"
      ></el-input>
      <div class="code">
        <div class="code-input">
          <el-input v-model="code" placeholder="请输入短信验证码" autocomplete="off"></el-input>
        </div>
        <el-button class="code-btn" @click="phoneTest" v-if="!isDisabled">获取验证码</el-button>
        <el-button class="code-btn" @click="phoneTest" v-if="isDisabled" disabled>{{content}}</el-button>
      </div>
      <el-button type="primary" style="width:100%" @click="save">修改密码</el-button>
    </div>
  </div>
</template>
<script>
import title from "../../components/title";
import { isIP } from "net";
export default {
  name: "password",
  components: {
    "v-title": title
  },
  data() {
    return {
      info: "产品审核",
      phone: "",
      password: "",
      password2: "",
      code: "",
      isTrue: "",
      isPhone: true,
      isDisabled: false,
      content: "",
      count: "",
      timer: ""
    };
  },
  methods: {
    //密码校验
    passwordText() {
      if (this.password != this.password2 && this.password2 !="") {
        this.isTrue = false;
        this.$message.error("您输入的两次密码不一致");
      } else {
        this.isTrue = true;
      }
    },
    //手机号格式校验
    textPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error("请检查手机号是否正确");
        this.isPhone = false;
      } else {
        this.isPhone = true;
      }
    },
    //验证码获取
    phoneTest() {
      let parmars = {
        mobilePhone: this.phone,
        flag: 1
      };
      this.$post("/service/getVerificationCode", parmars)
        .then(res => {
          //在这里处理按钮1分钟不可用
          console.log(res);
          this.anniu();
        })
        .catch(() => {
          console.log("失败");
        });
    },
    //确认修改
    save() {
      if(this.password == ""){
        this.$message.error("请设置您的新密码")
        return
      }

       if(this.password2 == ""){
        this.$message.error("请确认您的新密码")
        return
      }

       if(this.code == ""){
        this.$message.error("请输入您的短信验证码")
        return
      }
      if (this.isTrue) {
        let parmars = {
          mobilePhone: this.phone,
          verificationCode: this.code,
          password: this.password
        };
        this.$post("service/updatePassword", parmars)
          .then(res => {
            if (res.error == "00") {
              this.$message("修改密码成功！");
            } else if(res.error == "01"){
              this.$message.error("请输入正确的短信验证码");
            }
          })
          .catch(() => {
            console.log("请求失败");
          });
      } else {
        this.$message.error("请保持两次输入密码一致");
      }
    },
    anniu() {
      const TIME_COUNT = 60;
      console.log("1");
      this.count = TIME_COUNT;
      this.timer = window.setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          // 倒计时时不可点击
          this.isDisabled = true;
          // 计时秒数
          this.count--;
          // 更新按钮的文字内容
          this.content = this.count + "s";
        } else {
          // 倒计时完，可点击
          this.isDisabled = false;
          // 更新按钮文字内容
          this.content = "获取短信验证码";
          // 清空定时器!!!
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    }
  },
  //组件挂载生命周期
  mounted() {
    this.phone = sessionStorage.getItem("username");
  }
};
</script>
<style scoped>
.password {
  background: #fff;
  height: 100vh;
}
.password-title {
  height: 44px;
  line-height: 44px;
  background-color: #f5f5f5;
  margin: 21px 12px 0 12px;
  border-radius: 2px;
  text-indent: 18px;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
}

.password-form {
  width: 460px;
  margin: 40px auto;
}
.el-input {
  height: 44px;
  display: block;
  margin-bottom: 20px;
}
</style>