<template>
  <div class="owngoods">
    <div class="goods-soso">
      <div class="keywords">
        <el-input placeholder="请输入商品名称" v-model="keywords"></el-input>
      </div>
      <div class="goods-type">
        <span class="zi">审核状态</span>
        <div class="sele-box">
          <el-select v-model="auditStatus" placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核失败" value="2"></el-option>
          </el-select>
        </div>
      </div>
      <div class="goods-type">
        <span class="zi">上/下架状态</span>
        <div class="sele-box">
          <el-select v-model="type" placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </div>
      </div>
      <div class="goods-btns">
        <el-button type="primary" style="margin-right:18px;" icon="el-icon-search" @click="soso">搜索</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="add()">筛选商品</el-button>
      </div>
    </div>
    <div class="teb">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="20%">商品名称</th>
            <th width="10%">图片</th>
            <th width="10%">价格（元）</th>
            <th width="20%">标签</th>
            <th width="15%">审核状态</th>
            <th width="15%">上/下架状态</th>
            <th width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.id">
              <td>{{item.name}}</td>
              <td>
                <img :src="item.pic" :alt="item.name" class="image-box" />
              </td>
              <td>{{item.price}}</td>
              <td>????</td>
              <td v-if="item.auditStatus == 0">待审核</td>
              <td v-if="item.auditStatus == 1">审核通过</td>
              <td v-if="item.auditStatus == 2" style="color:#D0021B">审核失败</td>
              <td v-if="item.isOnsell == 0 && item.auditStatus == 1">下架</td>
              <td v-if="item.isOnsell == 1 && item.auditStatus == 1">上架</td>
              <td v-if="item.auditStatus == 0 || item.auditStatus == 2">--</td>
              <td>
                <span v-if="item.isOnsell == 0 && item.auditStatus == 1" @click="onSell(item.id,1)">上架</span>
                <span v-if="item.isOnsell == 1 && item.auditStatus == 1" @click="onSell(item.id,0)">下架</span>
                <span v-if="item.auditStatus == 0 || item.auditStatus == 2" style="color:#D0021B">删除</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
  </div>
</template>
<script>
import { get } from "http";
export default {
  name: "shops",
  data() {
    return {
      info: "自营商品",
      keywords: "",
      type: "",
      //分页处理
      pageNo: 1, //当前页
      total: "", //总条目，
      list: "", //数据列表,
      total: "",
      auditStatus: ""
    };
  },
  methods: {
    //分页处理
    page(e) {
      this.pageNo = e;
      //在下边触发获取数据
    },

    //搜索分页冲突解决
    soso() {
      //之前搜索和分页有小冲突，现在修复，之前的改天修复
      this.pageNo = 1;
      //在这里触发获取数据
      this.getlist();
    },
    //跳转到添加
    add() {
      this.$router.push({
        name: "addowngoods"
      });
    },
    //获取数据
    getlist() {
      let parmars = {
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        keywords: this.keywords,
        pageNo: this.pageNo,
        isOnsell: this.type
      };
      this.$post("/shopsBrand/getShopsBrandMGoodsList/0", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
          this.pageNo = res.result.pageNum;
          this.total = res.result.total;
        }
      });
    },
    page(e) {
      this.pageNo = e;
      this.getlist()
    },
    //上下架
    onSell(id,type){
      let parmars = {
        isOnsell:type
      }
      this.$post('/shopsBrand/updateShopsBrandMGoodsStatus',parmars).then(res=>{
        if(type == 1 || res.error == "00"){
          this.$message("上架商品成功")
          return
        }
        if(type == 0 && res.error == "00"){
          this.$message("下架商品成功")
          return
        }
        if(res.error != "00"){
          this.$message.error(res.msg)
        }
      })
    }
      },
  mounted() {
    this.getlist();
  }
};
</script>
<style scoped>
.owngoods {
  padding-bottom: 300px;
}

.goods-soso {
  margin-top: 27px;
}
.goods-soso {
  overflow: hidden;
}

.keywords {
  width: 267px;
  float: left;
  margin-right: 8px;
}

.goods-type {
  float: left;
  margin-left: 18px;
}

.sele-box {
  display: inline-block;
  width: 100px;
}

.zi {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-right: 8px;
}

.goods-btns {
  float: left;
  margin-left: 28px;
}

.teb {
  margin-top: 28px;
}

.img-box {
  width: 58px;
  height: 38px;
}

.image-box {
  width: 58px;
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
  vertical-align: middle;
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