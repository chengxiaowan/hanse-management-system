<template>
  <div class="Studio">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <div class="Studio-info">
      <div class="studio-input">
        负责人：
        <el-input disabled placeholder="请选择负责人"></el-input>
      </div>
      <div class="studio-input"></div>
    </div>
    <div class="Studio-info">
      <div class="studio-input">
        名称：
        <el-input type="text" v-model="studioName" maxlength="30" placeholder="请输入名称 1-30字"></el-input>
      </div>
      <div class="studio-input">
        所在地：
        <v-distpicker
          @selected="onSelected"
          class="drool"
          :province="select.province"
          :city="select.city"
          :area="select.area"
        ></v-distpicker>
      </div>
    </div>
    <div class="Studio-info">
      <div class="studio-input">
        详细地址：
        <el-input type="text" v-model="address" maxlength="30" placeholder="请输入详细地址"></el-input>
      </div>
      <div class="studio-input">
        联系电话：
        <el-input type="text" v-model="linkphone" maxlength="30" placeholder="请输入详细地址"></el-input>
      </div>
    </div>
    <div class="Studio-info">
      <div class="studio-input">
        <div class="pic-title">
          <div>封面及案例图片</div>
          <p>
            1、请上传png,jpg,jpeg等规范格式的图片，大小不能超过5MB。
            <br />2、精致封面和案例图片会吸引更多的人关注哦。
          </p>
        </div>
      </div>
      <div class="studio-input"></div>
    </div>
    <!-- 为了省时间，没用照片墙 罪过 -->
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
        <p class="image-tips">案例</p>
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
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  name: "Studio",
  components: {
    VDistpicker
  },
  data() {
    return {
      info: "工作室详情管理",
      postdata: { token: "" },
      studioName: "",
      select: { province: "", city: "", area: "" }, //省市地选择框的预选项
      province: "", //省
      city: "", //市
      area: "", //地
      address: "", //地址
      linkphone: "", //电话
      //图片上传支持
      pic: "",
      actionPath: "https://upload.qiniup.com",
      baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url

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
      }
    };
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        name: "studio"
      });
    },
    //省市地三联
    //在完整选择省市地后触发
    onSelected(data) {
      console.log(data);
      // data数据如下
      //area: {code: "320211", value: "滨湖区"}
      //city: {code: "320200", value: "无锡市"}
      //province: {code: "320000", value: "江苏省"}
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
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
    }
    //时间格式化+获取当前时间
  },
  mounted() {
    this.getToken();
  }
};
</script>

<style scoped>
.Studio {
  padding: 15px;
  height: 1000px;
  padding-bottom: 150px;
  overflow: auto;
  background: #fff;
}

.el-page-header {
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0;
  margin-bottom: 50px;
}

.Studio-info {
  display: flex;
  justify-content: space-around;
  margin-bottom: 35px;
  flex-wrap: wrap;
}

.studio-input {
  width: 600px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #000;
}

.studio-input > .el-input {
  margin-top: 5px;
}

.pic-title > div {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin-bottom: 18px;
}

.pic-title > p {
  font-size: 12px;
  font-weight: 400;
  color: #6b6b6b;
  line-height: 24px;
}

.update {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

/*图片上传支持*/
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
  height: 100%;
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
