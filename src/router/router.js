import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../views/v-homePage";
import SignIn from "../views/v-signinPage";
import SignUp from "../views/v-signupPage";
import MakeAnOrder from "../views/v-orderPage";
import Profile from "../views/v-profilePage";
import Orders from "../views/v-userOrdersPage";
import ChangeProduct from "../views/v-changeProductPage";
import AddProduct from "../views/v-addProductPage";
import AdminOrders from "../views/v-adminOrdersPage";
import store from "@/store/store.js";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", name: "home", component: HomePage },
        { path: "/signin", name: "signin", component: SignIn },
        { path: "/signup", name: "signup", component: SignUp },
        {
            path: "/make-an-order",
            name: "make-an-order",
            component: MakeAnOrder,
            beforeEnter: (to, from, next) => {
                if (!store.getters["AUTHENTICATED"]) {
                    return next({
                        name: "signin",
                    });
                }

                next();
            },
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            beforeEnter: (to, from, next) => {
                if (!store.getters["AUTHENTICATED"]) {
                    return next({
                        name: "signin",
                    });
                }

                next();
            },
        },
        {
            path: "/orders",
            name: "orders",
            component: Orders,
            beforeEnter: (to, from, next) => {
                if (!store.getters["AUTHENTICATED"]) {
                    return next({
                        name: "signin",
                    });
                }

                next();
            },
        },
        {
            path: "/change-product/:id",
            name: "change-product",
            component: ChangeProduct,
            beforeEnter: (to, from, next) => {
                if (!store.getters["ADMIN"]) {
                    return next({
                        name: "signin",
                    });
                }

                next();
            },
        },
        {
            path: "/add-product",
            name: "add-product",
            component: AddProduct,
            beforeEnter: (to, from, next) => {
                if (!store.getters["ADMIN"]) {
                    return next({
                        name: "signin",
                    });
                }

                next();
            },
        },
        {
            path: "/orders-admin",
            name: "orders-admin",
            component: AdminOrders,
            beforeEnter: (to, from, next) => {
                if (!store.getters["ADMIN"]) {
                    return next({
                        name: "signin",
                    });
                }

                next();
            },
        },
    ],
});
