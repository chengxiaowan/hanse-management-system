<template>
  <el-container>
    <el-aside style="width:200px;">
      <div class="aside-title">
        <img src="../assets/image/HOME.png" alt />
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2C3D4C"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>酒店管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">酒店品牌</el-menu-item>
            <el-menu-item index="1-2">酒店民宿</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-picture"></i>
            <span>服务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">旅拍管理</el-menu-item>
            <el-menu-item index="2-2">定制管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="soso">
          <div class="keywords">
            <el-input v-model="keywords" placeholder="..."></el-input>
          </div>
        </div>
        <div class="user" @mouseenter="show" @mouseleave="noShow">
          <img src="../assets/image/head.png" />
          <div class="userinfo" v-if="showUser">
            <div class="user-title">
              <img src="../assets/image/head.png" alt />
              <a href="#">{{username}}</a>
            </div>
            <div class="user-menu">
              <a href="#">基本资料</a>
              |
              <a href="#">实名认证</a>
              |
              <a href="#">安全设置</a>
            </div>
            <div class="logout">退出管理系统</div>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
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
      keywords:'',
      head: "", //存放头像
      username: "常州寒舍信息科技有限公司", //用户名
      showUser: false
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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
  text-align: center;
  height: 100vh;
  background: #2c3d4c;
  width: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.soso{
  float: left;
}

.keywords{
  width:240px;
  height:40px;
  margin-top:10px; 
}
</style>