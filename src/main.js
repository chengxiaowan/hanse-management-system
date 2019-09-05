import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { fetchGet, fetchPost} from './plugins/axios'
import router from './plugins/router';
import './assets/css/icon.css'

//引入第三方标签，github：https://github.com/matiastucci/vue-input-tag
import InputTag from 'vue-input-tag'

//使用bootstarp，请不要使用bootstarp进行除了表格外的开发
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$get = fetchGet;
Vue.prototype.$post = fetchPost;

//老板说ele的标签不好看，不予评价
Vue.component('input-tag', InputTag)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
