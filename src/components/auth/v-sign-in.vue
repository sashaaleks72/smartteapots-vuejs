<template>
    <div class="signin">
        <div class="signin__container">
            <div class="signin__body">
                <div class="signin__header"><b>Sign In</b></div>

                <form @submit.prevent="submit" class="signin__form">
                    <div class="signin__block">
                        <label for="login">Login:</label>
                        <input
                            class="sign-in__input input"
                            id="login"
                            name="login"
                            type="text"
                            v-model="form.email"
                        />
                    </div>

                    <div class="signin__block">
                        <label for="password">Password: </label>
                        <input
                            class="sign-in__input input"
                            id="password"
                            name="password"
                            type="password"
                            v-model="form.password"
                        />
                    </div>

                    <div class="signin-btns">
                        <button type="submit" class="submit-btn button">
                            Sign in
                        </button>
                        <GoogleSignIn />
                    </div>
                </form>
                <router-link
                    style="float: right; margin-top: 20px"
                    :to="{ name: 'signup' }"
                    >I'm not signed up</router-link
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import GoogleSignIn from "@/components/auth/v-sign-in-google";

const store = useStore();
const router = useRouter();

let form = ref({
    email: "",
    password: "",
});

// function signInByGoogle() {
//     store.dispatch("SIGN_IN_BY_GOOGLE").then(() => {
//         router.replace({
//             name: "home",
//         });
//     });
// }

function submit() {
    store
        .dispatch("SIGN_IN", form.value)
        .then(() => {
            router.replace({
                name: "home",
            });
        })
        .catch(() => {
            let signInForm = document.getElementsByClassName("signin__form");

            if (signInForm[0].children[0].localName == "ul") {
                signInForm[0].children[0].remove();
            }

            router.replace({
                name: "signin",
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = "Login or pass is wrong";
            redTextLi.setAttribute("style", "color: red; list-style: square;");
            redTextUl.appendChild(redTextLi);

            signInForm[0].insertBefore(redTextUl, signInForm[0].children[0]);
        });
}
</script>

<style>
.signin-btns {
    position: relative;
}

.signin-btns__google {
    position: absolute;
    top: -1px;
    left: 210px;
}

.signin-btns__facebook {
    position: absolute;
    top: -3px;
    left: 250px;
}

.btn-block {
    display: flex;
}

.btn-block > div {
    margin: 2px 0px 0px 10px;
}

.signin__body {
    padding: 234px 137px 500px 55px;
}

.signin__form {
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

.sign-in__input {
    margin-left: 5px;
}

.signin__block {
    margin-bottom: 20px;
}

.signin__header {
    font-size: 30px;
    margin-bottom: 100px;
    text-align: center;
}
</style>
