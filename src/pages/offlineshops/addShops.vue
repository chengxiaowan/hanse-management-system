<template>
  <div class="add">
    <v-title :page="page"></v-title>
    <div class="info-box">
      <div class="input-box">
        <div class="min-box">
          名称：
          <el-input type="text" placeholder="请输入名称 1-30字以内" v-model="name" maxlength="30"></el-input>
        </div>
        <div class="min-box">
          <div class="minn-box te">
            所属品牌：
            <el-select v-model="brand" filterable placeholder="请选择">
              <el-option
                v-for="item in brandlist"
                :key="item.shopsBrandId"
                :label="item.brandName"
                :value="item.shopsBrandId"
              ></el-option>
            </el-select>
          </div>
          <div class="minn-box te">
            类型：
            <el-select v-model="shopsType" filterable placeholder="请选择">
              <el-option label="酒店" value="1"></el-option>
              <el-option label="民宿" value="2"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="input-box">
        <div class="min-box">
          所在地区：
          <v-distpicker
            @selected="onSelected"
            class="drool"
            :province="select.province"
            :city="select.city"
            :area="select.area"
          ></v-distpicker>
        </div>
        <div class="min-box">
          详细地址：
          <el-input type="text" v-model="address"></el-input>
        </div>
      </div>
      <div class="input-box">
        <div class="min-box">
          简介：
          <el-input type="textarea" v-model="remark"></el-input>
        </div>
        <div class="min-box">
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
      <div class="input-box">
        <div class="min-box">
          <div class="update-title">
            <div>图片</div>
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
      drool: ""
    };
  },
  methods: {
    //在完整选择省市地后触发
    onSelected(data) {
      console.log(data);
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
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },

    //上传完成后的方法--封面
    handleAvatarSuccess(res, file) {
      console.log(res.url);
      this.pic = this.baseurl + res.url;
    },

    handleAvatarSuccess2(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      this.pic1.url = picurl;
      this.pic1.originalFilename = picname;
      this.pic1.uploadTime = Date.parse(new Date());
    },
    handleAvatarSuccess3(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      this.pic2.url = picurl;
      this.pic2.originalFilename = picname;
      this.pic2.uploadTime = Date.parse(new Date());
    },
    handleAvatarSuccess4(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      this.pic3.url = picurl;
      this.pic3.originalFilename = picname;
      this.pic3.uploadTime = Date.parse(new Date());
    },
    handleAvatarSuccess5(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      this.pic4.url = picurl;
      this.pic4.originalFilename = picname;
      this.pic4.uploadTime = Date.parse(new Date());
    },
    handleAvatarSuccess6(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      this.pic5.url = picurl;
      this.pic5.originalFilename = picname;
      this.pic5.uploadTime = Date.parse(new Date());
    },
    handleAvatarSuccess7(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      this.pic6.url = picurl;
      this.pic6.originalFilename = picname;
      this.pic6.uploadTime = Date.parse(new Date());
    },
    handleAvatarSuccess8(res, file) {
      let picurl = this.baseurl + res.url;
      let picname = res.url;
      this.pic7.url = picurl;
      this.pic7.originalFilename = picname;
      this.pic7.uploadTime = Date.parse(new Date());
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
      } else {
        let parmars = {
          shopsName: this.name,
          phone: "",
          businessHours: "",
          summary: this.remark,
          logoPath: this.pic,
          shopsPicList: JSON.stringify(obj),
          labels: this.dynamicTags.join(","),
          shopsType: this.shopsType,
          province: this.province,
          city: this.city,
          area: this.area,
          userId:"",        //疑似缺少的参数
        };
        this.$post("/shops/add", parmars).then(res => {
          console.log(res);
        });
      }
    }
  },
  mounted() {
    this.getToken();
    this.getBrands();
  }
};
</script>

<style scoped>
/* .add {
  height: 1000px;
  overflow: auto;
} */

.info-box {
  margin: 15px;
  background: #fff;
  /* width: 100%; */
  height: 100%;
  /* overflow: auto; */
  padding-top: 50px;
  padding-bottom: 150px;
}

.input-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.min-box {
  width: 690px;
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
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
