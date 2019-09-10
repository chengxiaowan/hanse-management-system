<template>
  <div class="addroom">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <el-divider></el-divider>
    <div class="flex-row">
      <div class="input-box">
        名称：
        <el-input placeholder="请输入房间名称，1~30字" v-model="name"></el-input>
      </div>
      <div class="input-box">
        <div class="sele-box">
          是否公开：
          <div>
            <el-select v-model="kai" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </div>
        </div>
        <div class="tag-box">
          <div>标签：</div>
          <input-tag placeholder="请输入标签，按回车键生成" v-model="tags" limit="10" addTagOnBlur="true"></input-tag>
        </div>
      </div>
    </div>
    <div class="textarea-box">
      简介：
      <el-input type="textarea" rows="4" v-model="summary" placeholder="请输入房间简介"></el-input>
    </div>
    <div class="upadte-box">
      <div class="upadte-title">
        <div>图片</div>
        <p>
          1、请上传png,jpg,jpeg等规范格式的图片，大小不能超过5MB。
          <br />2、精致封面会吸引更多的人关注哦。
        </p>
      </div>
      <div class="update">
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
            <img v-if="pic" :src="pic" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 案例 -->
        <div class="img-box">
          <el-upload
            class="avatar-uploader"
            :action="actionPath"
            :data="postdata"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="pic1.url" :src="pic1.url" class="avatar" />
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
    <div class="goods">
      <div class="goods-title">
        <span>房间商品</span>
        <div class="btn-box">
          <el-button type="success" @click="dialogVisible = true" size="small">新增</el-button>
        </div>
      </div>
      <div class="tab">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th width="40%">商品名称</th>
              <th width="10%">分类</th>
              <th width="15%">品牌</th>
              <th width="15%">图片</th>
              <th width="10%">销售价</th>
              <th width="10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="addgoodslist.length != 0">
              <tr v-for="item in addgoodslist" :key="item.goodsId">
                <td>{{item.name}}</td>
                <td>{{item.typeName}}</td>
                <td>{{item.brandName}}</td>
                <td>
                  <img class="table-img" :src="item.image" alt />
                </td>
                <td>{{item.price}}</td>
                <td>
                  <span @click="del(item)" style="color:red">删除</span>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="save">
      <el-button type="primary" @click="save()">保存</el-button>
    </div>
    <el-dialog title="加入商品" :visible.sync="dialogVisible" center width="90%">
      <div class="roomgoodsoso">
        <div class="inputs-box">
          <el-input type="text" v-model="keywords" placeholder="请输入商品名称"></el-input>
        </div>
        <div class="seles-box">
          分类：
          <div class="minns-box">
            <el-select v-model="solt" filterable placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in types"
                :key="item.typeId"
                :label="item.name"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="soso-btns">
          <el-button type="primary" icon="el-icon-search" @click="getlist()" size="small">搜索</el-button>
        </div>
      </div>
      <div class="tab">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th width="40%">商品名称</th>
              <th width="10%">分类</th>
              <th width="15%">品牌</th>
              <th width="15%">图片</th>
              <th width="10%">销售价</th>
              <th width="10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="goodslist.length != 0">
              <tr v-for="item in goodslist" :key="item.goodsId">
                <td>{{item.name}}</td>
                <td>{{item.typeName}}</td>
                <td>{{item.brandName}}</td>
                <td>
                  <img class="table-img" :src="item.image" alt />
                </td>
                <td>{{item.price}}</td>
                <td>
                  <span @click="add(item)">加入</span>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6">暂无数据</td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="page"
          page-size="5"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "addroom",
  data() {
    return {
      info: "房间添加",
      name: "",
      kai: "1",
      //标签支持
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      summary: "",
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
      pic: "",
      actionPath: "https://upload.qiniup.com",
      baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url
      postdata: { token: "" },
      flage: 0,
      dialogVisible: false,
      goodslist: [],
      addgoodslist: [],
      title: "新增房间",
      keywords: "",
      types: "",
      solt: "",
      total: "",
      pageNo: "",
      tags: ""
    };
  },
  methods: {
    goBack() {
      sessionStorage.setItem("table2", "room");
      history.go(-1);
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
    // 处理上传事件

    //上船前的检测--公用
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt5M;
    },

    //上传完成后的方法--封面
    handleAvatarSuccess(res, file) {
      console.log(res.url);
      this.pic = this.baseurl + res.url;
    },

    handleAvatarSuccess2(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      let time = Date.parse(new Date());
      this.pic1.url = picurl;
      this.pic1.originalFilename = picname;
      this.pic1.uploadTime = this.timestampToTime(time);
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
    //获取七牛云token
    getToken() {
      this.$get("/qiniu/getUpToken").then(res => {
        this.postdata.token = res;
      });
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

    save() {
      let obj = [];
      if (this.pic1.url) {
        obj.push(this.pic1);
      }
      if (this.pic2.url) {
        obj.push(this.pic2);
      }
      if (this.pic3.url) {
        obj.push(this.pic3);
      }
      if (this.pic4.url) {
        obj.push(this.pic4);
      }
      if (this.pic5.url) {
        obj.push(this.pic5);
      }
      if (this.pic6.url) {
        obj.push(this.pic6);
      }
      if (this.pic7.url) {
        obj.push(this.pic7);
      }
      if (this.name == "") {
        this.$message.error("请输入房间名称");
      } else if (this.pic == "") {
        this.$message.error("请上传房间封面");
      } else if (this.flage == 0) {
        let parmars = {
          shopsId: sessionStorage.getItem("shopsId"),
          roomUserList: "[]",
          roomName: this.name,
          isOpen: this.kai,
          roomLableList: this.tags.join(",") || "",
          roomPicList: JSON.stringify(obj),
          summary: this.summary,
          imageUrl: this.pic
        };
        let roomGoodsSkuList = [];
        for (let i = 0; i < this.addgoodslist.length; i++) {
          let obj = {};
          obj.shopsId = sessionStorage.getItem("shopsId");
          obj.goodsId = this.addgoodslist[i].goodsId;
          roomGoodsSkuList.push(obj);
        }
        parmars.roomGoodsSkuList = JSON.stringify(roomGoodsSkuList);
        this.$post("/shopsLinkMan/addShopsRoom", parmars).then(res => {
          if (res.error == "00") {
            // this.getlist();
            this.$message("新增房间成功！");
            this.goBack();
          }
        });
      } else {
        //进入修改逻辑
        let parmars = {
          shopsId: sessionStorage.getItem("shopsId"),
          shopsRoomId: sessionStorage.getItem("shopsRoomId"),
          roomUserList: "[]",
          roomName: this.name,
          isOpen: this.kai,
          roomLableList: this.tags.join(",") || "",
          roomPicList: JSON.stringify(obj),
          summary: this.summary,
          imageUrl: this.pic
        };
        let roomGoodsSkuList = [];
        for (let i = 0; i < this.addgoodslist.length; i++) {
          let obj = {};
          obj.shopsId = sessionStorage.getItem("shopsId");
          obj.goodsId = this.addgoodslist[i].goodsId;
          obj.goodsId = this.addgoodslist[i].goodsId;
          obj.shopsRoomGoodsId = this.addgoodslist[i].shopsRoomGoodsId || "";
          roomGoodsSkuList.push(obj);
        }
        parmars.roomGoodsSkuList = JSON.stringify(roomGoodsSkuList);
        this.$post("/shopsLinkMan/updateShopsRoom", parmars).then(res => {
          if (res.error == "00") {
            this.$message("修改房间信息成功");
            this.goBack();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    //获取商品列表
    getlist() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        pageSize: 5,
        keywords: this.keywords,
        typeId: this.solt,
        pageNo: this.pageNo
      };
      this.$post("/shopsLinkMan/selectRoomGoodsList", parmars).then(res => {
        if (res.error == "00") {
          this.goodslist = res.result.list;
          this.total = res.result.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getinfo() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId"),
        shopsRoomId: sessionStorage.getItem("shopsRoomId")
      };
      this.$post("/shopsLinkMan/getRoomsDetail", parmars).then(res => {
        if (res.error == "00") {
          this.name = res.result.roomName;
          this.tags = res.result.roomLabels.split(",");
          this.summary = res.result.summary;
          this.kai = res.result.isOpen + "";
          this.pic = res.result.imageUrl;
          this.addgoodslist = res.result.goodsList;
          let drool = res.result;
          if (res.result.pic[0]) {
            this.pic1 = res.result.pic[0];
          }
          if (res.result.pic[1]) {
            this.pic2 = res.result.pic[1];
          }
          if (res.result.pic[2]) {
            this.pic3 = res.result.pic[2];
          }
          if (res.result.pic[3]) {
            this.pic4 = res.result.pic[3];
          }
          if (res.result.pic[4]) {
            this.pic5 = res.result.pic[4];
          }
          if (res.result.pic[5]) {
            this.pic6 = res.result.pic[5];
          }
          if (res.result.pic[6]) {
            this.pic7 = res.result.pic[5];
          }
        }
      });
    },
    add(item) {
      this.$confirm("您确定加入此商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addgoodslist.push(item);
          this.goodslist.splice(item.inedx, 1);
          this.$message({
            type: "success",
            message: "加入成功!"
          });
        })
        .catch(() => {});
    },
    del(item) {
      this.$confirm("您确定移除此商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.shopsRoomGoodsId) {
            let parmars = {
              shopsRoomGoodsId: item.shopsRoomGoodsId
            };
            this.$post("/shopsLinkMan/delShopsRoomGoods", parmars).then(res => {
              if (res.error == "00") {
                this.getinfo();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.addgoodslist.splice(item.inedx, 1);
            this.goodslist.push(item);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {});
    },
    getType() {
      let parmars = {
        level: "1",
        pageSize: "100"
      };
      this.$get("/type/dataList", parmars).then(res => {
        if (res.error == "00") {
          this.types = res.result.list;
          console.log(this.types);
        }
      });
    },
    page(e) {
      this.pageNo = e;
      this.getlist();
    }
  },
  mounted() {
    this.getToken();
    this.getlist();
    if (sessionStorage.getItem("shopsRoomId")) {
      this.flage = 1;
      this.title = "编辑房间";
      this.getinfo();
      this.getType();
    }
  }
};
</script>

<style scoped>
.addroom {
  background: #fff;
  height: 1700px;
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}

.el-page-header {
  height: 50px;
  line-height: 50px;
}

.el-divider {
  margin: 0 auto;
}

.flex-row {
  width: 100%;
  overflow: hidden;
  padding-top: 39px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.input-box {
  width: 690px;
  /* float: left; */
  /* margin-right: 113px; */
  /* margin-left: 85px; */
  margin-bottom: 15px;
}

.sele-box {
  float: left;
  width: 106px;
  margin-right: 30px;
  /* margin-left: 30px; */
}

.tag-box {
  float: left;
  width: 480px;
  margin-left: 30px;
}

.textarea-box {
  width: 1506px;
  margin-left: 85px;
  margin-top: 37px;
}

.upadte-box {
  margin-left: 85px;
  margin-top: 33px;
}

.upadte-title > p {
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(107, 107, 107, 1);
  line-height: 24px;
}

/*t图片上传*/
.update {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 65px;
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
  margin-bottom: 15px;
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

.goods {
  margin-left: 85px;
  overflow: hidden;
}

.goods-title {
  overflow: hidden;
}

.goods-title > span {
  float: left;
}

.goods-title > .btn-box {
  float: right;
  margin-right: 91px;
}

.tab {
  margin-right: 90px;
  margin-top: 11px;
}

.save {
  width: 200px;
  margin: 0 auto;
  margin-top: 43px;
  text-align: center;
}

.table-img {
  width: 58px;
  height: 38px;
}

.roomgoodsoso {
  width: 100%;
  overflow: hidden;
}

.inputs-box {
  width: 300px;
  float: left;
}

.seles-box {
  width: 200px;
  float: left;
  margin-left: 16px;
}

.minns-box {
  width: 150px;
  display: inline-block;
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

.input-box >>> .el-input > .el-input__inner {
  margin-top: 6px;
}

/* .sele-box >>> .el-select {
  margin-top: 6px;
} */

.tag-box >>> .vue-input-tag-wrapper {
  border: 1px solid #e4e7ed;
  border-radius: 2px;
  margin-top: 6px;
}

.tag-box >>> .vue-input-tag-wrapper > .input-tag {
  border: 1px solid #fff;
  color: #fff;
  background: #4a90e2;
}

.tag-box >>> .vue-input-tag-wrapper > .input-tag > .remove {
  color: #fff;
}

.textarea-box >>> .el-textarea {
  margin-top: 6px;
}

.inputs-box >>> .el-input__inner {
  height: 35px;
  border-radius: 2px;
}

.sele-box >>> .el-input__inner {
  height: 35px;
  font-size: 12px;
  line-height: 35px;
}
</style>
    
