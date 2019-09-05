<template>
  <div class="user-info">
    <v-title page="基本信息"></v-title>
    <div class="box-big">
      <div class="tips">请完善以下信息，方便我们更好的为您服务。</div>
      <div class="info-user">
        <div class="title-user" style="color:#000">基本信息</div>
        <div class="user-role">
          <i class="iconfont icon-xinghao" style="color:red;font-size:12px;"></i>身份：
          <el-radio v-model="role" label="0" style="margin-left:8px">个人</el-radio>
          <el-radio v-model="role" label="1">企业（含企业、团体、组织）</el-radio>
        </div>
        <div class="user-name">
          <i class="iconfont icon-xinghao" style="color:red;font-size:12px;"></i>
          <span v-if="role == '1'">企业名称：</span>
          <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：</span>
          <div class="user-name-input">
            <el-input v-model="name" placeholder="请输入企业名称" v-if="role == '1'"></el-input>
            <el-input v-model="name" placeholder="请输入您的真实姓名" v-else></el-input>
          </div>
        </div>
        <div class="user-type">
          <i class="iconfont icon-xinghao" style="color:red;font-size:12px;"></i>经营类型：
          <span style="color:#333;margin-left:8px;">{{type}}</span>
        </div>
      </div>
      <div class="link-user">
        <div class="title-user" style="color:#000">联系信息</div>
        <div class="user-type">
          <i class="iconfont icon-xinghao" style="color:red;font-size:12px;"></i>所在地区：
          <!-- 省市地联动插件 -->
          <v-distpicker
            @selected="onSelected"
            class="drool"
            :province="select.province"
            :city="select.city"
            :area="select.area"
          ></v-distpicker>
        </div>
        <div class="user-address">
          详细地址：
          <div class="user-name-input">
            <el-input v-model="address" placeholder="请输入详细地址"></el-input>
          </div>
        </div>
        <div class="user-address">
          联系电话：
          <div class="user-name-input">
            <el-input v-model="phone" placeholder="例如：0519-8888888"></el-input>
          </div>
        </div>
        <div class="user-address">
          电子邮箱：
          <div class="user-name-input">
            <el-input v-model="email" placeholder="例如：czhoso@heanshe.app"></el-input>
          </div>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="save()">保存</el-button>
  </div>
</template>
<script>
import heads from "../../components/title";
import VDistpicker from "v-distpicker";
export default {
  name: "userinfo",
  components: {
    "v-title": heads,
    VDistpicker
  },
  data() {
    return {
      info: "基本信息",
      role: "1",
      name: "",
      type: "",
      address: "", //详细地址
      phone: "",
      email: "",
      province: "",
      city: "",
      area: "",
      select: { province: "", city: "", area: "" } //选择框的预选项
    };
  },
  methods: {
    //用户角色判定
    userRole() {
      let role = sessionStorage.getItem("roleId");
      if (role == "7") {
        this.type = "酒店";
      } else if (role == "8") {
        this.type = "民宿";
      } else if (role == "9") {
        this.type = "公寓";
      } else if (role == "10") {
        this.type = "摄影";
      }
    },
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
    //获取用户信息
    getUser() {
      this.$get("/service/getMerchantsUser")
        .then(res => {
          if (res.error == "00") {
            console.log(res);
            this.role = res.result.type;
            this.name = res.result.name;
            this.province = res.result.province;
            this.city = res.result.city;
            this.area = res.result.area;
            this.address = res.result.address;
            this.phone = res.result.linkphone;
            this.email = res.result.email;
            this.select.province = res.result.province;
            this.select.city = res.result.city;
            this.select.area = res.result.area;
          } else {
            this.$message("获取个人信息失败");
          }
        })
        .catch(() => {
          console.log("请求超时超时");
        });
    },
    //保存用户讯息
    save() {
      if (this.name == "") {
        this.$message.error("请输入企业名称");
      } else if (this.role == "") {
        this.$message.error("请选择您的身份");
      } else if (this.province == "" || this.city == "" || this.area == "") {
        this.$message.error("请选择您的所在地区");
      } else {
        let parmars = {
          type: this.role,
          name: this.name,
          province: this.province,
          city: this.city,
          area: this.area,
          address: this.address,
          linkphone: this.phone,
          email: this.email
        };
        this.$post("/service/updateMerchantsUser", parmars)
          .then(res => {
            if (res.error == "00") {
              this.$message("基本信息保存成功");
            } else {
              this.$message(res.msg);
            }
          })
          .catch(() => {
            console.log("请求失败");
          });
      }
    }
  },
  //组件挂载生命周期
  mounted() {
    this.userRole();
    this.getUser();
  }
};
</script>

<style scoped>
.user-info {
  height: 99.5%;
  border: 1px solid #333;
  background: #fff;
}

.box-big {
  padding: 21px 12px;
}

.tips {
  height: 44px;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 44px;
  background: #f5f5f5;
  text-indent: 18px;
  border-radius: 2px;
}
.title-user {
  margin-top: 28px;
  margin-left: 34px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}
.user-role {
  margin-left: 101px;
  margin-top: 20px;
}
.user-name {
  margin-left: 77px;
}
.user-name-input {
  width: 324px;
  height: 30px;
  display: inline-block;
  margin-top: 20px;
  margin-left: 8px;
}
.user-type {
  margin-left: 77px;
  margin-top: 27px;
  font-size: 12px;
  color: #666;
}
.info-user {
  font: 400 12px/17px "";
  color: #666;
}
.link-user {
  margin-top: 41px;
}

.el-select {
  width: 96px;
  height: 30px;
  margin-right: 17px;
  margin-left: 5px;
}

.user-address {
  margin-left: 85px;
  margin-top: 10px;
  font: 400 12px/17px "";
  color: #666;
}
.el-button {
  margin-left: 170px;
  margin-top: 74px;
}
.drool {
  display: inline-block;
  margin-left: 4px;
}
</style>