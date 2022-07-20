<template>
    <div class="profile">
        <div class="profile__container">
            <div class="profile__body">
                <div class="profile__header"><b>Your profile</b></div>

                <form
                    @submit.prevent="submit"
                    class="profile__form"
                    v-if="user"
                >
                    <div class="profile__block">
                        <label for="firstName">First name:</label>
                        <input
                            class="profile__input input"
                            id="firstName"
                            name="firstName"
                            type="text"
                            v-model="user.name"
                        />
                    </div>

                    <div class="profile__block">
                        <label for="lastName">Last name:</label>
                        <input
                            class="profile__input input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            v-model="user.surname"
                        />
                    </div>

                    <div class="profile__block">
                        <label for="mobPhone">Phone number:</label>
                        <input
                            class="profile__input input"
                            id="mobPhone"
                            name="mobPhone"
                            type="text"
                            v-model="user.mobPhone"
                        />
                    </div>

                    <div class="profile__block">
                        <label for="login">E-mail:</label>
                        <input
                            class="profile__input input"
                            id="login"
                            name="login"
                            type="text"
                            v-model="user.email"
                        />
                    </div>

                    <div class="profile__block">
                        <label for="password">Password: </label>
                        <input
                            class="sign-in__input input"
                            id="password"
                            name="password"
                            type="password"
                            v-model="user.password"
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
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
let user = ref(computed(() => store.getters.USER));

onMounted(() => {
    store.dispatch("GET_USER");
});

function submit() {
    let changedUser = {
        name: user.value.name,
        surname: user.value.surname,
        mobPhone: user.value.mobPhone,
        email: user.value.email,
        password: user.value.password,
    };

    store
        .dispatch("PROFILE", changedUser)
        .then(() => {
            let profileForm = document.getElementsByClassName("profile__form");

            if (profileForm[0].children[0].localName == "ul") {
                profileForm[0].children[0].remove();
            }

            router.replace({
                name: "profile",
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = "Changes saved";
            redTextLi.setAttribute(
                "style",
                "color: green; list-style: square;"
            );
            redTextUl.appendChild(redTextLi);

            profileForm[0].insertBefore(redTextUl, profileForm[0].children[0]);
        })
        .catch((error) => {
            let profileForm = document.getElementsByClassName("profile__form");

            if (profileForm[0].children[0].localName == "ul") {
                profileForm[0].children[0].remove();
            }

            router.replace({
                name: "profile",
            });

            let redTextUl = document.createElement("ul");
            let redTextLi = document.createElement("li");
            redTextLi.textContent = error;
            redTextLi.setAttribute("style", "color: red; list-style: square;");
            redTextUl.appendChild(redTextLi);

            profileForm[0].insertBefore(redTextUl, profileForm[0].children[0]);
        });
}
</script>

<style>
.profile__body {
    padding: 234px 137px 500px 55px;
}

.profile__form {
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

.profile__input {
    margin-left: 5px;
}

.profile__block {
    margin-bottom: 20px;
}

.profile__header {
    font-size: 30px;
    margin-bottom: 100px;
    text-align: center;
}
</style>
