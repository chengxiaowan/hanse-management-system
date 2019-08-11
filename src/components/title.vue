<template>
    <div class="page-title">
        {{page}}
        <router-link to="/index">X</router-link>
    </div>
</template>
<script>
export default {
    name:"heads",
    props:["page"],
    data(){
        return{
            show:true
        }
    }
}
</script>

<style >
   .page-title {
       height: 50px;
       background: #2C3D4C;
       color: #fff;
       line-height: 50px;
       font: 18px;
       font-weight: 500px;
       padding-left: 35px;
       border-top: 1px solid #333;
   }
   .page-title > a{
       float: right;
       margin-right: 35px;
   }
</style>