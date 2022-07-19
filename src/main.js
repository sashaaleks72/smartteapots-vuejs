import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import axios from "axios";
import vue3GoogleLogin from "vue3-google-login";

axios.defaults.baseURL = "https://smart-teapot.herokuapp.com/";

store.dispatch("ATTEMPT", localStorage.getItem("token")).then(() => {
    store.dispatch("SET_CART_FROM_LOCAL").then(() => {
        createApp(App)
            .use(store)
            .use(router)
            .use(vue3GoogleLogin, {
                clientId:
                    "7015524262-r9f9t0gr9b8u9mmvi3dthggfatiinugp.apps.googleusercontent.com",
            })
            .mount("#app");
    });
});
