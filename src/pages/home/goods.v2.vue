<template>
  <div class="goods">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
        info:"放到后边做，xmind还没写出来，先去处理门店"
    };
  }
};
</script>

<style scoped>
</style>
