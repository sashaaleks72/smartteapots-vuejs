<template>
    <div class="cart__order-item item-order">
        <div class="item-order__name">
            {{ cart_item_data.title }}
        </div>
        <div class="item-order__body">
            <div class="item-order__image">
                <img
                    :src="cart_item_data.img"
                    alt="teapot"
                    width="142"
                    height="174"
                />
            </div>
            <div class="item-order__chg-quan chg-quan">
                <a href="#" @click="decrementItem" class="chg-quan__add-product"
                    ><img
                        src="../../images/cart/minus.svg"
                        alt="minus"
                        width="14"
                        height="14"
                /></a>
                <div class="chg-quan__quantity">
                    {{ cart_item_data.quantity }}
                </div>
                <a href="#" @click="incrementItem" class="chg-quan__add-product"
                    ><img src="../../images/cart/plus.svg" alt="plus" />
                </a>
                <div class="chg-quan__price">{{ cart_item_data.price }} ₴</div>
                <a
                    href="#"
                    class="chg-quan__rem-product"
                    @click="deleteFromCart"
                    ><img src="../../images/cart/trash-bin.svg" alt="trash-bin"
                /></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyCartItem",
    props: {
        cart_item_data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            cartItemData: this.cart_item_data,
        };
    },
    mounted() {
        if (!localStorage.getItem("cart")) this.cartItemData["quantity"] = 1;
    },
    computed: {},
    methods: {
        deleteFromCart() {
            this.$emit("deleteFromCart");
        },
        incrementItem() {
            this.$emit("incrementItem");
        },
        decrementItem() {
            this.$emit("decrementItem");
        },
    },
};
</script>
<style>
.item-order__body {
    display: flex;
}

.item-order__name {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 15px;
}

.item-order__chg-quan {
    display: flex;
    flex-direction: row;
    margin-left: 60px;
}

.item-order__chg-quan > * {
    margin-right: 10px;
}
</style>
