import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import 'normalize.css';
import ElementUI from 'element-ui';
import './styles.scss';
import './styles/index.less';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
