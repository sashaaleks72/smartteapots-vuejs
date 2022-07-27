import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import axios from "axios";
import gAuthPlugin from "vue3-google-oauth2";

const gauthOption = {
    clientId:
        "605349196075-0lv5tb7v29ervndiadefar8rrjmbc1ft.apps.googleusercontent.com",
    scope: "profile email",
    plugin_name: "SmartTeapots",
};

axios.defaults.baseURL = "https://teapot-store.herokuapp.com/";

store.dispatch("ATTEMPT", localStorage.getItem("token")).then(() => {
    store.dispatch("SET_CART_FROM_LOCAL").then(() => {
        createApp(App)
            .use(store)
            .use(gAuthPlugin, gauthOption)
            .use(router)
            .mount("#app");
    });
});
