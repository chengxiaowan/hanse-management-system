<template>
  <div class="room">
    <div class="rom-soso">
      <div class="keywords">
        <el-input v-model="keywords" placeholder="请输入房间名称"></el-input>
      </div>
      <div class="soso-btns">
        <el-button type="primary">搜索</el-button>
        <el-button type="success" plain>添加</el-button>
      </div>
    </div>
    <div class="tab">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th width="25%">房间名称</th>
            <th width="25%">房间标签</th>
            <!--<th width="10%">创建日期</th>-->
            <th width="10%">是否公开</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list .length!= 0">
            <tr v-for="el in list" :key="el.roomId">
              <td>{{el.roomName}}</td>
              <td>{{el.roomLabels||'--'}}</td>
              <!--<td>{{el.createTime}}</td>-->
              <td>{{el.isOpen=='1'?'是':'否'}}</td>
              <td>
                <a class="btn btn-success" title="打标签" @click="edit(el.shopsRoomId);">打标签</a>
                <a class="btn btn-success" title="二维码" @click="ewm(el,3)">二维码</a>
                <a
                  class="btn btn-success"
                  title="编辑"
                  @click="editRoom(el.shopsRoomId,el.roomLabels);"
                >编辑</a>
                <a class="btn btn-default" title="删除" @click="delRoom(el.shopsRoomId);">删除</a>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="6">暂无房间</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "room",
  data() {
    return {
      info: "房间",
      keywords: "",
      list: []
    };
  },
  methods: {
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        pageSize: "100"
      };
      this.$post("", parmars);
    }
  }
};
</script>

<style scoped>
.room {
  padding: 15px;
  height: 1000px;
  padding-bottom: 150px;
  overflow: auto;
  background: #fff;
}

.rom-soso {
  overflow: hidden;
}

.keywords {
  width: 260px;
  float: left;
}

.soso-btns {
  float: left;
  margin-left: 10px;
}

.tab {
  margin-top: 20px;
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