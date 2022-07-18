<template>
    <main class="main">
        <div class="main__get-started get-started">
            <div class="get-started__container">
                <div class="get-started__body">
                    <div class="get-started__image">
                        <img
                            src="@/images/get-started/main_img.png"
                            alt="get-started-image"
                        />
                    </div>
                    <div class="get-started__content">
                        <div class="get-started__title">
                            Бери умный чайник, если живешь в 21-ом веке
                        </div>
                        <div class="get-started__text">
                            Интернет-магазин чайников даст тебе возможность
                            определиться в каком веке ты живешь!
                        </div>
                        <a href="#" class="get-started__button button"
                            >Посмотреть чайники</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="why">
            <div class="why__container">
                <div class="why__title title">Почему именно мы?</div>
                <div class="why__advantages advantages">
                    <div class="advantages__column">
                        <div class="advantages__image">
                            <img src="@/images/why/01.svg" alt="01" />
                        </div>
                        <div class="advantages__content">
                            <div class="advantages__header">Надёжность</div>
                            <div class="advantages__text">
                                Наши чайники долговечны и процент гарантийных
                                ремонтов сводится к нулю
                            </div>
                        </div>
                    </div>
                    <div class="advantages__column">
                        <div class="advantages__image">
                            <img src="@/images/why/02.svg" alt="02" />
                        </div>
                        <div class="advantages__content">
                            <div class="advantages__header">
                                Хороший материал
                            </div>
                            <div class="advantages__text">
                                Чайники произведены из нержавеющей стали
                            </div>
                        </div>
                    </div>
                    <div class="advantages__column">
                        <div class="advantages__image">
                            <img src="@/images/why/03.svg" alt="03" />
                        </div>
                        <div class="advantages__content">
                            <div class="advantages__header">
                                Быстрая доставка
                            </div>
                            <div class="advantages__text">
                                Доставка в течении 1-2 дней по всей Украине
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MyCatalog />
    </main>
</template>
<script>
import MyCatalog from "@/components/catalog/v-catalog";

export default {
    name: "MyMain",
    components: {
        MyCatalog,
    },
};
</script>
<style>
/*-----------------GET-STARTED----------------------*/

.get-started__body {
    padding: 264px 137px 184px 55px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.get-started__content {
    margin-left: 77px;
}

.get-started__title {
    line-height: 26px;
    margin-bottom: 14px;
    font-weight: 500;
}

.get-started__text {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 35px;
}

.get-started__button {
    padding: 13px 25px 13px 25px;
}

.button {
    color: inherit;
    background-color: #ec2e2e;
    box-shadow: 0px 5px 23px -1px rgba(236, 46, 46, 0.56);
    border-radius: 23px;
}

.button:hover {
    background-color: #a92525;
}

.title {
    font-weight: 900;
    font-size: 24px;
    line-height: 29px;
}

.why__advantages {
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.advantages__column {
    display: flex;
    flex: 0 0 289px;
    margin-bottom: 10px;
}

.advantages__content {
    padding-left: 10px;
}

.advantages__header {
    font-weight: 900;
    font-size: 14px;
    line-height: 17px;
}

.advantages__text {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
}
</style>
