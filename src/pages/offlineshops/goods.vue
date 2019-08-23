<template>
  <div class="goods">
    <div class="goods-soso">
      <div class="keywords">
        <el-input type="text" placeholder="请输入商品名称"></el-input>
      </div>
      <div class="type">
        分类：
        <el-select v-model="type" filterable placeholder="请选择">
          <el-option label="全部" value></el-option>
        </el-select>
      </div>
      <div class="type">
        审核状态：
        <el-select v-model="audit" filterable placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核失败" value="2"></el-option>
          <el-option label="等待审核" value="0"></el-option>
        </el-select>
      </div>
      <div class="type">
        <el-button type="primary">搜索</el-button>
        <el-button type="success" plain @click="addgoods">添加</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="15%">商品名称</th>
            <th width="10%">分类</th>
            <th width="15%">图片</th>
            <th width="10%">销售价（元）</th>
            <th width="8%">佣金比例（%）</th>
            <th width="8%">预估收益（元）</th>
            <th width="7%">审核状态</th>
            <th width="7%">上架状态</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
          <tr v-for="item in list" :key="item.shopsGoodsId">
            <td>{{item.name}}</td>
            <td>{{item.typeName}}</td>
            <td>
                <img :src="item.image" alt="" style="width:60px">
            </td>
            <td>{{item.price}}</td>
            <td>{{item.commissionPercent}}</td>
            <td>{{(item.price * (item.commissionPercent/100)).toFixed(2)}}</td>
            <td>--</td>
            <td>{{item.isSOnell}}</td>
            <td>
              <span style="color:red">更多</span>
              <span style="color:red">下架</span>
              <span style>上架</span>
            </td>
          </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="9">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      info: "商品！！",
      keywords: "",
      type: "",
      audit: "",
      onSell: "",
      list: []
    };
  },
  methods: {
    //获取数据
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        // pageSize: "100",
        // keywords:this.keywords,
        // audit:this.audit,
        // type:"",
      };
      this.$post("/shops/shopsGoodsList", parmars).then(res => {
          if(res.error == "00"){
              console.log(res)
              if(res.error == "00"){
                  this.list = res.result.list
              }else{
                  this.$message.error(res.msg)
              }
          }
      });
    },

    //添加商品
    addgoods(){
        this.$router.push({
            name:"addgoods"
        })
    }
  },
  mounted(){
      this.getlist()
  }
};
</script>

<style scoped>
.goods {
  height: 1000px;
  overflow: auto;
  padding: 15px;
}

.goods-soso {
  width: 100%;
  overflow: hidden;
}

.keywords {
  width: 267px;
  float: left;
}

.type {
  float: left;
  margin-left: 10px;
}

.tab {
  margin-top: 15px;
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