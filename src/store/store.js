import { createStore } from "vuex";
import axios from "axios";
// import router from "@/router/router.js";

const store = createStore({
    state: {
        teapots: [],
        cartItems: [],
        manufacturers: [],
        deliveries: [],
        orders: [],
        token: null,
        user: null,
        teapot: {},
        order: {},
        maxPage: 0,
    },

    actions: {
        async MAKE_AN_ORDER({ commit, state }, order_info) {
            order_info["userId"] = state.user.id;

            for (let item of state.cartItems) {
                order_info["orderInfo"].push({
                    teapotId: item.id,
                    amount: item.quantity,
                });
            }

            await axios.post("/orders/create", order_info);

            commit("CLEAR_CART");
        },
        async PROFILE({ commit }, profile) {
            let response = await axios.put("/auth/user", profile);

            if (response.data.success) {
                commit("SET_USER_TO_STATE", response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        },
        async ADD_PRODUCT({ commit }, product) {
            let response = await axios.post(`/teapots/create-teapot`, product);

            if (response.data.success) {
                commit("ADD_TEAPOT_TO_STATE", response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        },
        async CHANGE_PRODUCT({ commit }, product) {
            let id = product.id;
            delete product.id;

            let response = await axios.put(`/teapots/${id}`, product);

            if (response.data.success) {
                commit("SET_TEAPOT_TO_STATE", response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        },
        async CHANGE_STATUS({ dispatch }, order_info) {
            let id = order_info.id;
            let status = { status: order_info.status.value };

            let response = await axios.put(`/orders/${id}`, status);

            console.log(response.data.success);

            if (response.data.success) {
                dispatch("GET_ORDER_BY_ID", id);
            } else {
                throw new Error(response.data.message);
            }
        },
        async SIGN_UP({ commit }, credentials) {
            let response = await axios.post("/auth/register", credentials);
            commit("SET_USER_TO_STATE", response.data.data);
        },
        async SIGN_IN({ dispatch }, credentials) {
            let response = await axios.post("/auth/login", credentials);

            if (response.data.success) {
                return dispatch("ATTEMPT", response.data.data.token);
            }

            throw new Error();
        },
        async SIGN_IN_BY_GOOGLE({ dispatch }, user) {
            let response = await axios.post("/auth/sign-with-google", user);

            return dispatch("ATTEMPT", response.data.data.token);
        },
        async ATTEMPT({ commit, state }, token) {
            if (token) {
                commit("SET_TOKEN_TO_STATE", token);

                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + token;
                localStorage.setItem("token", token);
            } else {
                axios.defaults.headers.common["Authorization"] = null;
                localStorage.removeItem("token");
            }

            if (!state.token) {
                return;
            }

            try {
                let response = await axios.get("/auth/user");
                commit("SET_USER_TO_STATE", response.data.data);
            } catch (e) {
                commit("SET_TOKEN_TO_STATE", null);
                commit("SET_USER_TO_STATE", null);
                localStorage.removeItem("token");
            }
        },
        async GET_USER({ commit }) {
            let response = await axios.get("/auth/user");
            commit("SET_USER_TO_STATE", response.data.data);
        },
        SIGN_OUT({ commit }) {
            commit("SET_TOKEN_TO_STATE", null);
            commit("SET_USER_TO_STATE", null);
            localStorage.removeItem("token");
        },
        async GET_TEAPOTS({ commit }, options) {
            const { sortBy, howSort, page, manufacturerName } = options;

            let url = `/teapots?page=${page}&limit=8`;

            if (sortBy != undefined)
                url += `&sortBy=${sortBy}&howSort=${howSort}`;
            if (manufacturerName != undefined)
                url += `&manufacturerName=${manufacturerName}`;

            return await axios
                .get(url)
                .then((teapots) => {
                    commit("SET_TEAPOTS_TO_STATE", teapots.data.data);
                })
                .catch((error) => error);
        },
        async GET_MAX_PAGE({ commit }, option) {
            if (option == "All")
                return await axios
                    .get(`/teapots/all-teapots`)
                    .then((teapots) => {
                        commit(
                            "SET_MAX_PAGE_TO_STATE",
                            Math.ceil(teapots.data.data.length / 8)
                        );
                    })
                    .catch((error) => error);

            return await axios
                .get(`/manufacturers/${option}`)
                .then((manufacturers) => {
                    commit(
                        "SET_MAX_PAGE_TO_STATE",
                        Math.ceil(manufacturers.data.data.teapots.length / 8)
                    );
                })
                .catch((error) => error);
        },
        async GET_TEAPOT_BY_ID({ commit }, id) {
            return await axios
                .get(`/teapots/${id}`)
                .then((teapot) => {
                    commit("SET_TEAPOT_TO_STATE", teapot.data.data);
                })
                .catch((error) => error);
        },
        async GET_ORDER_BY_ID({ commit }, id) {
            return await axios
                .get(`/orders/${id}`)
                .then((order) => {
                    commit("SET_ORDER_TO_STATE", order.data.data);
                })
                .catch((error) => error);
        },
        async GET_ORDERS({ commit }) {
            return await axios
                .get(`/orders/user-orders`)
                .then((orders) => {
                    commit("SET_ORDERS_TO_STATE", orders.data.data.order);
                })
                .catch((error) => error);
        },
        async GET_ALL_ORDERS({ commit }) {
            return await axios
                .get(`/orders/get-all`)
                .then((orders) => {
                    commit("SET_ORDERS_TO_STATE", orders.data.data);
                })
                .catch((error) => error);
        },
        async GET_MANUFACTURERS({ commit }) {
            return await axios
                .get("/manufacturers")
                .then((manufacturers) => {
                    commit(
                        "SET_MANUFACTURERS_TO_STATE",
                        manufacturers.data.data
                    );
                })
                .catch((error) => error);
        },
        async GET_DELIVERIES({ commit }) {
            return await axios
                .get("/deliveries/get-all")
                .then((deliveries) => {
                    commit("SET_DELIVERIES_TO_STATE", deliveries.data.data);
                })
                .catch((error) => error);
        },
        async PRODUCT_TO_DELETE({ commit }, productId) {
            console.log(productId);

            await axios.delete(`/teapots/${productId}`, productId);
            commit("DELETE_TEAPOT", productId);
        },
        ADD_TO_CART({ commit }, product) {
            commit("SET_CART_ITEMS_TO_STATE", product);
        },
        SET_CART_FROM_LOCAL({ commit }) {
            let cart = JSON.parse(localStorage.getItem("cart"));

            if (!cart) {
                cart = [];
            }

            commit("SET_CART_TO_STATE", cart);
        },
        DELETE_FROM_CART({ commit }, index) {
            commit("REMOVE_FROM_CART", index);
        },
        INCREMENT_CART_ITEM({ commit }, index) {
            commit("INCREMENT_ITEM", index);
        },
        DECREMENT_CART_ITEM({ commit }, index) {
            commit("DECREMENT_ITEM", index);
        },
    },

    mutations: {
        SET_ORDER_TO_STATE: (state, order) => {
            state.order = order;
        },
        SET_ORDERS_TO_STATE: (state, orders) => {
            state.orders = orders;
        },
        SET_USER_TO_STATE: (state, user) => {
            state.user = user;
        },
        SET_TOKEN_TO_STATE: (state, token) => {
            state.token = token;
        },
        SET_TEAPOTS_TO_STATE: (state, teapots) => {
            state.teapots = teapots;
        },
        SET_MAX_PAGE_TO_STATE: (state, maxPage) => {
            state.maxPage = maxPage;
        },
        ADD_TEAPOT_TO_STATE: (state, teapot) => {
            state.teapots.push(teapot);
        },
        SET_TEAPOT_TO_STATE: (state, teapot) => {
            state.teapot = teapot;
        },
        SET_MANUFACTURERS_TO_STATE: (state, manufacturers) => {
            state.manufacturers = manufacturers;
        },
        SET_DELIVERIES_TO_STATE: (state, deliveries) => {
            state.deliveries = deliveries;
        },
        SET_CART_ITEMS_TO_STATE: (state, product) => {
            if (state.cartItems.length > 0) {
                let check = false;

                for (let i = 0; i < state.cartItems.length; i++) {
                    if (state.cartItems[i].id == product.id) {
                        check = true;
                        state.cartItems[i].quantity++;
                        console.log(state.cartItems[i].quantity);
                        break;
                    }
                }

                if (!check) {
                    product.quantity = 1;
                    state.cartItems.push(product);
                }
            } else {
                product.quantity = 1;
                state.cartItems.push(product);
            }

            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        SET_CART_TO_STATE: (state, cart) => {
            state.cartItems = cart;
        },
        CLEAR_CART: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cart");
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cartItems.splice(index, 1);

            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        INCREMENT_ITEM: (state, index) => {
            if (state.cartItems[index].quantity < state.cartItems[index].amount)
                state.cartItems[index].quantity++;

            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        DECREMENT_ITEM: (state, index) => {
            if (state.cartItems[index].quantity > 1)
                state.cartItems[index].quantity--;
            else state.cartItems.splice(index, 1);

            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        DELETE_TEAPOT: (state, index) => {
            if (state.teapots[index]) {
                state.teapots.splice(index, 1);
            }
        },
    },

    getters: {
        TEAPOTS(state) {
            return state.teapots;
        },
        GET_MAX_PAGE(state) {
            return state.maxPage;
        },
        MANUFACTURERS(state) {
            return state.manufacturers;
        },
        DELIVERIES(state) {
            return state.deliveries;
        },
        CART_ITEMS(state) {
            return state.cartItems;
        },
        AUTHENTICATED(state) {
            return state.token && state.user;
        },
        ADMIN(state) {
            if (state.user) return state.token && state.user.status == "admin";
        },
        USER(state) {
            return state.user;
        },
        TEAPOT(state) {
            return state.teapot;
        },
    },
});

export default store;
