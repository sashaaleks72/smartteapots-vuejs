<template>
    <div class="orders">
        <div class="orders__container">
            <div class="orders__body">
                <div class="orders__header"><b>Orders management</b></div>
                <div class="orders__title">
                    <h3 style="font-size: 30px">Orders:</h3>
                </div>
                <table class="table" v-for="order in orders" :key="order.id">
                    <div><b>Order id:</b> {{ order.id }}</div>
                    <div><b>Status:</b> {{ order.status }}</div>
                    <b>Change status:</b>
                    <select class="select-css" v-model="status">
                        <option>deliveried</option>
                        <option>recived</option>
                        <option>processing</option>
                        <option>closed</option>
                    </select>
                    <div
                        class="orders__confirm-btn"
                        @click="changeStatus(order.id)"
                    >
                        Confirm
                    </div>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    <tr v-for="cart in order.carts" :key="cart.teapot.id">
                        <td>{{ cart.teapot.title }}</td>
                        <td>{{ cart.teapot.price }} ₴</td>
                        <td>{{ cart.amount }}</td>
                        <td>
                            <img
                                :src="cart.teapot.img"
                                alt="order"
                                width="112"
                                height="144"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><b>Total:</b> {{ order.orderSum }} ₴</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const orders = ref(computed(() => store.state.orders));

onMounted(() => {
    store.dispatch("GET_ALL_ORDERS");
});

let status = ref("");

function changeStatus(orderId) {
    let orderInfo = {
        id: orderId,
        status,
    };

    store
        .dispatch("CHANGE_STATUS", orderInfo)
        .then(() => {
            let ordersTitle = document.getElementsByClassName("orders__title");

            if (ordersTitle[0].children[0].localName == "ul") {
                ordersTitle[0].children[0].remove();
            }

            router.replace({
                name: "orders-admin",
            });
            router.go(0);

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = "Status changed";
            redTextLi.setAttribute(
                "style",
                "color: green; list-style: square;"
            );
            redTextUl.appendChild(redTextLi);

            ordersTitle[0].insertBefore(redTextUl, ordersTitle[0].children[0]);
        })
        .catch((error) => {
            let ordersTitle = document.getElementsByClassName("orders__title");

            if (ordersTitle[0].children[0].localName == "ul") {
                ordersTitle[0].children[0].remove();
            }

            router.replace({
                name: "orders-admin",
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = error;
            redTextLi.setAttribute("style", "color: red; list-style: square;");
            redTextUl.appendChild(redTextLi);

            ordersTitle[0].insertBefore(redTextUl, ordersTitle[0].children[0]);
        });
}
</script>

<style scoped>
.orders__confirm-btn {
    color: whitesmoke;
    background-color: #83a5e6;
    box-shadow: 0px 5px 23px -1px rgba(73, 120, 223, 0.56);
    border-radius: 23px;
    font-size: 16px;
    line-height: 20px;
    padding: 4px 55px;
    display: inline-block;
    cursor: pointer;
    margin-bottom: 10px;
}

.orders__confirm-btn:hover {
    background-color: #5871a0;
}

.select-css {
    margin-bottom: 10px;
}

.orders__button {
    font-size: 16px;
    line-height: 20px;
    padding: 4px 55px;
    cursor: pointer;
    display: inline-block;
}

.orders__body {
    padding: 214px 137px 100px 55px;
}

.orders__header {
    font-size: 30px;
    margin-bottom: 50px;
    text-align: center;
}

table {
    caption-side: bottom;
    border-collapse: collapse;
}

th {
    text-align: inherit;
    text-align: -webkit-match-parent;
}

thead,
tbody,
tfoot,
tr,
td,
th {
    border-bottom: 2px solid rgba(143, 143, 143, 0.274);
    padding: 10px 8px;
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    color: var(--bs-table-color);
    vertical-align: top;
    border-color: var(--bs-table-border-color);
}
.table > :not(caption) > * > * {
    padding: 0.5rem 0.5rem;
    background-color: var(--bs-table-bg);
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
.table > tbody {
    vertical-align: inherit;
}
.table > thead {
    vertical-align: bottom;
}
</style>
