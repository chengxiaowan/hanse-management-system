<template>
  <div class="goods">
    <div class="soso">
      <div class="brand">
        门店:
        <el-select v-model="brand" filterable placeholder="请选择" @change="getList()">
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in brandlist"
            :key="item.shopsId"
            :label="item.shopsName"
            :value="item.shopsId"
          ></el-option>
        </el-select>
      </div>
      <div class="brand">
        审核状态:
        <el-select v-model="auditStatus" filterable placeholder="请选择审核状态" @change="getList()">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核失败" value="2"></el-option>
        </el-select>
      </div>
    </div>
    <div class="tab">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="15%">门店名称</th>
            <th width="15%">商品名称</th>
            <th width="10%">分类</th>
            <th width="10%">品牌</th>
            <th width="10%">图片</th>
            <th width="10%">审核状态</th>
            <th width="10%">提成比例(%)</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length != 0">
            <tr v-for="item in list" :key="item.id">
              <td>{{item.shopsName}}</td>
              <td>{{item.name}}</td>
              <td>{{item.typeName}}</td>
              <td>{{item.brandName}}</td>
              <td>
                <img :src="item.image" width="60" alt />
              </td>
              <td
                :class="{'htz-red':item.auditStatus=='2'}"
              >{{item.auditStatus=='0'?'待审核':(item.auditStatus=='1'?'审核通过':'审核失败')}}</td>
              <td v-if="item.auditStatus !='1'">-</td>
              <td v-else>{{item.commissionPercent}}</td>
              <td class="btn-hide">
                <span @click="open(item)">审核</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="9">没有相关数据</td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="page"></el-pagination>
    <el-dialog title="审核" :visible.sync="dialogVisible" width="30%" center>
      <div class="SH">
        <el-radio v-model="radio" label="1">通过</el-radio>
        <el-radio v-model="radio" label="2">驳回</el-radio>
      </div>
      <div class="no" v-if="radio == 2">
        驳回原因：
        <el-input type="textarea" rows="3" v-model="reason" placeholder="请输入驳回原因..."></el-input>
      </div>
      <div class="yes" v-if="radio == 1">
        <div>
          店铺佣金比例：
          <el-input placeholder="请输入店铺提成比例" v-model="commissionPercent"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="shenhe()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      info: "产品审核",
      brand: "",
      brandlist: [],
      list: [],
      auditStatus: "0",
      dialogVisible: false,
      radio: "1",
      commissionPercent: "", //佣金比例
      reason: "", //驳回原因
      goodsid: "",
      pageNo: 1,
      total: ""
    };
  },
  methods: {
    //获取商品列表
    getList() {
      let parmars = {
        shopsId: this.brand,
        auditStatus: this.auditStatus,
        pageSize: "10",
        pageNo: this.pageNo
      };
      this.$post("/shops/showShopsGoods", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
          this.total = res.result.total;
          this.pageNo = res.result.pageNum;
        }
      });
    },

    //fenye
    page(e) {
      this.pageNo = e;
      this.getList();
    },
    //模态框
    open(item) {
      if (this.dialogVisible == false) {
        this.dialogVisible = true;
        this.commissionPercent = "";
        this.reason = "";
        this.id = item.id;
        this.radio = "1";
      } else {
        this.dialogVisible = false;
      }
    },

    //审核
    shenhe() {
      let parmars = {
        shopsGoodsId: this.id,
        auditStatus: this.radio,
        commissionPercent: this.commissionPercent || 0.0,
        reason: this.reason,
        roleList: ""
      };

      this.$post("/shops/updateAShopsGoodsById", parmars).then(res => {
        if (res.error == "00") {
          this.$message("操作成功");
          this.getList();
          this.open();
        }
      });
    },
    //获取门店列表
    getshops() {
      let parmars = {
        pageSize: "100"
      };

      this.$post("/shops/dataList", parmars).then(res => {
        if (res.error == "00") {
          this.brandlist = res.result.list;
        }
      });
    }
  },
  mounted() {
    this.getshops();
    this.getList();
  }
};
</script>
<style scoped>
.goods {
  padding: 15px;
  height: 1000px;
  padding-bottom: 150px;
  overflow: auto;
  background: #fff;
}

.soso {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.brand {
  float: left;
  margin-right: 15px;
}

.tab {
  width: 100%;
  overflow: auto;
}

.SH {
  width: 200px;
  margin: 0 auto;
  text-align: center;
}

.no {
  font-size: 16px;
  font-weight: 600;
  line-height: 2em;
}

.yes {
  widows: 500px;
  margin: 0 auto;
}

.com {
  margin-top: 10px;
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