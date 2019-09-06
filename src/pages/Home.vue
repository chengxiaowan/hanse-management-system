<template>
  <el-container>
    <el-aside style="width:200px;">
      <div class="aside-title">
        <img src="../assets/image/HOME.png" alt />
      </div>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2C3D4C"
        text-color="#A7B1C2"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/index">
          <i class="iconfont icon-zhuye" style="margin-right:10px;"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="1" v-if="role=='7'|| role == '8'">
          <template slot="title">
            <i class="iconfont icon-shenhe" style="margin-right:10px;"></i>
            <span>审核</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goods">商品审核</el-menu-item>
            <el-menu-item index="/service">服务审核</el-menu-item>
            <!-- 暂时隐藏 未完成 -->
            <!-- <el-menu-item index="/shops">门店审核</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/brand" v-if="role=='7'|| role == '8'">
          <i class="iconfont icon-pinpaiguanli" style="margin-right:10px;"></i>
          <span slot="title">品牌管理</span>
        </el-menu-item>
        <el-menu-item index="/offlineshop" v-if="role=='7'|| role == '8' || role == '11'">
          <i class="iconfont icon-jiudian" style="margin-right:10px;"></i>
          <span slot="title">门店管理</span>
        </el-menu-item>
        <el-submenu index="2" v-if="role == 10">
          <template slot="title">
            <i class="iconfont icon-sheyinglvxing" style="margin-right:10px;"></i>
            <span>摄影师</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/studio">旅拍工作室</el-menu-item>
            <el-menu-item index="/shot">旅拍服务</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="soso">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="keywords">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="user" @mouseenter="show" @mouseleave="noShow">
          <img :src="drool" />

          <div class="userinfo" v-if="showUser">
            <div class="user-title">
              <img :src="drool" />
              <a href="#">{{username}}</a>
              <span>{{phone}}</span>
            </div>
            <div class="user-menu">
              <router-link to="/userinfo">基本信息</router-link>
              <!-- | -->
              <!-- <router-link to="/certification">实名认证</router-link>     暂时去掉          -->
              |
              <router-link to="/password">修改密码</router-link>
            </div>
            <div class="logout" @click="logout">退出管理系统</div>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      info: "首页",
      keywords: "",
      head: "", //存放头像
      username: "", //用户名
      showUser: false,
      activeName: "1",
      phone: "",
      drool:
        "data:image/png;base64,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",
      role: ""
    };
  },
  methods: {
    //鼠标滑过头像打开资料和关闭资料
    show() {
      this.showUser = true;
    },
    noShow() {
      this.showUser = false;
    },

    //导航栏的 我也不知道干啥的
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //检测是否登录
    isLogin() {
      let user = sessionStorage.getItem("username");
      let role = sessionStorage.getItem("roleId");
      this.phone = sessionStorage.getItem("username");
      if (user == null || role == null) {
        this.$router.push({ path: "/login" });
      } else {
        this.getUser();
        this.role = role;
      }
    },
    //注销登录
    logout() {
      sessionStorage.clear();
      this.$get("/logout").then(res => {
        if (res.error == "00") {
          this.$message(res.msg);
        }
      });
      this.$router.push({ path: "/login" });
    },
    //获取用户信息
    getUser() {
      this.$get("/service/getMerchantsUser")
        .then(res => {
          if (res.error == "00") {
            console.log(res);
            this.username = res.result.name;
            sessionStorage.setItem("nickName", this.username);
          } else {
            // this.$message("获取个人信息成功");
          }
        })
        .catch(() => {
          console.log("请求超时超时");
        });
    }
  },
  mounted() {
    this.isLogin();
  }
};
</script>
<style>
.aside-title {
  width: 100%;
  height: 107px;
  background: #233646;
  position: relative;
}

.aside-title > img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -18px;
  margin-left: -60px;
}

.el-header {
  background-color: #444a63;
  height: 60px;
  padding: 0;
}

.user {
  float: right;
  margin-right: 31px;
  margin-top: 14px;
  position: relative;
}

.user > img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

.userinfo {
  width: 301px;
  height: 148px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(184, 182, 182, 0.5);
  position: absolute;
  right: -34px;
  top: 30px;
  z-index: 9999;
}

.userinfo .user-title {
  height: 32px;
  margin-top: 16px;
}

.userinfo .user-title > img {
  width: 32px;
  height: 32px;
  margin-left: 18px;
  border-radius: 50%;
  float: left;
}

.userinfo .user-title > a {
  float: left;
  height: 32px;
  color: #4a4a4a;
  font-size: 12px;
  line-height: 32px;
  margin-left: 12px;
  font-weight: 400;
}

.userinfo .user-title > span {
  float: left;
  height: 32px;
  color: #4a4a4a;
  font-size: 12px;
  line-height: 32px;
  margin-left: 12px;
  font-weight: 400;
  margin-left: 40px;
}

.user-menu {
  margin-top: 20px;
  line-height: 17px;
  text-align: center;
  color: #979797;
  font-size: 15px;
}

.user-menu > a {
  font-size: 12px;
  line-height: 17px;
  color: #4a4a4a;
  margin-left: 8px;
  margin-right: 8px;
}

.logout {
  height: 40px;
  border-top: 1px solid #f2f2f2;
  margin-top: 25px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #4a90e2;
  line-height: 40px;
  cursor: pointer;
}

.logout:hover {
  background: #f2f2f2;
}

.el-aside {
  height: 100vh;
  background: #2c3d4c;
  width: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
  height: 1080px;
  overflow: auto;
}

body > .el-container {
  margin-bottom: 40px;
}

.soso {
  float: left;
  margin-top: 10px;
  width: 300px;
  margin-left: 10px;
}

.soso-btn {
  margin-top: 10px;
  margin-left: 5px;
  width: 40px;
  height: 40px;
}
</style>