<template>
  <div class="brand">
    <div class="brand-title">
        <p class="b-title">说明</p>
        <p class="b-body">1、二维码可生成带有酒店/民宿品牌信息的小程序码。</p>
        <p class="b-body">2、酒店/民宿品牌下有门店时，请先删除门店，在删除对应的品牌。</p>
    </div>
    <div class="add">
        <el-button type="success" plain>
            <i class="el-icon-circle-plus-outline"></i>
            添加
        </el-button>
    </div>
    <div class="tab">
        
    </div>
  </div>
</template>
<script>
export default {
  name: "brand",
  data() {
    return {
      info: "品牌管理"
    };
  }
};
</script>

<style scoped>
.brand{
    height: 100%;
    background: #fff;
    padding: 15px;
}
.brand-title{
    height:123px;
    background: #e4e9ef;
    border-radius: 4px;
}

.b-title{
    font-size: 20px;
    font-weight: 600;
    color: #4a4a4a;
    line-height: 28px;
    text-indent: 15px;
    padding-top: 16px;
}

.b-body{
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-top: 9px;
    margin-left: 25px;
}

.add{
    margin-top: 20px;
    margin-bottom: 20px;
}

</style>