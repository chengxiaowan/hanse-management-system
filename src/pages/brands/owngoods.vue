<template>
  <div class="owngoods">
    <div class="goods-soso">
      <div class="keywords">
        <el-input placeholder="请输入商品名称" v-model="keywords"></el-input>
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
            <th width="30%">商品名称</th>
            <th width="10%">图片</th>
            <th width="10%">价格（元）</th>
            <th width="25%">标签</th>
            <th width="15%">上/下架状态</th>
            <th width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>这是一个店铺</td>
            <td>
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt
                class="img-box"
              />
            </td>
            <td>2999.00</td>
            <td>测，试</td>
            <td>已上架</td>
            <td>
              <span>下架</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
  </div>
</template>
<script>
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
      total: ""
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
    },
    add() {
      this.$router.push({
        name: "addowngoods"
      });
    },
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
  margin-right: 28px;
}

.goods-type {
  float: left;
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