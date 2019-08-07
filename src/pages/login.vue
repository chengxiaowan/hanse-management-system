<template>
  <div class="login">
      <v-header></v-header>
    <div class="box">
      <el-select v-model="value" placeholder="请选择登录角色" class="role">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="username">
          <el-input v-model="username" placeholder="会员名/手机号/邮箱"></el-input>
      </div>
      <div class="username">
          <el-input v-model="password" type="password" placeholder="请输入登录密码"></el-input>
      </div>
      <el-button type="primary" class="login-btn">登录</el-button>
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
import top from '../components/header'
export default {
  name: "login",
  components:{
      "v-header":top,
  },
  data() {
    return {
      info: "登录",
      options: [
        {
          value: "酒店",
          label: "酒店"
        },
        {
          value: "民宿",
          label: "民宿"
        },
        {
          value: "摄影",
          label: "摄影"
        },
        {
          value: "企业",
          label: "企业"
        },
        {
          value: "测试",
          label: "测试"
        }
      ],
      value: "",
      username:'',
      password:'',
    };
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
  text-align: center
}

.role{
    width: 460px;
    height: 44px;
    margin-top: 48px;
}

.username{
    width: 460px;
    height: 44px;
    margin: 0 auto;
    margin-top: 36px;
    margin-bottom: 38px;
}

.login-btn{
    width: 460px;
    height: 44px;
    margin-top: 38px;
}

.menu{
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

.menu > div{
    cursor: pointer;
}
</style>