<template>
    <div class="catalog__item item-catalog">
        <div class="item-catalog__image">
            <template v-if="isAdmin">
                <router-link
                    class="item-catalog__edit"
                    :to="{
                        name: 'change-product',
                        params: { id: props.product_element.id },
                    }"
                >
                    <img
                        src="@/images/catalog/edit.svg"
                        alt="edit"
                        width="25"
                    />
                </router-link>
                <div class="item-catalog__del" @click="deleteProduct">
                    <img
                        src="@/images/catalog/delete.svg"
                        alt="delete"
                        width="25"
                    />
                </div>
            </template>
            <router-link
                :to="{
                    name: 'product-info',
                    params: { id: props.product_element.id },
                }"
            >
                <img
                    :src="props.product_element.img"
                    alt="teapot"
                    width="200"
                />
            </router-link>
        </div>
        <div class="item-catalog__title">
            {{ props.product_element.title }}
        </div>
        <div class="item-catalog__price">
            {{ props.product_element.price }} грн
        </div>
        <div
            v-if="props.product_element.amount"
            class="item-catalog__btn button"
            @click="addToCart"
        >
            Add to cart
        </div>
        <div v-else class="item-catalog__out-of-stock">Out of stock</div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { defineProps, computed, defineEmits } from "vue";

const props = defineProps({ product_element: Object });
const store = useStore();
const emit = defineEmits(["addToCart", "deleteProduct", "changeProduct"]);

let isAdmin = computed(() => store.getters.ADMIN);

function addToCart() {
    emit("addToCart", props.product_element);
}

function deleteProduct() {
    emit("deleteProduct", props.product_element);
}
</script>

<style>
.item-catalog__image {
    position: relative;
}
.item-catalog__edit {
    position: absolute;
    right: 40px;
}

.item-catalog__del {
    position: absolute;
    right: 70px;
    top: 1px;
}

.catalog__item {
    flex: 0 0 25%;
    padding: 0 10px;
}

.catalog__item:not(:last-child) {
    margin-bottom: 50px;
}

.item-catalog__title {
    margin-top: 15px;
    font-size: 16px;
    line-height: 20px;
    max-width: 250px;
}

.item-catalog__price {
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
}

.item-catalog__btn {
    font-size: 16px;
    line-height: 20px;
    padding: 4px 55px;
    cursor: pointer;
    display: inline-block;
}

.item-catalog__out-of-stock {
    color: whitesmoke;
    background-color: #757272;
    box-shadow: 0px 5px 23px -1px rgba(95, 93, 93, 0.56);
    border-radius: 23px;
    font-size: 16px;
    line-height: 20px;
    padding: 4px 55px;
    display: inline-block;
}
</style>
