<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components:{}
};
</script>
<style>
/* 默认样式 */
  html{overflow-y:hidden; overflow-x: hidden;height: 100%;}
  body,div,ul,li,span,img,input,form{ margin:0; padding:0;}
  body,p,h1,h2,h3,h4,h5,h6,ul,ol,dl,li,dd{ margin:0;}
  ul,ol{padding:0;}
  body{ background:#f2f4f5;height: 100%;}

  body{ font-size:12px;font-family:"冬青黑体简体中文","微软雅黑","宋体",Arial,sans-serif;}
  a{ text-decoration:none; color:#666666; }
  li{ list-style:none; }
  img{ border:none 0;}
  input{ outline:none; border:none; background:none;}
  input,textarea,select{ margin:0; }					
  input,textarea{ padding:0;}
  input::-ms-clear{display:none;}
  td{vertical-align: middle!important}


  /* 浮动公共样式 */
  .left{ float:left; _display:inline; }
  .right{ float:right; _display:inline; }
  .clear:after{ display:block; content:''; clear:both;}
  .clear{ zoom:1;}

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
  background-color: rgba(0, 0, 0, .05);
  border-radius: 2px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
}
 
/* 鼠标悬浮在该类指向的控件上时滑块的样式 */
:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, .2);
  border-radius: 2px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
}
 
/* 鼠标悬浮在滑块上时滑块的样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, .4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
}
 
/* 正常时候的主干部分 */
::-webkit-scrollbar-track {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: inherit;
}
 
/* 鼠标悬浮在滚动条上的主干部分 */
::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .4);
  background-color: inherit;
}

.el-input__inner{
  border-radius: 2px!important;
}

.el-page-header__title{
  font-size: 18px!important;
}

.el-button{
  margin-top:2px !important;
}


  #app{
    /* width: 1920px; */
    height: 100%;
  }
</style>
