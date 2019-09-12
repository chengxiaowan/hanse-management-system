<template>
  <div class="add">
    <div class="info-box">
      <el-page-header @back="goBack" :content="titles" v-if="!bobo"></el-page-header>
      <el-divider v-if="!bobo"></el-divider>
      <div class="input-box">
        <div class="min-box">
          <span class="zi">名称：</span>
          <el-input type="text" placeholder="请输入名称 1-30字以内" v-model="name" maxlength="30"></el-input>
        </div>
        <div class="min-box">
          <div class="minn-box te">
            <span class="zi">所属品牌：</span>
            <el-select v-model="brand" filterable placeholder="请选择" v-if="status != '1'">
              <el-option
                v-for="item in brandlist"
                :key="item.shopsBrandId"
                :label="item.brandName"
                :value="item.shopsBrandId"
              ></el-option>
            </el-select>
            <el-select v-model="brand" filterable placeholder="请选择" disabled v-if="status == '1'">
              <el-option
                v-for="item in brandlist"
                :key="item.shopsBrandId"
                :label="item.brandName"
                :value="item.shopsBrandId"
              ></el-option>
            </el-select>
          </div>
          <div class="minn-box te">
            <span class="zi">类型：</span>
            <el-select v-model="shopsType" filterable placeholder="请选择">
              <el-option label="酒店" value="1"></el-option>
              <el-option label="民宿" value="2"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="input-box">
        <div class="min-box">
          <span class="zi">所在地区：</span>
          <v-distpicker
            @selected="onSelected"
            class="drool"
            :province="select.province"
            :city="select.city"
            :area="select.area"
          ></v-distpicker>
        </div>
        <div class="min-box">
          <span class="zi">详细地址：</span>
          <el-input type="text" v-model="address" placeholder="请输入详细地址"></el-input>
        </div>
      </div>
      <div class="input-box">
        <div class="min-box">
          <span class="zi">简介：</span>
          <el-input type="textarea" v-model="remark" placeholder="请输入简介"></el-input>
        </div>
        <div class="min-box">
          <div>
            标签：
            <span class="tag-tips">建议每个标签2-5字</span>
          </div>
          <input-tag placeholder="添加标签,按回车生成标签。" v-model="tags" limit="10" :addTagOnBlur="true"></input-tag>
        </div>
      </div>
      <div class="input-box">
        <div class="min-box">
          <div class="update-title">
            <div class="zi">图片</div>
            <p>
              1、请上传png,jpg,jpeg等规范格式的图片，大小不能超过5MB。
              <br />2、精致封面会吸引更多的人关注哦。
              <br />2、除封面外，请按照门头、大堂、房间这样的顺序上传图片，请参考
              <span>图片示例</span>。
            </p>
          </div>
        </div>
        <div class="min-box"></div>
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
          <p class="image-tips">门头</p>
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
      <div class="save">
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import title from "../../components/title";
import VDistpicker from "v-distpicker";
export default {
  name: "addShops",
  components: {
    "v-title": title,
    VDistpicker //省市地联动
  },
  data() {
    return {
      info: "门店添加及详情",
      page: "新增门店",
      name: "",
      shopsType: "",
      brand: "",
      brandlist: "",
      master: "",
      linkphone: "",
      remark: "",
      address: "",
      //省市地联动固定写法
      province: "",
      city: "",
      area: "",
      select: { province: "", city: "", area: "" }, //选择框的预选项
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
      pic: "",
      actionPath: "https://upload.qiniup.com",
      baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url
      postdata: { token: "" },
      drool: "",
      flage: 0,
      bobo: 0,
      userId: "",
      tags: "",
      status: ""
    };
  },
  methods: {
    //在完整选择省市地后触发
    onSelected(data) {
      // console.log(data);
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
      this.drool = 1;
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
      // const isJPG = file.type === "image/*";
      const isLt5M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
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

    //获取品牌
    getBrands() {
      this.$post("/shopsBrand/shopsBrandList2").then(res => {
        if (res.error == "00") {
          this.brandlist = res.result;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //保存
    save() {
      //处理图片列表
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
        this.$message.error("请输入门店名称");
      } else if (this.brand == "") {
        this.$message.error("请选择所属品牌");
      } else if (this.drool == "") {
        this.$message.error("请选择所在地区");
      } else if (this.address == "") {
        this.$message.error("请输入详细地址");
      } else if (this.pic == "") {
        this.$message.error("请上传您的封面");
      } else if (this.shopsType == "") {
        this.$message.error("请选择门店类型");
      } else {
        let parmars = {
          shopsName: this.name,
          shopsBrandId: this.brand,
          // mobilePhone: "",
          businessHours: "",
          summary: this.remark,
          logoPath: this.pic,
          shopsPicList: JSON.stringify(obj),
          labels: this.tags.join(",") || "",
          shopsType: this.shopsType,
          province: this.province,
          city: this.city,
          area: this.area,
          userId: this.userId, //疑似缺少的参数
          address: this.address,
          titles: ""
        };
        if (this.flage == "1") {
          let shopsId = sessionStorage.getItem("shopsId");
          parmars.shopsId = shopsId;
          // delete parmars.mobilePhone;
          this.$post("/shops/edit", parmars).then(res => {
            if (res.error == "00") {
              this.$message("修改门店信息成功");
              this.getinfo();
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$post("/shops/add", parmars).then(res => {
            if (res.error == "00") {
              this.$message("保存成功");
              this.$router.push({
                name: "offlineshop"
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      }
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
    //获取信息
    getinfo() {
      let parmars = {
        shopsId: sessionStorage.getItem("shopsId")
      };
      this.$post("/shops/editInfo", parmars).then(res => {
        if (res.error == "00") {
          this.name = res.result.shopsName;
          this.shopsType = res.result.shopsType;
          this.select.province = res.result.province;
          this.select.city = res.result.city;
          this.select.area = res.result.area;
          this.brand = res.result.shopsBrandId + "";
          this.remark = res.result.summary;
          this.address = res.result.address;
          this.status = res.result.status;
          if (sessionStorage.getItem("shopslable") == "") {
            this.tags = [];
          } else {
            this.tags = sessionStorage.getItem("shopslabel").split(",") || [];
          }
          this.pic = res.result.logoPath;
          this.province = res.result.province;
          this.city = res.result.city;
          this.area = res.result.area;
          this.userId = res.result.userId;
          if (res.result.shopsPicList[0]) {
            this.pic1 = res.result.shopsPicList[0];
          }
          if (res.result.shopsPicList[1]) {
            this.pic2 = res.result.shopsPicList[1];
          }
          if (res.result.shopsPicList[2]) {
            this.pic3 = res.result.shopsPicList[2];
          }
          if (res.result.shopsPicList[3]) {
            this.pic4 = res.result.shopsPicList[3];
          }
          if (res.result.shopsPicList[4]) {
            this.pic5 = res.result.shopsPicList[4];
          }
          if (res.result.shopsPicList[5]) {
            this.pic6 = res.result.shopsPicList[5];
          }
          if (res.result.shopsPicList[6]) {
            this.pic7 = res.result.shopsPicList[5];
          }
        }
      });
    },
    //back
    goBack() {
      history.go(-1);
    }
  },
  mounted() {
    this.getToken();
    this.getBrands();
    if (sessionStorage.getItem("shopsId")) {
      console.log("获取信息");
      this.flage = 1;
      this.bobo = 1;
      this.getinfo();
    }
    if (sessionStorage.getItem("shopsType") == "1") {
      this.bobo = 0;
    }

    if (sessionStorage.getItem("shopsType") == "0") {
      this.titles = "修改门店";
    } else {
      this.titles = "新增门店";
    }
  }
};
</script>

<style scoped>
.add {
  min-height: 1500px;
  background: #fff;

  /* overflow: auto; */
  /* padding-bottom: 400px; */
}

.el-divider {
  margin: 0px auto;
  margin-bottom: 30px;
}

.info-box {
  /* margin: 15px; */
  background: #fff;
  /* width: 100%; */
  /* height: 100%; */
  /* overflow: auto; */
  /* padding-bottom: 150px; */
}

.input-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}

.min-box {
  width: 690px;
  /* overflow: hidden; */
  margin-bottom: 20px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}

.el-select {
  display: block;
}

.minn-box {
  width: 155px;
  height: 40px;
  float: left;
  margin-right: 50px;
}

.link {
  width: 200px;
}

textarea {
  height: 130px;
}

.save {
  width: 150px;
  margin: 0 auto;
  margin-top: 50px;
}

.el-divider {
  margin: 0 auto;
  margin-bottom: 20px;
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

/*????????*/
.update-title > div {
  font-size: 16px;
  color: #000;
  line-height: 2em;
  font-weight: 500;
}

.update-title > p {
  font-size: 12px;
  color: #6b6b6b;
  font-weight: 400;
  line-height: 2em;
}

.update-title > p > span {
  color: #4a90e2;
}

/*t图片上传*/
.update {
  overflow: hidden;
  margin-left: 80px;
  /* margin-bottom: 10px; */
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
  margin-right: 29px;
  margin-bottom: 10px;
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

.tag-tips {
  float: right;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(184, 184, 184, 1);
  line-height: 20px;
}

.zi {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}
</style>
