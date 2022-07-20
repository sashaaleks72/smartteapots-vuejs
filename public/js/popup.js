let popup = document.querySelectorAll(".popup-link");
let body = document.querySelector("body");
let paddingLock = document.querySelectorAll(".lock-padding");

let unlock = true;
let timeout = 800;

if (popup.length > 0) {
    //проверка на существуемость ссылок
    for (let i = 0; i < popup.length; i++) {
        let popupLink = popup[i];
        popupLink.addEventListener("click", function (e) {
            /*при клике на ссылку в атрибуте href убираем хеш*/
            let popupName = popupLink.getAttribute("href").replace("#", "");
            /*получение элемента (то есть получаем сам объект), id которого хранится в popupName*/
            let currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault(); //запрет на перезагрузку
        });
    }
}

let popupClose = document.querySelectorAll(".close-popup");
if (popupClose.length > 0) {
    //проверка на существуемость ссылок
    for (let i = 0; i < popupClose.length; i++) {
        let closeElement = popupClose[i];
        closeElement.addEventListener("click", function (e) {
            popupCloseFunc(closeElement.closest(".popup"));
            e.preventDefault(); //запрет на перезагрузку
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        let popupActive = document.querySelector(".popup.open");
        if (popupActive) {
            popupCloseFunc(popupActive, false);
        } else {
            bodyScrollLock();
        }
        currentPopup.classList.add("open");
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest(".popup__content")) {
                popupCloseFunc(e.target.closest(".popup"));
            }
        });
    }
}

function bodyScrollLock() {
    let lockPaddingValue =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
    for (let i = 0; i < paddingLock.length; i++) {
        const el = paddingLock[i];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let i = 0; i < paddingLock.length; i++) {
            let el = paddingLock[i];
            el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function popupCloseFunc(popupActive, doUnlock = true) {
    if (unlock && popupActive != null) {
        popupActive.classList.remove("open");
    }
    if (doUnlock) {
        bodyUnlock();
    }
}
