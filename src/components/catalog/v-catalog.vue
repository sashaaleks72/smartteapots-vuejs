<template>
    <div class="catalog" id="catalog">
        <div class="catalog__container">
            <div class="catalog__title title">Каталог товаров</div>
            <div class="drop-down-list__container">
                <div class="catalog__drop-down-list-1">
                    <select class="select-css" v-model="selectedManufacturer">
                        <option>All</option>
                        <option
                            v-for="manufacturer in manufacturers"
                            :key="manufacturer.id"
                            v-bind:value="manufacturer"
                        >
                            {{ manufacturer.name }}
                        </option>
                    </select>
                </div>
                <div class="catalog__drop-down-list-2">
                    <select
                        @change="onChangeFilter"
                        class="select-css"
                        v-model="selectedFilter"
                    >
                        <option>default</option>
                        <option>popularity ASC</option>
                        <option>popularity DESC</option>
                        <option>title ASC</option>
                        <option>title DESC</option>
                        <option>price ASC</option>
                        <option>price DESC</option>
                    </select>
                </div>
            </div>
            <div class="catalog__body">
                <MyCatalogItem
                    v-for="teapot in teapots"
                    :key="teapot.id"
                    v-bind:product_element="teapot"
                    @addToCart="addToCart"
                    @deleteProduct="deleteProduct"
                />
            </div>
            <div
                class="catalog__pagination pagination"
                v-if="!selectedManufacturer.teapots"
            >
                <div @click="prevPage" class="pagination__prev">&#60;--</div>
                <div class="pagination__value">
                    {{ page }} / {{ quanOfPages }}
                </div>
                <div @click="nextPage" class="pagination__next">--&#62;</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MyCatalogItem from "@/components/catalog/v-catalog-item";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let teapots = computed(() => store.getters.TEAPOTS);
let manufacturers = computed(() => store.getters.MANUFACTURERS);
let page = ref(1);
let quanOfPages = computed(() => store.getters.GET_MAX_PAGE);
let selectedFilter = ref("default");

let options = {
    sortBy: undefined,
    howSort: undefined,
    page: page.value,
    manufacturerName: undefined,
};

onMounted(() => {
    store.dispatch("GET_TEAPOTS", options);
    store.dispatch("GET_MANUFACTURERS");
    store.dispatch("GET_MAX_PAGE");
});

let selectedManufacturer = ref("All");

function onChangeFilter() {
    let splittedFilter = selectedFilter.value.split(" ");

    options = {
        sortBy: splittedFilter[0],
        howSort: splittedFilter[1],
        page: page.value,
        manufacturerName: selectedManufacturer.value,
    };

    if (options.sortBy == "default") options.sortBy = undefined;
    if (options.manufacturerName == "All") options.manufacturerName = undefined;

    store.dispatch("GET_TEAPOTS", options);
}

function addToCart(data) {
    store.dispatch("ADD_TO_CART", data);
}

function deleteProduct(product) {
    let productIdToDelete = product.id;
    store.dispatch("PRODUCT_TO_DELETE", productIdToDelete).then(() => {
        router.replace({
            name: "home",
        });
    });

    router.go(0);
}

function prevPage() {
    if (page.value > 1) {
        page.value--;
        options.page = page.value;
        store.dispatch("GET_TEAPOTS", options);
    }
}

async function nextPage() {
    if (page.value < quanOfPages.value) {
        page.value++;
        options.page = page.value;
        store.dispatch("GET_TEAPOTS", options);
    }
}
</script>

<style>
.drop-down-list__container {
    display: flex;
}

.catalog__drop-down-list-2 {
    margin-left: 10px;
}

.catalog__pagination {
    display: flex;
    justify-content: center;
}

.catalog__pagination > * {
    margin-right: 10px;
}

.pagination__prev {
    cursor: pointer;
}

.pagination__next {
    cursor: pointer;
}

.catalog {
    margin-top: 100px;
    margin-bottom: 20px;
}

.catalog__body {
    margin: 52px -10px 30px -10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

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
</style>
