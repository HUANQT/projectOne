import Vue from 'vue';
import { Icon } from '@iconify/vue2';
// 饿了么组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css';

Vue.component('Icon', Icon);
Vue.use(ElementUI);
// 注入router的作用 this.$router可以在任意组件中访问到router实例
// 注入store this.$store可以在任意组件中访问到store实例
new Vue({
  store,
  router,
  el: '#app',
  render: (h) => h(App),
});
