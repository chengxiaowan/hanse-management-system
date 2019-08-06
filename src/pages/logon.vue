<template>
    <div class="logon">
        <v-header></v-header>
        <div class="logon-box">
            <div class="title">
                <p>{{info}}</p>
                <div>已有Home+账号 <router-link to="/login">快捷登录 ></router-link></div>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../components/header'
export default {
    name:"logon",
    components:{
        "v-header":header,
    },
    data(){
        return{
            info:"欢迎注册Home+"
        }
    }
}
</script>
<style>
.logon{
    position: relative;
    height: 100vh;
}

.logon-box{
    width: 1200px;
    height: 672px;
    background: #fff;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center

}

.title{
    margin-top: 41px;
    position: relative;
}

.title>p{
    font: 400 36px/50px "";
}

.title > div{
    position: absolute;
    right: 21px;
    top:50%;
    font: 14px;
    font-weight: 400
}

.title > div >a{
    color: #4A90E2;
}
</style>
