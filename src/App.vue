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


  /* 浮动公共样式 */
  .left{ float:left; _display:inline; }
  .right{ float:right; _display:inline; }
  .clear:after{ display:block; content:''; clear:both;}
  .clear{ zoom:1;}


  #app{
    /* width: 1920px; */
    height: 100%;
  }
</style>
