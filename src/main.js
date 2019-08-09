import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { fetchGet, fetchPost} from './plugins/axios'
import router from './plugins/router';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$get = fetchGet;
Vue.prototype.$post = fetchPost;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
