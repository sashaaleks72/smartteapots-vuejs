<template>
    <div class="product-change">
        <div class="product-change__container">
            <div class="product-change__body">
                <div class="product-change__header">
                    <b>Changing product</b>
                </div>

                <form @submit.prevent="submit" class="product-change__form">
                    <div class="product-change__block">
                        <label for="title">Title:</label>
                        <input
                            class="product-change__input input"
                            id="title"
                            name="title"
                            type="text"
                            v-model="teapot.title"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="year">Date of production:</label>
                        <input
                            class="product-change__input input"
                            id="year"
                            name="year"
                            type="text"
                            v-model="teapot.year"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="weight">Weight:</label>
                        <input
                            class="product-change__input input"
                            id="weight"
                            name="weight"
                            type="text"
                            v-model="teapot.weight"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="material">Material:</label>
                        <input
                            class="product-change_input input"
                            id="material"
                            name="material"
                            type="text"
                            v-model="teapot.material"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="capacity">Capacity: </label>
                        <input
                            class="product-change__input input"
                            id="capacity"
                            name="capacity"
                            type="text"
                            v-model="teapot.capacity"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="features">Features: </label>
                        <input
                            class="product-change__input input"
                            id="features"
                            name="features"
                            type="text"
                            v-model="teapot.features"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="amount">Quantity: </label>
                        <input
                            class="product-change__input input"
                            id="amount"
                            name="amount"
                            type="text"
                            v-model="teapot.amount"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="price">Price: </label>
                        <input
                            class="product-change__input input"
                            id="price"
                            name="price"
                            type="text"
                            v-model="teapot.price"
                        />
                    </div>

                    <div class="product-change__block">
                        <label for="img">Image url: </label>
                        <input
                            class="product-change__input input"
                            id="img"
                            name="img"
                            type="text"
                            v-model="teapot.img"
                        />
                    </div>

                    <div>
                        <button type="submit" class="submit-btn button">
                            Save changes
                        </button>
                    </div>
                </form>
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

onMounted(() => {
    store.dispatch("GET_TEAPOT_BY_ID", teapotId.value);
});

let teapot = computed(() => store.getters.TEAPOT);

function submit() {
    let changedTeapot = {
        id: teapotId.value,
        title: teapot.value.title,
        year: Number(teapot.value.year),
        weight: Number(teapot.value.weight),
        material: teapot.value.material,
        capacity: Number(teapot.value.capacity),
        features: teapot.value.features,
        amount: Number(teapot.value.amount),
        price: Number(teapot.value.price),
        img: teapot.value.img,
    };

    store
        .dispatch("CHANGE_PRODUCT", changedTeapot)
        .then(() => {
            let productChangeForm = document.getElementsByClassName(
                "product-change__form"
            );

            if (productChangeForm[0].children[0].localName == "ul") {
                productChangeForm[0].children[0].remove();
            }

            router.replace({
                name: "change-product",
                params: teapotId,
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = "Changes saved";
            redTextLi.setAttribute(
                "style",
                "color: green; list-style: square;"
            );
            redTextUl.appendChild(redTextLi);

            productChangeForm[0].insertBefore(
                redTextUl,
                productChangeForm[0].children[0]
            );
        })
        .catch((error) => {
            let productChangeForm = document.getElementsByClassName(
                "product-change__form"
            );

            if (productChangeForm[0].children[0].localName == "ul") {
                productChangeForm[0].children[0].remove();
            }

            router.replace({
                name: "change-product",
                params: teapotId,
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = error;
            redTextLi.setAttribute("style", "color: red; list-style: square;");
            redTextUl.appendChild(redTextLi);

            productChangeForm[0].insertBefore(
                redTextUl,
                productChangeForm[0].children[0]
            );
        });
}
</script>

<style>
.product-change__body {
    padding: 234px 137px 150px 55px;
}

.product-change__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.submit-btn {
    font-size: 18px;
    padding: 5px;
    min-width: 200px;
    font-family: inherit;
    border-radius: 20px;
}

.input {
    height: 20px;
    font-size: 16px;
    font-family: inherit;
    border: 1px solid black;
    border-radius: 5px;
}

.product-change__input {
    margin-left: 5px;
}

.product-change__block {
    margin-bottom: 20px;
}

.product-change__header {
    font-size: 30px;
    margin-bottom: 100px;
    text-align: center;
}
</style>
