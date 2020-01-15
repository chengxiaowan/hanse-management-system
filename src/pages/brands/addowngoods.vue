<template>
  <div class="wonergoods">
    <el-page-header @back="goBack" content="新增自营商品"></el-page-header>
    <el-divider></el-divider>
    <div class="woner-title">商户新增自营商品</div>
    <div class="form-goods">
      <div class="form-body">
        <div class="form-title">名称：</div>
        <el-input type="text" maxlength="30" placeholder="请输入商品名称，1~30个字" v-model="name"></el-input>
      </div>
      <div class="form-body">
        <div class="form-title">价格：</div>
        <el-input type="text" maxlength="30" placeholder="请输入商品价格" v-model="price"></el-input>
      </div>
      <div class="form-body">
        <div class="form-title">价格：</div>
        <el-input type="textarea" maxlength="30" placeholder="请输入商品描述" rows="4" v-model="remark"></el-input>
      </div>
      <div class="form-body">
        <div class="form-title">
          标签：
          <span class="tips">建议每个标签2-5字</span>
        </div>
        <input-tag placeholder="添加标签,按回车生成标签" v-model="tags" limit=10></input-tag>
      </div>
      <div class="form-body">
        <div class="form-title">图片</div>
        <p>
          1、请上传png,jpg,jpeg等规范格式的图片，大小不能超过5MB。
          <br />2、精致的图片会吸引更多的人关注哦。
          <br />3、除商品主图外，您还可以上传商品的其他图片。
        </p>
      </div>
      <div class="upload-box">
        <div class="img-box">
          <p class="image-tips">商品主图</p>
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
    <div class="save">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "addowngoods",
  data() {
    return {
      info: "addowngoods",
      tags: [],
      name: "",
      price: "",
      remark: "",
      //主图
      pic: "",
      //图片列表
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
      actionPath: "https://upload.qiniup.com", //七牛云上传地址（华东）
      baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url
      postdata: { token: "" }
    };
  },
  methods: {
    //获取七牛云token为上传做准备
    getToken() {
      this.$get("/qiniu/getUpToken").then(res => {
        this.postdata.token = res;
      });
    },

    // 处理上传事件

    //上船前的检测--公用
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
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
    //图片列表
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

    //上传时间处理      从本地获取的上传时的时间戳并格式化
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
    //返回
    goBack() {
      history.go(-1);
    },

    save() {
      if (this.name == "") {
        this.$message.error("请输入自营商品名称");
        return;
      }
      if (this.price == "") {
        this.$message.error("请输入自营商品价格");
        return;
      }
      let drool = [];
      if (this.pic1.url) {
        drool.push(this.pic1);
      }
      if (this.pic2.url) {
        drool.push(this.pic2);
      }
      if (this.pic3.url) {
        drool.push(this.pic3);
      }
      if (this.pic4.url) {
        drool.push(this.pic4);
      }
      if (this.pic5.url) {
        drool.push(this.pic5);
      }
      if (this.pic6.url) {
        drool.push(this.pic6);
      }
      if (this.pic7.url) {
        drool.push(this.pic7);
      }
      let parmars = {
        shopsBrandId: sessionStorage.getItem("shopsBrandId"),
        name: this.name,
        price: this.price,
        describes: this.remark,
        labels: this.tags.join(",") || "",
        pic: this.pic,
        picList: JSON.stringify(drool)
      };
      this.$post('/shopsBrand/addShopsBrandMGoods',parmars).then(res=>{
        if(res.error == "00"){
          this.$message("新增自营商品成功")
        }
      })
    }
  },
  mounted() {
    //获取token
    this.getToken();
  }
};
</script>

<style scoped>
.el-divider {
  margin: 0px;
  margin-bottom: 24px;
}

.woner-title {
  height: 44px;
  background: rgba(245, 245, 245, 1);
  border-radius: 2px;
  margin: 0 12px;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 44px;
  text-indent: 14px;
  margin-bottom: 32px;
}

.wonergoods {
  background: #fff;
  /* height: 100%; */
  padding-bottom: 300px;
}

.form-body {
  width: 693px;
  margin-left: 61px;
  margin-bottom: 33px;
}

.form-body p {
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(107, 107, 107, 1);
  line-height: 19px;
}

.form-title {
  margin-bottom: 2px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}

.tips {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(184, 184, 184, 1);
  line-height: 20px;
  float: right;
}

.save {
  margin-top: 51px;
  margin-left: 365px;
}

.upload-box {
  display: flex;
  flex: 1;
  /* justify-content: space-around; */
  flex-wrap: wrap;
  margin-left: 61px;
}

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
</style>