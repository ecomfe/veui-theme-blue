import 'classlist-polyfill';
import 'focus-visible';
import 'promise-polyfill/src/polyfill';

import Vue from 'vue';
import App from './App';
import router from './router';
// import i18n from 'veui/managers/i18n';
import './config/veui.config';
import './assets/style/common.less';
// 复制粘贴
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

// i18n.locale = 'en-US';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    name: 'app',
    router,
    render: h => h(App)
});
