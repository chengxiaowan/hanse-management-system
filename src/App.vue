<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>
<style>
/* 默认样式 */
html {
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
}
body,
div,
ul,
li,
span,
img,
input,
form {
  margin: 0;
  padding: 0;
}
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
dl,
li,
dd {
  margin: 0;
}
ul,
ol {
  padding: 0;
}
body {
  background: #f2f4f5;
  height: 100%;
}

body {
  font-size: 12px;
  font-family: "PingFangSC", "微软雅黑", "宋体", Arial, sans-serif;
}
a {
  text-decoration: none;
  color: #666666;
}
li {
  list-style: none;
}
img {
  border: none 0;
}
input {
  outline: none;
  border: none;
  background: none;
}
input,
textarea,
select {
  margin: 0;
}
input,
textarea {
  padding: 0;
}
input::-ms-clear {
  display: none;
}
td {
  vertical-align: middle !important;
}

/* 浮动公共样式 */
.left {
  float: left;
  _display: inline;
}
.right {
  float: right;
  _display: inline;
}
.clear:after {
  display: block;
  content: "";
  clear: both;
}
.clear {
  zoom: 1;
}

/*滚动条美化*/
/*
    原生的滚动条太丑了
    所以自定义试试
    貌似只兼容webkit内核的浏览器
    如果有怪异行为，请删除或者注释下边的CSS 
  */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* 正常情况下滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

/* 鼠标悬浮在该类指向的控件上时滑块的样式 */
:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

/* 鼠标悬浮在滑块上时滑块的样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

/* 正常时候的主干部分 */
::-webkit-scrollbar-track {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: inherit;
}

/* 鼠标悬浮在滚动条上的主干部分 */
::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: inherit;
}

/*标签输入器 */
#app .vue-input-tag-wrapper {
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  /* height: 30px; */
}

#app .vue-input-tag-wrapper {
  border: 1px solid #e4e7ed;
  border-radius: 2px;
  margin-top: 6px;
}

#app .vue-input-tag-wrapper > .input-tag {
  border: 1px solid #fff;
  color: #fff;
  background: #4a90e2;
}
#app .vue-input-tag-wrapper > .input-tag > .remove {
  color: #fff;
}

/*弹出层改写 */
#app .el-dialog__header {
  padding: 0 !important;
  height: 40px;
  background: #2f4050;
}

#app .el-dialog__title {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  margin-left: 23px;
}

#app .el-dialog__headerbtn {
  top: 3px;
  right: 5px;
  font-size: 25px;
  color: #fff;
}

#app .el-dialog__headerbtn > i {
  color: #fff;
}

#app .el-radio__label {
  padding-left: 2px;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

#app .el-dialog__body {
  font-size: 12px;
}

#app .el-dialog__footer {
  text-align: center;
}

#app .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
#app .el-dialog .el-dialog__body {
  /* flex: 1; */
  /* overflow: auto; */
}

/*按钮改写 */
#app .el-button--success {
  background: #50bfa5;
  border-color: #50bfa5;
}

#app .el-button--success:focus,
.el-button--success:hover {
  background: #50bfa5;
  border-color: #50bfa5;
}

/*头部改写 */
#app .el-page-header {
  height: 40px;
  padding-left: 10px;
}

#app .el-page-header__content {
  font-size: 16px;
  line-height: 40px;
  font-weight: 400;
}

#app .el-page-header__title {
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
}

/*选项卡*/
#app .el-tabs__item {
  font-weight: 400;
}

#app .el-tabs__content{
  margin:0 15px;
}

#app .el-tabs{
  /* padding-left: 15px; */
}

#app .el-tabs__nav{
  margin-left: 15px;
}

/*input改写*/
#app .el-input__inner {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: #666;
  border-radius: 2px;
  /*padding: 0 12px;*/
}

#app .el-textarea__inner {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: #666;
  padding: 0 12px;
  line-height: 2em;
}

/*省市地三联 */
#app .distpicker-address-wrapper select{
  font-size: 14px;
  color: #666;
  border-radius: 2px;
  line-height: 40px;
  padding:0;
}

/*表格边距 */
#app .tab {
  margin: 0 10px;
}

#app {
  /* width: 1920px; */
  height: 100%;
}
</style>
