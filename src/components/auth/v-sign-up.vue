<template>
    <div class="signup">
        <div class="signup__container">
            <div class="signup__body">
                <div class="signup__header"><b>Sign up</b></div>

                <form @submit.prevent="submit" class="signup__form">
                    <div class="signup__block">
                        <label for="firstName">First name:</label>
                        <input
                            class="signup__input input"
                            id="firstName"
                            name="firstName"
                            type="text"
                            v-model="form.name"
                        />
                    </div>

                    <div class="signup__block">
                        <label for="lastName">Last name:</label>
                        <input
                            class="signup__input input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            v-model="form.surname"
                        />
                    </div>

                    <div class="signup__block">
                        <label for="mobPhone">Phone:</label>
                        <input
                            class="signup__input input"
                            id="mobPhone"
                            name="mobPhone"
                            type="text"
                            v-model="form.mobPhone"
                        />
                    </div>

                    <div class="signup__block">
                        <label for="login">E-mail:</label>
                        <input
                            class="signup__input input"
                            id="login"
                            name="login"
                            type="text"
                            v-model="form.email"
                        />
                    </div>

                    <div class="signup__block">
                        <label for="password">Password: </label>
                        <input
                            class="signup__input input"
                            id="password"
                            name="password"
                            type="password"
                            v-model="form.password"
                        />
                    </div>

                    <div>
                        <button type="submit" class="submit-btn button">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let form = ref({
    name: "",
    surname: "",
    mobPhone: "",
    email: "",
    password: "",
});

function submit() {
    console.log(form);
    store.dispatch("SIGN_UP", form.value).then(() => {
        router.replace({
            name: "home",
        });
    });
}
</script>

<style>
.signup__body {
    padding: 234px 137px 500px 55px;
}

.signup__form {
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

.signup__input {
    margin-left: 5px;
}

.signup__block {
    margin-bottom: 20px;
}

.signup__header {
    font-size: 30px;
    margin-bottom: 100px;
    text-align: center;
}
</style>
