<template>
  <div class="safe">
    <v-title page="安全设置"></v-title>
    <div class="user-info">
      <div class="user-head">
        <img src="../../assets/image/head.png" alt />
      </div>
      <div class="user-msg">
        <p>
          登录账号：{{username}}
          <span v-if="test">(未认证)</span>
        </p>
        <p>账号ID：{{Uid}}</p>
        <p>注册时间：{{time}}</p>
      </div>
      <div class="xian"></div>
    </div>
    <div class="caozuo">
      <div class="caozuo-title">登录密码</div>
      <div class="caozuo-body">安全性高的密码可以使账号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项切长度超过6位的密码。</div>
      <div class="caozuo-end">
        <span>
          <i class="el-icon-circle-check"></i>
          已设置
        </span>
        |
        <router-link to="/password">修改</router-link>
      </div>
    </div>
    <!-- 暂时隐藏，以后需要再做 -->
    <!-- <div class="caozuo">
      <div class="caozuo-title">手机绑定</div>
      <div class="caozuo-body">
        您已绑定了手机
        <span>138****1234</span> [您的手机为安全手机，可以找回密码，但不能用于登录]
      </div>
      <div class="caozuo-end">
        <span>
          <i class="el-icon-circle-check"></i>
          已设置
        </span>
        |
        <a href="#">修改</a>
      </div>
    </div>
    <div class="caozuo">
      <div class="caozuo-title">联系人&nbsp;&nbsp;&nbsp;</div>
      <div class="caozuo-body">消息接收人，方便我们与您进行联系</div>
      <div class="caozuo-end">
        <span>
          <i class="el-icon-circle-check"></i>
          未设置
        </span>
        |
        <a href="#">修改</a>
      </div>
    </div>
    <div class="caozuo">
      <div class="caozuo-title">备用邮箱</div>
      <div class="caozuo-body">备用邮箱绑定后可用来接收寒舍发送的各类系统、营销、服务通知。</div>
      <div class="caozuo-end">
        <span>
          <i class="el-icon-circle-check"></i>
          已设置
        </span>
        |
        <a href="#">修改</a>
      </div>
    </div> -->
  </div>
</template>
<script>
import title from "../../components/title";
export default {
  name: "safe",
  components: {
    "v-title": title
  },
  data() {
    return {
      info: "安全设置",
      test: true,
      username: "测试（常州）有限公司",
      Uid: "10086",
      time: "2019年8月12日 17:08:57"
    };
  }
};
</script>

<style scoped>
.safe {
  height: 100%;
}
.user-info {
  height: 208px;
  padding: 0 41px;
}
.user-head {
  width: 120px;
  height: 120px;
  margin-top: 42px;
  float: left;
  margin-bottom: 46px;
}

.user-head > img {
  width: 100%;
  display: block;
}
.user-msg {
  float: left;
  margin-left: 30px;
  margin-top: 54px;
}
.user-msg > p {
  margin-bottom: 20px;
  font-size: 14px;
  color: #333;
}
.user-msg > p > span {
  color: #f5a623;
}

.xian {
  height: 2px;
  background: #e5e5e5;
  clear: both;
}

.caozuo {
  height: 123px;
  border-bottom: 1px dashed #e5e5e5;
  margin: 0 41px;
}

.caozuo > .caozuo-title {
  font-size: 18px;
  line-height: 123px;
  font-weight: 500;
  float: left;
}

.caozuo > .caozuo-body {
  font-size: 14px;
  line-height: 123px;
  font-weight: 400;
  margin-left: 200px;
  float: left;
}

.caozuo > .caozuo-end {
  font-size: 14px;
  line-height: 123px;
  float: right;
  margin-right: 100px;
}
.caozuo-end > span {
  color: #599f13;
}
</style>
    