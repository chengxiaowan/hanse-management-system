<template>
  <div class="brand-info">
    <div class="flex-row">
      <div class="brand-name">
        <div class="brand-title">名称：</div>
        <el-input placeholder="请输入品牌名称，1~30字" v-model="brandName" maxlength="30" ></el-input>
        <i class="tips"></i>
      </div>
      <div class="brand-user">
        <div class="brand-title">负责人：</div>
        <el-input placeholder="请选择品牌负责人"></el-input>
      </div>
    </div>
    <div class="flex-row">
      <div class="flex-col">
        <div class="brand-title">简介：</div>
        <el-input type="textarea" class="textarea" placeholder="请输入简介" v-model="brandShow" maxlength="1000"></el-input>
      </div>
      <div class="flex-col">
        <div class="brand-title">标签：</div>
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
    <div class="image-up">
      <div class="image-title">
        <h3>图片</h3>
        <p>1、请上传png,jpg,jpeg等规范格式的图片，大小不能超过5MB 。</p>
        <p>
          2、精美的logo和封面能吸引更多的关注哦，请参考
          <span>图片示例</span>。
        </p>
        <p>3、如发现图片无法删除的情况，请先清除浏览器缓存或者换个浏览器再操作。</p>
      </div>
      <div class="brand-logo">
        <p class="image-tips">LOGO</p>
        <el-upload
          class="avatar-uploader"
          :action="actionPath"
          :data="postdata"
          accept="image/jpeg, image/gif, image/png, image/bmp"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="logo" :src="logo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="brand-logo">
        <p class="image-tips">封面</p>
        <el-upload
          class="avatar-uploader"
          :action="actionPath"
          :data="postdata"
          accept="image/jpeg, image/gif, image/png, image/bmp"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="pic" :src="pic" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "brandinfo",
  data() {
    return {
      info: "基本信息",
      //标签支持
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      //七牛云 + element upload
      actionPath: "https://upload.qiniup.com",
      logo: "",
      pic:'',
      postdata: { token: "" },
      baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url
      brandName:"",
      brandShow:'',
    };
  },
  methods: {
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

    //七牛云支持
    //上传完成后的方法
    handleAvatarSuccess(res, file) {
      console.log(res.url);
      this.logo = this.baseurl + res.url;
    },
    handleAvatarSuccess2(res, file) {
      console.log(res.url);
      this.pic = this.baseurl + res.url;
    },

    //上船前的检测
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

    //token获取
    getToken() {
      this.$get("/qiniu/getUpToken").then(res => {
        console.log(res);
        this.postdata.token = res;
      });
    }
  },
  mounted() {
    this.getToken();
  }
};
</script>

<style scoped>
.el-input {
  width: 690px;
}

.brand-info {
}

.brand-name {
  position: relative;
}

.brand-title {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.tips {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff8d41;
  position: absolute;
  right: 40px;
  top: 45px;
}

.flex-row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.flex-col {
  width: 690px;
}

.textarea {
  width: 690px;
}

.image-up {
  margin-left: 80px;
}

.image-title {
}

.image-title > h3 {
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
}

.image-title > p {
  font-size: 12px;
  color: #6b6b6b;
  line-height: 10px;
}

.image-title > p > span {
  color: #4a90e2;
}

.brand-logo {
  width: 160px;
  height: 140px;
  border: 1px dashed #e2e9f0;
  position: relative;
  float: left;
  margin-right: 35px;
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
</style>