import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import axios from "axios";

axios.defaults.baseURL = "https://smart-teapot.herokuapp.com/";

store.dispatch("ATTEMPT", localStorage.getItem("token")).then(() => {
    store.dispatch("SET_CART_FROM_LOCAL").then(() => {
        createApp(App).use(store).use(router).mount("#app");
    });
});
