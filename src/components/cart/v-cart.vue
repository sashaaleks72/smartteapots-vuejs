<template>
    <div id="popup" class="popup">
        <div class="popup__body">
            <div class="popup__content">
                <a href="#" class="popup__close close-popup"
                    ><img src="../../images/cart/close-item.svg"
                /></a>
                <div class="cart">
                    <div class="cart__title">Shopping cart</div>
                    <div class="cart__body">
                        <MyCartItem
                            v-for="(item, index) in props.cart_data"
                            :key="item.id"
                            :cart_item_data="item"
                            @deleteFromCart="deleteFromCart(index)"
                            @incrementItem="incrementItem(index)"
                            @decrementItem="decrementItem(index)"
                        />
                        <p v-if="props.cart_data.length == 0">Cart is empty</p>

                        <div v-if="props.cart_data.length > 0">
                            <div class="cart__total-sum">
                                Total: <span>{{ totalPrice }} ₴</span>
                            </div>
                            <router-link
                                class="cart__confirm-btn button close-popup"
                                :to="{ name: 'make-an-order' }"
                                >Make an order</router-link
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import MyCartItem from "@/components/cart/v-cart-item";
import { useStore } from "vuex";
import { defineProps, computed } from "vue";

const props = defineProps({ cart_data: Array });
const store = useStore();

function deleteFromCart(index) {
    store.dispatch("DELETE_FROM_CART", index);
}

function incrementItem(index) {
    store.dispatch("INCREMENT_CART_ITEM", index);
}

function decrementItem(index) {
    store.dispatch("DECREMENT_CART_ITEM", index);
}

const totalPrice = computed(() => {
    let result = 0;

    for (const item of props.cart_data) {
        result += item.quantity * item.price;
    }

    return result.toFixed(2);
});
</script>
<style>
.popup {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.8s ease 0s;
    z-index: 100;
}

.popup.open {
    opacity: 100%;
    visibility: visible;
}

.popup__free {
    position: absolute;
    width: 100%;
    height: 100%;
}

.popup__body {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
}

.popup__content {
    position: relative;
    background-color: #ffffff;
    padding: 30px;
    min-width: 970px;
    min-height: 563px;
    box-shadow: 0px 4px 31px 10px rgba(0, 0, 0, 0.25);
    border-radius: 31px;
    padding: 81px 32px 59px 104px;
}

.popup__close {
    position: absolute;
    right: 32px;
    top: 40px;
}

.cart__title {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 30px;
    opacity: 35%;
}

.cart__body {
    display: flex;
    flex-direction: column;
}

.cart__total-sum {
    font-weight: 800;
    font-size: 36px;
    line-height: 44px;
    margin-top: 40px;
    align-self: flex-end;
    margin-right: 30px;
}

.cart__total-sum span {
    font-weight: 500;
}

.cart__confirm-btn {
    display: inline-block;
    margin-top: 40px;
    padding: 11px 45px 11px 45px;
    align-self: flex-end;
    margin-right: 30px;
}
</style>
