<template>
  <div class="goods">
    <div class="goods-title">
      <div>说明</div>
      <p>
        1、旗下门店添加的商品在此进行审核操作。
        <br />2、操作列点击审核按钮即可进行审核操作，审核状态选择通过代表审核通过，必须填写佣金比例；审核状态选择驳回即审核不通过。
      </p>
    </div>
    <div class="soso">
      <div class="brand">
        <span class="zi">门店：</span>
        <div class="sele-box">
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
      </div>
      <div class="brand">
        <span class="zi">审核状态：</span>
        <div class="sele-box">
          <el-select v-model="auditStatus" filterable placeholder="请选择审核状态" @change="getList()">
            <el-option label="全部" value></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核失败" value="2"></el-option>
          </el-select>
        </div>
      </div>
      <div class="brand">
        <!-- 摆设而已~两个sele都有@change事件，他图这么画了 我就加上吧,当刷新用吧-->
        <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
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
                <span @click="open(item)" v-if="item.auditStatus !='1'">审核</span>
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
    <el-dialog title="审核" :visible.sync="dialogVisible" width="30%">
      <div class="SH">
        <span class="SH-title">
          <span class="xing">*</span> 审核状态：
        </span>
        <el-radio v-model="radio" label="1">通过</el-radio>
        <el-radio v-model="radio" label="2">驳回</el-radio>
      </div>
      <div class="no" v-if="radio == 2">
        <span class="xing">*</span> 驳回原因：
        <el-input
            placeholder="请输入驳回原因"
            v-model="reason"
            class="com-input"
          ></el-input>
      </div>
      <div class="yes" v-if="radio == 1">
        <div>
          <span class="xing">*</span> 佣金比例：
          <el-input
            placeholder="请输入店铺提成比例"
            v-model="commissionPercent"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            class="com-input"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shenhe()" size="small">确 定</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
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
      if (this.commissionPercent == "" && this.radio == "1") {
        this.$message.error("请输入店铺提成比例");
        return;
      }

      if (this.reason == "" && this.radio == "2") {
        this.$message.error("请输入驳回原因");
        return;
      }
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
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
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
  margin:0 10px;
}

.SH {
  width: 200px;
  /* margin: 0 auto; */
  /* text-align: center; */
  margin-top: 20px;
  margin-left: 67px;
  margin-bottom: 35px;
}

.no {
  font-size: 12px;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  /* color: rgba(246, 77, 98, 1); */
  line-height: 17px;
  margin-left: 67px;
}

.yes {
  width: 500px;
  margin: 0 auto;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  /* color: rgba(246, 77, 98, 1); */
  line-height: 17px;
  margin-left: 67px;
}

.com {
  margin-top: 10px;
}

.sele-box {
  width: 110px;
  display: inline-block;
}

.goods-title {
  padding: 16px 0;
  background: #e4e9ef;
  border-radius: 2px;
  margin-bottom: 20px;
}

.goods-title > div {
  font-size: 20px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(74, 74, 74, 1);
  line-height: 28px;
  text-indent: 15px;
  margin-bottom: 18px;
}

.goods-title > p {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 26px;
  padding-left: 35px;
}
.zi {
  font-size: 14px;
  /* margin-right: 5px; */
}

.SH-title {
  margin-right: 10px;
}

.xing {
  color: #f64d62;
}

.com-input {
  width: 209px;
}

.goods >>> .el-dialog__headerbtn{
  top: 7px!important;
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