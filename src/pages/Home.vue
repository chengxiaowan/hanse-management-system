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
        <el-submenu index="1">
          <template slot="title">
            <i class="iconfont icon-shenhe" style="margin-right:10px;"></i>
            <span>审核</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goods">产品审核</el-menu-item>
            <el-menu-item index="/service">服务审核</el-menu-item>
            <el-menu-item index="/shops">门店审核</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/brand">
          <i class="iconfont icon-pinpaiguanli" style="margin-right:10px;"></i>
          <span slot="title">品牌管理</span>
        </el-menu-item>
        <el-menu-item index="/offlineshop">
          <i class="iconfont icon-jiudian" style="margin-right:10px;"></i>
          <span slot="title">门店管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-shenhe" style="margin-right:10px;"></i>
            <span>摄影师</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/studio">旅拍工作室</el-menu-item>
            <el-menu-item index="/shot">旅拍服务</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/index/CollectList">
          <i class="el-icon-star-on"></i>
          <span slot="title">收藏列表</span>
        </el-menu-item>
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
          <img src="../assets/image/head.png" />
          <el-collapse-transition>
            <div class="userinfo" v-if="showUser">
              <div class="user-title">
                <img src="../assets/image/head.png" />
                <a href="#">{{username}}</a>
              </div>
              <div class="user-menu">
                <a href="#">基本资料</a>
                |
                <a href="#">实名认证</a>
                |
                <a href="#">安全设置</a>
              </div>
              <div class="logout" @click="logout">退出管理系统</div>
            </div>
          </el-collapse-transition>
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
      username: "常州寒舍信息科技有限公司", //用户名
      showUser: false,
      activeName: "1"
    };
  },
  methods: {
    //点击头像打开资料和关闭资料
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
      if (user == null || role == null) {
        this.$router.push({ path: "/login" });
      }
      this.username = user;
    },
    //注销登录
    logout() {
      sessionStorage.clear();
      this.$router.push({ path: "/login" });
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
  top: 35px;
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