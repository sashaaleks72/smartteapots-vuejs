<template>
    <div class="checkout">
        <div class="checkout__container">
            <div class="checkout__body">
                <div class="checkout__header"><b>Checkout</b></div>
                <h3 style="font-size: 30px">Orders:</h3>
                <table class="table">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    <tr v-for="cartItem in cart" :key="cartItem.id">
                        <td>{{ cartItem.title }}</td>
                        <td>{{ cartItem.price }} ₴</td>
                        <td>{{ cartItem.quantity }}</td>
                        <td>
                            <img
                                :src="cartItem.img"
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
                        <td><b>Total: </b> {{ totalPrice }} ₴</td>
                    </tr>
                </table>

                <form @submit.prevent="makeAnOrder" class="order__form">
                    <div class="order__block">
                        <label for="add-info">Add info:</label>
                        <input
                            class="order__input input"
                            id="add-info"
                            name="add-info"
                            type="text"
                            v-model="form.orderAddInfo"
                        />
                    </div>

                    <div class="order__drop-down-list">
                        <label for="add-info">Choose delivery service:</label>
                        <select class="select-css" v-model="deliveryObj">
                            <option
                                v-for="delivery in deliveries"
                                :key="delivery.id"
                                v-bind:value="delivery"
                            >
                                {{ delivery.adress }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" class="submit-btn button">
                            Make an order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const cart = ref(computed(() => store.state.cartItems));
let deliveries = computed(() => store.getters.DELIVERIES);

onMounted(() => {
    store.dispatch("GET_DELIVERIES");
});

const totalPrice = computed(() => {
    let result = 0;

    for (const item of cart.value) {
        result += item.quantity * item.price;
    }

    return result.toFixed(2);
});

const router = useRouter();

let deliveryObj = ref("");

let form = ref({
    orderAddInfo: "Please give me one teapot for free((",
    userId: "",
    deliveryId: "",
    orderInfo: [],
});

function makeAnOrder() {
    let dropDownList = document.getElementsByClassName("order__drop-down-list");

    if (dropDownList[0].children[0].localName == "ul") {
        dropDownList[0].children[0].remove();
    }

    if (deliveryObj.value) {
        form.value["deliveryId"] = deliveryObj.value.id;

        store.dispatch("MAKE_AN_ORDER", form.value).then(() => {
            router.replace({
                name: "home",
            });
        });
    } else {
        let redTextUl = document.createElement("ul");
        let redTextLi = document.createElement("li");
        redTextLi.textContent = "You need to choose delivery service";
        redTextLi.setAttribute("style", "color: red; list-style: square;");
        redTextUl.appendChild(redTextLi);

        dropDownList[0].insertBefore(redTextUl, dropDownList[0].children[0]);
    }
}
</script>

<style>
.select-css {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    width: 200px;
    padding: 5px;
}
.select-css::-ms-expand {
    display: none;
}
.select-css:hover {
    border-color: #888;
}
.select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
}
.select-css option {
    font-weight: normal;
}

.order__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.order__input {
    margin-left: 5px;
}

.order__block {
    margin-bottom: 10px;
}

.order__drop-down-list {
    margin-bottom: 10px;
}

.checkout__button {
    font-size: 16px;
    line-height: 20px;
    padding: 4px 55px;
    cursor: pointer;
    display: inline-block;
}

.checkout__body {
    padding: 214px 137px 200px 55px;
}

.checkout__header {
    font-size: 30px;
    margin-bottom: 50px;
    text-align: center;
}

.order__input {
    width: 300px;
    height: 30px;
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
