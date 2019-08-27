<template>
  <div class="room">
    <div class="rom-soso">
      <div class="keywords">
        <el-input v-model="keywords" placeholder="请输入房间名称"></el-input>
      </div>
      <div class="soso-btns">
        <el-button type="primary" @click="getlist()">搜索</el-button>
        <el-button type="success" plain @click="add()">添加</el-button>
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
                <span @click="getinfo(el)">编辑</span>
                <span>打标签</span>
                <span>二维码</span>
                <span style="color:red;" @click="delroom(el)">删除</span>
              </td>
            </tr>
          </template>
          <tr class="main_info" v-else>
            <td colspan="6">暂无房间</td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%" center>
      <div class="add">
        <div class="input-box">
          名称：
          <el-input type="text" v-model="name" placeholder="请输入房间名称 1-30字"></el-input>
        </div>
        <div class="sele-box">
          <div>是否公开：</div>
          <el-select v-model="kai" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </div>
        <div class="tag-box">
          <div>标签：</div>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </div>
      <div class="info">
        <div>简介：</div>
        <el-input type="textarea" :rows="4" v-model="summary" placeholder="请输入房间简介"></el-input>
      </div>
      <div class="pic">
        <div class="pic-title">
          <div>图片</div>
          <p>
            请上传png,jpg,jpeg等规范格式的图片，大小不能超过5MB 。
            如发现图片无法删除的情况，请先清除浏览器缓存或者换个浏览器再操作。
            如发现图片中带有色情、政治等内容，我方将予以删除房间操作，最终解释权由寒舍信息科技（常州）有限公司所有。
          </p>
          <div class="update">
            <!-- 案例 -->
            <div class="img-box">
              <p class="image-tips">封面</p>
              <el-upload
                class="avatar-uploader"
                :action="actionPath"
                :data="postdata"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="roompic" :src="roompic" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="img-box">
              <el-upload
                class="avatar-uploader"
                :action="actionPath"
                :data="postdata"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                :show-file-list="false"
                :on-success="handleAvatarSuccess3"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="pic2.url" :src="pic2.url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="img-box">
              <el-upload
                class="avatar-uploader"
                :action="actionPath"
                :data="postdata"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                :show-file-list="false"
                :on-success="handleAvatarSuccess4"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="pic3.url" :src="pic3.url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="img-box">
              <el-upload
                class="avatar-uploader"
                :action="actionPath"
                :data="postdata"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                :show-file-list="false"
                :on-success="handleAvatarSuccess5"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="pic4.url" :src="pic4.url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="img-box">
              <el-upload
                class="avatar-uploader"
                :action="actionPath"
                :data="postdata"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                :show-file-list="false"
                :on-success="handleAvatarSuccess6"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="pic5.url" :src="pic5.url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="img-box">
              <el-upload
                class="avatar-uploader"
                :action="actionPath"
                :data="postdata"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                :show-file-list="false"
                :on-success="handleAvatarSuccess7"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="pic6.url" :src="pic6.url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="img-box">
              <el-upload
                class="avatar-uploader"
                :action="actionPath"
                :data="postdata"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                :show-file-list="false"
                :on-success="handleAvatarSuccess8"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="pic7.url" :src="pic7.url" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "room",
  data() {
    return {
      info: "房间",
      keywords: "",
      list: [],
      dialogVisible: false,
      name: "",
      kai: "1",
      //标签支持
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      //图片列表支持 我是真的封装不好了
      pic1: {
        originalFilename: "",
        url: "",
        uploadTime: "",
        fileSize: "",
        realPath: ""
      },
      pic2: {
        originalFilename: "",
        url: "",
        uploadTime: "",
        fileSize: "",
        realPath: ""
      },
      pic3: {
        originalFilename: "",
        url: "",
        uploadTime: "",
        fileSize: "",
        realPath: ""
      },
      pic4: {
        originalFilename: "",
        url: "",
        uploadTime: "",
        fileSize: "",
        realPath: ""
      },
      pic5: {
        originalFilename: "",
        url: "",
        uploadTime: "",
        fileSize: "",
        realPath: ""
      },
      pic6: {
        originalFilename: "",
        url: "",
        uploadTime: "",
        fileSize: "",
        realPath: ""
      },
      pic7: {
        originalFilename: "",
        url: "",
        uploadTime: "",
        fileSize: "",
        realPath: ""
      },
      actionPath: "https://upload.qiniup.com",
      baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url
      postdata: { token: "" },
      roompic: "",
      summary: "",
      flage: 0,
      title: "",
      roomId: ""
    };
  },
  methods: {
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        keywords: this.keywords,
        pageSize: "100"
      };
      this.$post("/shopsLinkMan/getRoomsList", parmars).then(res => {
        if (res.error == "00") {
          this.list = res.result.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //删除房间
    delroom(item) {
      this.$confirm("您确认删除此房间？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmars = {
            shopsRoomId: item.shopsRoomId
          };
          this.$post("/shopsLinkMan/deleteShopsRoom", parmars).then(res => {
            console.log(res);
            if (res.error == "00") {
              this.$message({
                type: "success",
                message: "删除房间成功!"
              });
            } else {
              this.$message.error(res.msg);
            }
            this.getlist();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    add() {
      if (this.dialogVisible) {
        this.dialogVisible = false;
      } else {
        this.dialogVisible = true;
        this.flage = 0;
        this.title = "新增房间";
      }
    },

    //标签输入器支持
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //上传支持
    //获取七牛云token
    getToken() {
      this.$get("/qiniu/getUpToken").then(res => {
        this.postdata.token = res;
      });
    },
    // 处理上传事件

    //上船前的检测--公用
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    handleAvatarSuccess3(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      let time = Date.parse(new Date());
      this.pic2.url = picurl;
      this.pic2.originalFilename = picname;
      this.pic2.uploadTime = this.timestampToTime(time);
    },
    handleAvatarSuccess4(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      let time = Date.parse(new Date());
      this.pic3.url = picurl;
      this.pic3.originalFilename = picname;
      this.pic3.uploadTime = this.timestampToTime(time);
    },
    handleAvatarSuccess5(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      let time = Date.parse(new Date());
      this.pic4.url = picurl;
      this.pic4.originalFilename = picname;
      this.pic4.uploadTime = this.timestampToTime(time);
    },
    handleAvatarSuccess6(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      let time = Date.parse(new Date());
      this.pic5.url = picurl;
      this.pic5.originalFilename = picname;
      this.pic5.uploadTime = this.timestampToTime(time);
    },
    handleAvatarSuccess7(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      let time = Date.parse(new Date());
      this.pic6.url = picurl;
      this.pic6.originalFilename = picname;
      this.pic6.uploadTime = this.timestampToTime(time);
    },
    handleAvatarSuccess8(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      let time = Date.parse(new Date());
      this.pic7.url = picurl;
      this.pic7.originalFilename = picname;
      this.pic7.uploadTime = this.timestampToTime(time);
    },
    //上传完成后的方法--封面
    handleAvatarSuccess(res, file) {
      console.log(res.url);
      this.roompic = this.baseurl + res.url;
    },
    // 时间整理
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000 var date = new Date(timestamp*1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getToken() {
      this.$get("/qiniu/getUpToken").then(res => {
        this.postdata.token = res;
      });
    },
    save() {
      let drool = [];
      if (this.pic2.url) {
        drool.push(this.pic2);
      } else if (this.pic3.url) {
        drool.push(this.pic3);
      } else if (this.pic4.url) {
        drool.push(this.pic4);
      } else if (this.pic5.url) {
        drool.push(this.pic5);
      } else if (this.pic6.url) {
        drool.push(this.pic6);
      } else if (this.pic7.url) {
        drool.push(this.pic7);
      }

      if (this.name == "") {
        this.$message.error("请输入房间名称");
      } else if (this.roompic == "") {
        this.$message.error("请上传房间封面");
      } else if (this.summary == "") {
        this.$message.error("请输入房间描述");
      } else if (this.dynamicTags.length == 0) {
        this.$message.error("请添加房间标签");
      } else if (this.flage == 0) {
        let parmars = {
          shopsId: sessionStorage.getItem("shopsId"),
          roomGoodsSkuList: "[]",
          roomUserList: "[]",
          roomName: this.name,
          isOpen: this.kai,
          roomLableList: this.dynamicTags.join(","),
          roomPicList: JSON.stringify(drool),
          summary: this.summary,
          imageUrl: this.roompic
        };
        this.$post("/shopsLinkMan/addShopsRoom", parmars).then(res => {
          if (res.error == "00") {
            this.getlist();
            this.$message("添加房间成功！");
            this.add();
          }
        });
      } else {
        //进入修改逻辑
        let parmars = {
          shopsId: sessionStorage.getItem("shopsId"),
          shopsRoomId: this.roomId,
          roomGoodsSkuList: "[]",
          roomUserList: "[]",
          roomName: this.name,
          isOpen: this.kai,
          roomLableList: this.dynamicTags.join(","),
          roomPicList: JSON.stringify(drool),
          summary: this.summary,
          imageUrl: this.roompic
        };
        this.$post("/shopsLinkMan/updateShopsRoom", parmars).then(res => {
          if (res.error == "00") {
            this.getlist();
            this.$message("修改房间信息成功");
            this.getinfo();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    //为了展示房间信息并且编辑，获取一下
    getinfo(el) {
      this.add();
      this.flage = 1;
      this.title = "房间详情";
      this.roomId = el.shopsRoomId;
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        shopsRoomId: el.shopsRoomId
      };
      this.$post("/shopsLinkMan/getRoomsDetail", parmars).then(res => {
        if (res.error == "00") {
          let drool = res.result;
          this.name = drool.roomName;
          this.kai = drool.isOpen.toString();
          this.dynamicTags = drool.roomLabels.split(",");
          this.summary = drool.summary;
          this.roompic = drool.imageUrl;
          if (drool.pic[1]) {
            this.pic2 = drool.pic[1];
          }
          if (drool.pic[2]) {
            this.pic3 = drool.pic[2];
          }
          if (drool.pic[3]) {
            this.pic4 = drool.pic[3];
          }
          if (drool.pic[4]) {
            this.pic5 = drool.pic[4];
          }
          if (drool.pic[5]) {
            this.pic6 = drool.pic[5];
          }
          if (drool.pic[6]) {
            this.pic7 = drool.pic[6];
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  mounted() {
    this.getToken();
    this.getlist();
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

.input-box {
  width: 600px;
  float: left;
  font-size: 16px;
  font-weight: 600;
}

.add {
  overflow: hidden;
}

.sele-box {
  width: 100px;
  float: left;
  margin-left: 100px;
  font-size: 16px;
  font-weight: 600;
}

.tag-box {
  float: left;
  margin-left: 30px;
  font-size: 16px;
  font-weight: 600;
}

.tab {
  margin-top: 20px;
}

/*标签支持*/
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.info {
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
}

.pic-title > div {
  font-size: 16px;
  font-weight: 600;
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

/*t图片上传*/
.update {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 140px;
  display: block;
}

.img-box {
  width: 160px;
  height: 140px;
  border: 1px dashed #e2e9f0;
  position: relative;
  float: left;
}

.image-tips {
  width: 100%;
  height: 20px;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  font: 12px/20px "";
  text-align: center;
}
</style>