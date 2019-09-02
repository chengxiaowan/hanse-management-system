<template>
  <div class="addroom">
    <el-page-header @back="goBack" content="新增门店"></el-page-header>
    <el-divider></el-divider>
    <div class="flex-row">
      <div>
        名称：
        <el-input placeholder="请输入房间名称，1~30字"></el-input>
      </div>
      <div>
        是否公开：
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </div>
      </div>
      <div>
          标签：
          
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addroom",
  data() {
    return {
      info: "房间添加",
      name: ""
    };
  },
  methods: {
    goBack() {
      history.go(-1);
    }
  }
};
</script>

<style scoped>
.addroom {
  background: #fff;
  height: 100vh;
}

.el-page-header {
  height: 50px;
  line-height: 50px;
}

.el-divider {
  margin: 0 auto;
}

.flex-row {
  display: flex;
  width: 100%;
}
</style>
    
