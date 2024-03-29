import Vue from 'vue';
import VueRouter from 'vue-router';
//页面
import Home from '../pages/Home.vue';
import login from '../pages/login.vue';
import logon from '../pages/logon.vue';
//首页子组件
import index from '../pages/home/index.vue';
import goods from '../pages/home/goods.vue';
import shops from '../pages/home/shop.vue';
import service from '../pages/home/service.vue';
import offlineshop from '../pages/home/offlineshop.vue';
import brand from '../pages/home/brand.vue';
import studio from '../pages/home/studio.vue';
import shot from '../pages/home/shot.vue';

//用户相关
import userinfo from '../pages/user/userinfo.vue'
import certification from '../pages/user/certification.vue'
import safe from '../pages/user/safe.vue'
import password from '../pages/user/password.vue'

//品牌相关
import brandsadd from '../pages/brands/brandsAdd'





Vue.use(VueRouter);


let routes = [{
        path: '/',
        component: Home,
        children: [
            //首页
            {
                path: 'index',
                name: 'index',
                component: index
            },
            //主页
            {
                path: 'goods',
                name: 'goods',
                component: goods
            },
            {
                path: 'shops',
                name: 'shops',
                component: shops
            },
            {
                path: 'service',
                name: 'service',
                component: service
            },
            {
                path: 'offlineshop',
                name: 'offlineshop',
                component: offlineshop,
            },
            {
                path: 'brand',
                name: 'brand',
                component: brand,
            },
            {
                path: 'studio',
                name: 'studio',
                component: studio,
            },
            {
                path: 'shot',
                name: 'shot',
                component: shot
            },
            //用户部分
            {
                path: 'userinfo',
                name: 'userinfo',
                component: userinfo
            },
            {
                path: "certification",
                namr: 'certification',
                component: certification
            },
            {
                path: "safe",
                name: 'safe',
                component: safe
            },
            {
                path: "password",
                name: 'password',
                component: password
            },
            //品牌部分
            {
                path: 'brand/brandsadd',
                name: 'brandsadd',
                component: brandsadd
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/logon',
        component: logon
    },

];
let router = new VueRouter({
    routes
});
export default router;