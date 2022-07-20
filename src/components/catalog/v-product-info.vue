<template>
    <div class="product-info">
        <div class="product-info__container">
            <div class="product-info__body">
                <div class="product-info__header">
                    <b>Product info</b>
                </div>

                <div class="product-info__element-img">
                    <img :src="teapot.img" alt="teapot" width="200" />
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Title:</h2>
                    <p class="info-el__value">{{ teapot.title }}</p>
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Year:</h2>
                    <p class="info-el__value">{{ teapot.year }}</p>
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Weight:</h2>
                    <p class="info-el__value">{{ teapot.weight }}</p>
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Material:</h2>
                    <p class="info-el__value">{{ teapot.material }}</p>
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Capacity:</h2>
                    <p class="info-el__value">{{ teapot.capacity }}</p>
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Features:</h2>
                    <p class="info-el__value">{{ teapot.features }}</p>
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Quantity:</h2>
                    <p class="info-el__value">{{ teapot.amount }}</p>
                </div>

                <div class="product-info__element">
                    <h2 class="info-el__name">Price:</h2>
                    <p class="info-el__value">{{ teapot.price }} грн</p>
                </div>

                <div
                    v-if="teapot.amount"
                    class="item-catalog__btn button"
                    @click="addToCart"
                >
                    Add to cart
                </div>
                <div v-else class="item-catalog__out-of-stock">
                    Out of stock
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let teapotId = ref(router.currentRoute.value.params.id);

let teapot = computed(() => store.getters.TEAPOT);

onMounted(() => {
    store.dispatch("GET_TEAPOT_BY_ID", teapotId.value);
});

function addToCart() {
    store.dispatch("ADD_TO_CART", teapot.value);
}
</script>

<style>
.product-info__body {
    padding: 234px 137px 100px 55px;
}

.product-info__element {
    display: flex;
    margin-bottom: 5px;
}

.info-el__name {
    font-weight: bold;
    margin-right: 5px;
}

.submit-btn {
    font-size: 18px;
    padding: 5px;
    min-width: 200px;
    font-family: inherit;
    border-radius: 20px;
}

.product-info__header {
    font-size: 30px;
    margin-bottom: 50px;
    text-align: center;
}
</style>
