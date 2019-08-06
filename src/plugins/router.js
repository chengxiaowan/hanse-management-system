import Vue from 'vue';
import VueRouter from 'vue-router';
//页面
import Home from '../pages/Home.vue';
import login from '../pages/login.vue';
import logon from '../pages/logon.vue';
Vue.use(VueRouter);


let routes = [
    {
        path:'/',
        component:Home
    },
    {
        path:'/login',
        component:login
    },
    {
        path:'/logon',
        component:logon
    }
    
];
let router = new VueRouter({routes});
export default router;