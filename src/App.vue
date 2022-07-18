<template>
    <head>
        <link
            href="https://fonts.googleapis.com/css?family=Montserrat:regular,500,600,700,800,900&display=swap&subset=cyrillic-ext"
            rel="stylesheet"
        />
    </head>
    <div class="wrapper">
        <MyHeader />
        <router-view></router-view>
        <MyFooter />
        <MyCart :cart_data="CART_ITEMS" />
    </div>
</template>

<script setup>
import MyHeader from "@/components/header/v-header";
import MyFooter from "@/components/footer/v-footer";
import MyCart from "@/components/cart/v-cart";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const CART_ITEMS = computed(() => store.getters.CART_ITEMS);

onMounted(() => {
    let allScripts = document.getElementsByTagName("script");

    for (let item of allScripts) {
        if (item.attributes["src"].value == "js/popup.js") {
            item.remove();
        }
    }

    let popupScript = document.createElement("script");

    popupScript.setAttribute("src", "js/popup.js");
    document.body.appendChild(popupScript);
});
</script>

<style>
* {
    border: 0;
    margin: 0;
    padding: 0;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

nav,
footer,
header,
aside {
    display: block;
}

input::-ms-clear {
    display: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
    font-weight: 400;
}

ul li {
    list-style: none;
}

a {
    text-decoration: none;
}

body,
html {
    font-family: Montserrat;
    font-size: 18px;
    height: 100%;
    font-weight: 400;
    scroll-behavior: smooth;
}

.wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
}

[class*="__container"] {
    max-width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    padding: 0 15px 0 15px;
}
</style>
