/* eslint-disable */
import Vue from 'vue';
import App from './App';
import router from './router';
import 'wicg-focus-ring';

Vue.config.productionTip = false;

new Vue({
    name: 'app',
    el: '#app',
    router,
    render: h => h(App)
});
