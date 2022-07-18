<template>
    <footer class="footer">
        <div class="footer__container">
            <a href="#" class="footer__logo"
                ><img src="@/images/footer/logo.svg" alt="logo"
            /></a>
            <div class="footer__text">2022 © All rights reserved</div>
            <div class="footer__social-icons social-icons">
                <a href="#" class="social-icons__item"
                    ><img src="@/images/footer/vk.svg" alt="vk-icon"
                /></a>
                <a href="#" class="social-icons__item"
                    ><img src="@/images/footer/insta.svg" alt="insta-icon"
                /></a>
                <a href="#" class="social-icons__item"
                    ><img src="@/images/footer/tg.svg" alt="tg-icon"
                /></a>
            </div>
            <a href="#" class="footer__button_up"
                ><img src="@/images/footer/btn.svg" alt="button-up"
            /></a>
        </div>
    </footer>
</template>
<script>
export default {
    name: "MyFooter",
};
</script>
<style>
.footer {
    background-color: #739ab6;
}

.footer__container {
    min-height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer__text {
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
}

.footer__social-icons {
    display: flex;
}

.social-icons__item {
    padding: 0 3px;
}
</style>
