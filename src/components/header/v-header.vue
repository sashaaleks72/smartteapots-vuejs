<template>
    <header class="header">
        <div class="header__container">
            <a href="#" class="header__logo">
                <img src="@/images/header/Logo.svg" alt="logo" />
            </a>
            <nav class="header__menu menu">
                <ul class="menu__list">
                    <router-link class="menu__item" :to="{ name: 'home' }"
                        ><li class="menu__item">Home</li></router-link
                    >
                    <template v-if="isAdmin">
                        <router-link
                            class="menu__item"
                            :to="{ name: 'add-product' }"
                            ><li>Add product</li>
                        </router-link>
                        <router-link
                            class="menu__item"
                            :to="{ name: 'orders-admin' }"
                            ><li>Orders management</li>
                        </router-link>
                    </template>
                    <template v-else>
                        <a href="#catalog" class="menu__item"
                            ><li>Catalog</li></a
                        >
                        <a href="" class="menu__item"><li>Contacts</li></a>
                    </template>
                    <template v-if="isAuthenticated && !isAdmin">
                        <router-link class="menu__item" :to="{ name: 'orders' }"
                            ><li>Orders</li>
                        </router-link>
                    </template>
                </ul>
            </nav>
            <nav class="header__auth-menu auth-menu">
                <ul class="auth-menu__list">
                    <template v-if="isAuthenticated">
                        <a
                            href="#"
                            @click.prevent="signOut"
                            class="auth-menu__item"
                            ><li class="auth-menu__item">
                                SignOut ({{ user.name }})
                            </li></a
                        >
                        <router-link
                            class="auth-menu__item auth-menu__item-2"
                            :to="{ name: 'profile' }"
                            ><li class="auth-menu__item">
                                <img
                                    src="@/images/header/user.svg"
                                    alt="profile"
                                    width="25"
                                /></li
                        ></router-link>
                    </template>
                    <template v-else>
                        <router-link
                            class="auth-menu__item"
                            :to="{ name: 'signin' }"
                            ><li class="auth-menu__item">
                                SignIn
                            </li></router-link
                        >
                        <router-link
                            class="auth-menu__item"
                            :to="{ name: 'signup' }"
                            ><li class="auth-menu__item">
                                SignUp
                            </li></router-link
                        >
                    </template>
                </ul>
            </nav>
            <a href="#popup" class="header__basket popup-link">
                <img src="@/images/header/Basket.svg" alt="logo" />
            </a>
        </div>
    </header>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let isAuthenticated = computed(() => store.getters.AUTHENTICATED);
let isAdmin = computed(() => store.getters.ADMIN);
let user = computed(() => store.getters.USER);

function signOut() {
    store.dispatch("SIGN_OUT").then(() => {
        router.replace({
            name: "home",
        });
    });
}
</script>

<style>
.auth-menu__list {
    display: flex;
    align-items: center;
}

.auth-menu__list a:not(:last-child) {
    margin-right: 15px;
}

.auth-menu__item li {
    border-bottom: 2px solid transparent;
    transition: 0.4s;
}

.auth-menu__item li:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    transition: 0.4s;
}

.auth-menu__item {
    color: inherit;
    line-height: 26px;
}

.header {
    background-color: #c2baf1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
}

.header__container {
    display: flex;
    min-height: 150px;
    align-items: center;
    justify-content: space-between;
}

.menu__list {
    display: flex;
    flex-wrap: wrap;
}

.menu__list a:not(:last-child) {
    margin-right: 35px;
}

.menu__item li {
    border-bottom: 2px solid transparent;
    transition: 0.4s;
}

.menu__item li:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    transition: 0.4s;
}

.menu__item {
    color: inherit;
    line-height: 26px;
}
</style>
