<template>
  <div class="brand-info">
    <el-page-header @back="goBack" content="新增品牌" v-if="flages == '1'"></el-page-header>
    <el-divider v-if="flages == '1'"></el-divider>
    <div class="flex-row">
      <div class="brand-name">
        <div class="brand-title">品牌名称：</div>
        <el-input placeholder="请输入品牌名称，1~30字" v-model="brandName" maxlength="30" show-word-limit></el-input>
        <i class="tips"></i>
      </div>
      <div class="flex-col"></div>
    </div>
    <div class="flex-row">
      <div class="flex-col">
        <div class="brand-title">简介：</div>
        <el-input
          type="textarea"
          class="textarea"
          placeholder="请输入简介"
          v-model="remark"
          maxlength="1000"
          rows="4"
          show-word-limit
        ></el-input>
      </div>
      <div class="flex-col"></div>
    </div>
    <div class="flex-row">
      <div class="flex-col">
        <div class="brand-title">
          标签：
          <span class="tag-tips">建议每个标签2-5字</span>
        </div>
        <input-tag placeholder="添加标签,按回车生成标签。" v-model="tags" :limit="limit" addTagOnBlur="true"></input-tag>
      </div>
      <div class="flex-col"></div>
    </div>

    <div class="image-up">
      <div class="image-title">
        <h3>图片</h3>
        <p>
          1、请上传png,jpg,jpeg等规范格式的图片，大小不能超过5MB 。
          <br />2、精美的logo和封面能吸引更多的关注哦，请参考
          <span>图片示例</span>。
          <br />3、如发现图片无法删除的情况，请先清除浏览器缓存或者换个浏览器再操作。
        </p>
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
    <div class="save">
      <el-button type="primary" @click="save()">保存</el-button>
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
      pic: "",
      postdata: { token: "" },
      baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url
      brandName: "",
      remark: "",
      shopsBrandId: "",
      flage: "",
      flages: "1",
      tags: [],
      limit: 10
    };
  },
  methods: {
    goBack() {
      history.go(-1);
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

    //token获取
    getToken() {
      this.$get("/qiniu/getUpToken").then(res => {
        console.log(res);
        this.postdata.token = res;
      });
    },

    //保存信息
    save() {
      if (this.brandName == "") {
        this.$message.error("请输入品牌名称");
        return;
      } else if (this.summary == "") {
        this.$message.error("请输入品牌简介");
        return;
      } else if (this.logo == "") {
        this.$message.error("请上传您的品牌logo");
        return;
      } else if (this.pic == "") {
        this.$message.error("请上传您的品牌封面");
        return;
      }
      if (this.flage == 1) {
        let parmars = {
          shopsBrandId: this.shopsBrandId,
          brandName: this.brandName,
          summary: this.remark,
          description: "",
          logoPath: this.logo,
          imagePath: this.pic,
          shopsBrandPicList: "",
          labels: this.tags.join(",") || ""
        };
        this.$post("/shopsBrand/edit", parmars).then(res => {
          if (res.error == "00") {
            this.$message("修改成功，请继续添加其他信息");
            // this.shopsBrandId = res.shopsBrandId;
            //多了一行，难受，注释
            // sessionStorage.setItem("shopsBrandId", res.shopsBrandId);
          } else {
            this.$message(res.msg);
          }
        });
      } else {
        let parmars = {
          brandName: this.brandName,
          summary: this.remark,
          description: "",
          logoPath: this.logo,
          imagePath: this.pic,
          shopsBrandPicList: "",
          labels: this.tags.join(",") || ""
        };
        this.$post("/shopsBrand/add", parmars).then(res => {
          if (res.error == "00") {
            this.$message("保存成功");
            this.shopsBrandId = res.shopsBrandId;
            sessionStorage.setItem("shopsBrandId", res.shopsBrandId);
            this.goBack();
          } else {
            this.$message(res.msg);
          }
        });
      }
    },
    //获取信息
    getbrands() {
      let parmars = { shopsBrandId: this.shopsBrandId };
      this.$post("/shopsBrand/editInfo", parmars).then(res => {
        console.log(res);
        this.brandName = res.result.brandName;
        this.remark = res.result.summary;
        this.logo = res.result.logoPath;
        this.pic = res.result.imagePath;
        this.flage = 1;
      });
    }
  },
  mounted() {
    this.getToken();
    this.shopsBrandId = sessionStorage.getItem("shopsBrandId");
    this.tags = sessionStorage.getItem("labels").split(",");
    this.flages = sessionStorage.getItem("flages");
    console.log(sessionStorage.getItem("labels"));
    if (this.shopsBrandId) {
      this.getbrands();
      console.log("底跳");
    }
  },
  beforeDestroy() {
    // sessionStorage.removeItem("shopsBrandId");
    // sessionStorage.removeItem("labels");
  }
};
</script>

<style scoped>
.el-input {
  width: 690px;
}

.brand-info {
  background: #fff;
  height: 1500px;
  padding-bottom: 150px;
}

.brand-name {
  position: relative;
}

.brand-title {
  margin-bottom: 5px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}

.el-page-header {
  height: 50px;
  line-height: 50px;
  margin-block: 20px;
}

.tips {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff8d41;
  position: absolute;
  right: 40px;
  top: 37px;
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

/* .image-title {
} */

.image-up {
  overflow: hidden;
}

.image-title > h3 {
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
}

.image-title > p {
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(107, 107, 107, 1);
  line-height: 19px;
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

.save {
  text-align: center;
  margin-top: 80px;
}

.tag-tips {
  float: right;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(184, 184, 184, 1);
  line-height: 20px;
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

.el-divider {
  margin: 0 auto;
  margin-bottom: 20px;
}

.brand-name >>> .el-input > .el-input__inner{
  height: 30px;
}

.flex-col >>> .vue-input-tag-wrapper{
  border: 1px solid #DCDFE6;
  border-radius: 2px;
  /* height: 30px; */
}

.flex-col>>> .vue-input-tag-wrapper {
  border: 1px solid #e4e7ed;
  border-radius: 2px;
  margin-top: 6px;
}

.flex-col >>> .vue-input-tag-wrapper > .input-tag {
  border: 1px solid #fff;
  color: #fff;
  background: #4a90e2;
}
.flex-col >>> .vue-input-tag-wrapper > .input-tag > .remove {
  color: #fff;
}
</style>