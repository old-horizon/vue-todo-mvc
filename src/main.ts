import {createApp} from "vue";
import App from "./presenter/App.vue";
import router from "./presenter/router";

createApp(App).use(router).mount('#app');
