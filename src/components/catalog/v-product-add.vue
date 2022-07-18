<template>
    <div class="product-add">
        <div class="product-add__container">
            <div class="product-add__body">
                <div class="product-add__header">
                    <b>Adding product</b>
                </div>

                <form @submit.prevent="submit" class="product-add__form">
                    <div class="product-add__block">
                        <label for="title">Title:</label>
                        <input
                            class="product-add__input input"
                            id="title"
                            name="title"
                            type="text"
                            v-model="teapotToAdd.title"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="year">Date of production:</label>
                        <input
                            class="product-add__input input"
                            id="year"
                            name="year"
                            type="text"
                            v-model="teapotToAdd.year"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="weight">Weight:</label>
                        <input
                            class="product-add__input input"
                            id="weight"
                            name="weight"
                            type="text"
                            v-model="teapotToAdd.weight"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="material">Material:</label>
                        <input
                            class="product-add_input input"
                            id="material"
                            name="material"
                            type="text"
                            v-model="teapotToAdd.material"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="capacity">Capacity: </label>
                        <input
                            class="product-add__input input"
                            id="capacity"
                            name="capacity"
                            type="text"
                            v-model="teapotToAdd.capacity"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="features">Features: </label>
                        <input
                            class="product-add__input input"
                            id="features"
                            name="features"
                            type="text"
                            v-model="teapotToAdd.features"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="amount">Quantity: </label>
                        <input
                            class="product-add__input input"
                            id="amount"
                            name="amount"
                            type="text"
                            v-model="teapotToAdd.amount"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="price">Price: </label>
                        <input
                            class="product-add__input input"
                            id="price"
                            name="price"
                            type="text"
                            v-model="teapotToAdd.price"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="img">Image url: </label>
                        <input
                            class="product-add__input input"
                            id="img"
                            name="img"
                            type="text"
                            v-model="teapotToAdd.img"
                        />
                    </div>

                    <div class="product-add__block">
                        <label for="manufacturer">Manufacturer: </label>
                        <select class="select-css" v-model="manufacturerObj">
                            <option
                                v-for="manufacturer in manufacturers"
                                :key="manufacturer.id"
                                v-bind:value="manufacturer"
                            >
                                {{ manufacturer.name }}
                            </option>
                        </select>
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

onMounted(() => {
    store.dispatch("GET_MANUFACTURERS");
});

let manufacturers = computed(() => store.getters.MANUFACTURERS);
let manufacturerObj = ref();

let teapotToAdd = ref({
    title: "",
    year: 0,
    weight: 0,
    material: "",
    capacity: 0,
    features: "",
    amount: 0,
    price: 0,
    img: "",
    manufacturer: "",
});

function submit() {
    teapotToAdd.value["year"] = Number(teapotToAdd.value["year"]);
    teapotToAdd.value["weight"] = Number(teapotToAdd.value["weight"]);
    teapotToAdd.value["capacity"] = Number(teapotToAdd.value["capacity"]);
    teapotToAdd.value["amount"] = Number(teapotToAdd.value["amount"]);
    teapotToAdd.value["price"] = Number(teapotToAdd.value["price"]);

    if (manufacturerObj.value)
        teapotToAdd.value["manufacturer"] = manufacturerObj.value.id;

    store
        .dispatch("ADD_PRODUCT", teapotToAdd.value)
        .then(() => {
            let productChangeForm =
                document.getElementsByClassName("product-add__form");

            if (productChangeForm[0].children[0].localName == "ul") {
                productChangeForm[0].children[0].remove();
            }

            router.replace({
                name: "add-product",
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = "Product added";
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
        .catch(() => {
            let productChangeForm =
                document.getElementsByClassName("product-add__form");

            if (productChangeForm[0].children[0].localName == "ul") {
                productChangeForm[0].children[0].remove();
            }

            router.replace({
                name: "add-product",
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = "All fields must be filled!";
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

.product-add__body {
    padding: 234px 137px 150px 55px;
}

.product-add__form {
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

.product-add__input {
    margin-left: 5px;
}

.product-add__block {
    margin-bottom: 20px;
}

.product-add__header {
    font-size: 30px;
    margin-bottom: 100px;
    text-align: center;
}
</style>
