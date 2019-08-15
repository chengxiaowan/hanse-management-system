<template>
  <div class="brand">
    <div class="brand-title">
      <p class="b-title">说明</p>
      <p class="b-body">1、二维码可生成带有酒店/民宿品牌信息的小程序码。</p>
      <p class="b-body">2、酒店/民宿品牌下有门店时，请先删除门店，在删除对应的品牌。</p>
    </div>
    <div class="add">
      <el-button type="success" plain @click="add">
        <i class="el-icon-circle-plus-outline"></i>
        添加
      </el-button>
    </div>
    <div class="tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="50%">名称</th>
            <th width="15%">审核状态</th>
            <th width="15%">创建日期</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length !=0">
            <tr v-for="item in list" :key="item.createTime">
              <td>{{item.brandName}}</td>
              <td>通过</td>
              <td>{{item.createTime}}</td>
              <td>
                <span @click="view(item)">查看</span>
                <span>二维码</span>
                <span style="color:red;">删除</span>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4">暂是没有记录哦~</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "brand",
  data() {
    return {
      info: "品牌管理",
      list: []
    };
  },
  methods: {
    //获取数据
    getList() {
      this.$post("/shopsBrand/shopsBrandList").then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        }
      });
    },
    //新增
    add() {
      this.$router.push({
        name: "brandsadd"
      });
    },
    view(item){
      sessionStorage.setItem("shopsBrandId",item.shopsBrandId)
      sessionStorage.setItem("labels",item.labels)
      console.log(item)
      this.$router.push({
        name: "brandsadd"
      })
    }
  },
  //挂载生命周期
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.brand {
  height: 100%;
  background: #fff;
  padding: 15px;
}
.brand-title {
  height: 123px;
  background: #e4e9ef;
  border-radius: 4px;
}

.b-title {
  font-size: 20px;
  font-weight: 600;
  color: #4a4a4a;
  line-height: 28px;
  text-indent: 15px;
  padding-top: 10px;
}

.b-body {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 9px;
  margin-left: 25px;
}

.add {
  margin-top: 20px;
  margin-bottom: 20px;
}

/*表格样式*/

/*去掉表头边框+背景*/
th {
  border: 1px solid transparent !important;
  background: #e4e9ef;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #5b5b5b;
}

td {
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #5b5b5b;
}

td > span {
  margin-left: 14px;
  color: #4a90e2;
  display: none;
  cursor: pointer;
}

tr:hover > td > span {
  display: inline;
}
</style>