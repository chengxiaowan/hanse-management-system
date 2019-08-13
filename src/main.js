import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { fetchGet, fetchPost} from './plugins/axios'
import router from './plugins/router';
import './assets/css/icon.css'

//使用bootstarp，请不要使用bootstarp进行除了表格外的开发
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$get = fetchGet;
Vue.prototype.$post = fetchPost;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
