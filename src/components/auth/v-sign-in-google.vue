<template>
    <div class="signin-btns__google" @click="signInByGoogle">
        <img src="@/images/auth/google.svg" width="35" />
    </div>
    <div class="signin-btns__facebook" @click="signInByGoogle">
        <img src="@/images/auth/facebook.svg" width="38" />
    </div>
</template>

<script>
export default {
    name: "GoogleSignIn",
    data() {
        return {
            user: "",
        };
    },
    methods: {
        async signInByGoogle() {
            try {
                const googleUser = await this.$gAuth.signIn();
                if (!googleUser) {
                    return null;
                }

                let gUser = googleUser.getBasicProfile();

                this.user = {
                    googleId: gUser.getId(),
                    name: gUser.getName().split(" ")[0] || "Not given",
                    surname: gUser.getName().split(" ")[1] || "Not given",
                    email: gUser.getEmail(),
                };

                this.$store
                    .dispatch("SIGN_IN_BY_GOOGLE", this.user)
                    .then(() => {
                        this.$router.replace({
                            name: "home",
                        });
                    });
            } catch (error) {
                return null;
            }
        },
    },
};
</script>
