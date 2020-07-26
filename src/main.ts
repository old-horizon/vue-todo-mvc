import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./presenter/App.vue";
import router from "./presenter/router";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
