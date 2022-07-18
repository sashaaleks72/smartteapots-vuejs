<template>
    <div class="orders">
        <div class="orders__container">
            <div class="orders__body">
                <div class="orders__header"><b>Orders</b></div>
                <h3 style="font-size: 30px">Your orders:</h3>
                <table class="table" v-for="order in orders" :key="order.id">
                    <div><b>Order id:</b> {{ order.id }}</div>
                    <div><b>Status:</b> {{ order.status }}</div>
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
                                width="142"
                                height="174"
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

const store = useStore();
const orders = ref(computed(() => store.state.orders));

onMounted(() => {
    store.dispatch("GET_ORDERS");
});
</script>

<style scoped>
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
