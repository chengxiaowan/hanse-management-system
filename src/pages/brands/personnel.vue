<template>
  <div class="personnel">
    <div class="personnel-title">
      <div>说明</div>
      <p>1、该页面用来管理品牌下面各门店的负责人(一般情况下为店铺的直接受益人)信息。</p>
      <p>2、门店负责人是该门店的直接受益人，门店里的商品售出后，可享受佣金，并且可以管理其门店里的商品，销售人员，服务等。</p>
      <p>3、一个门店只有一名门店负责人，品牌负责人在给门店负责人创建好账号后，只需要通知对应的人员登录我方后台创建其名下的门店及其他信息即可。</p>
    </div>
    <div class="soso-box">
        <div class="soso-inputs">
            <el-input v-model="keywords" placeholder="请输入负责人姓名"></el-input>
        </div>
        <div class="soso-btns">
            <el-button type="primary"><i class="el-icon-search"></i>搜索</el-button>
            <el-button type="success">添加</el-button>
        </div>
    </div>
    <div class="user-list">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="20%">姓名</th>
            <th width="20%">手机号</th>
            <th width="20%">邮箱</th>
            <th width="20%">备注</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>张三</td>
              <td>138000000</td>
              <td>text@163.com</td>
              <td>这是一个备注信息</td>
              <td>
                <span>查看</span>
                <span style="color:red;">删除</span>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
    <div class="adduser">
      
    </div>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      info: "负责人",
      keywords:""
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.personnel-title{
    padding: 10px 0;
    background: #E4E9EF;
    border-radius: 4px;
}

.personnel-title > div{
    font-size: 20px;
    line-height: 28px;
    color: #4a4a4a;
    text-indent: 15px;
    padding-bottom: 5px;
}

.personnel-title > p{
    font-size: 14px;
    line-height:10px;
    color: #4a4a4a;
    font-weight: 400;
    text-indent: 25px;
}

.soso-box{
    margin-top: 24px;
    overflow: hidden;
    margin-bottom: 25px;
}
.soso-inputs{
    width: 350px;
    float: left;
}
.soso-btns{
    float: left;
    margin-left:20px;
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