<template>
  <div class="attestation">
    <v-title page="实名认证"></v-title>
    <div class="shiming-title">
      <p>请完善一下信息，方便您有效进行后续业务管理</p>
    </div>
    <el-row class="shiming-info">
      <el-col :span="2">
        <div>
          <i class="iconfont icon-xinghao" style="color:red;"></i>
          统一社会信用码/注册号/组织机构代码：
        </div>
      </el-col>
      <el-col :span="5">
        <div style="margin-left:20px">
          <el-input v-model="form.usercode" placeholder="个统一社会信用代码或注册号或组织机构代码"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="shiming-info">
      <el-col :span="2">
        <div>
          <i class="iconfont icon-xinghao" style="color:red;"></i>
          企业名称：
        </div>
      </el-col>
      <el-col :span="5">
        <div style="margin-left:20px">
          <el-input v-model="form.name" placeholder="请填写营业执照或其他有效证件上的企业名称"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="shiming-info">
      <el-col :span="2">
        <div>
          <i class="iconfont icon-xinghao" style="color:red;"></i>
          所在地区：
        </div>
      </el-col>
      <el-col :span="8">
        <div style="margin-left:-207px">
          <v-distpicker></v-distpicker>
        </div>
      </el-col>
    </el-row>
    <el-row class="shiming-info">
      <el-col :span="2">
        <div>
          <i class="iconfont icon-xinghao" style="color:red;"></i>
          详细地址：
        </div>
      </el-col>
      <el-col :span="5">
        <div style="margin-left:20px">
          <el-input v-model="form.address" placeholder="请填写您的详细地址，以便寄送书面文件"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="shiming-info">
      <el-col :span="2">
        <div>
          <i class="iconfont icon-xinghao" style="color:red;"></i>
          营业执照：
        </div>
      </el-col>
      <el-col :span="5">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import heads from "../../components/title";
import VDistpicker from "v-distpicker";
export default {
  name: "certification",
  components: {
    "v-title": heads,
    VDistpicker
  },
  data() {
    return {
      info: "实名认证",
      form: {
        usercode: "",
        namr: "",
        address: ""
      },
      imageUrl:'',
    };
  },
  methods: {
    //上传控件
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.el-input {
  height: 30px;
}
.shiming-title {
  height: 44px;
  background: rgb(245, 245, 245);
  margin-top: 20px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 2px;
}
.shiming-title > p {
  font: 12px/44px "";
  text-indent: 18px;
  color: #4a4a4a;
}
.shiming-info {
  margin-left: 30px;
  margin-top: 42px;
  text-align: center;
  font: 400 12px/20px "";
}

/*上传控件*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>