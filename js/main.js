window.addEventListener('DOMContentLoaded', () => {

    // trigger-селектор нашей кнопки на которую клик, modal-модальное окно которые открываем, close - закрытие именно этого модального окна.
    function bindModal(triggerSelector, modalSelector, modalSelectorBody, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector), //кнопки вызывающие модалку
            modal = document.querySelector(modalSelector), // подложка модального окна 
            modalBody = document.querySelector(modalSelectorBody), //модальное окно окошко
            close = document.querySelector(closeSelector), //закрытие модального
            scroll = calcScroll(); //запустили функцию в переменной (убирает дергание страницы при открытие модального окна)

        trigger.forEach(item => { //цикл, т.к. у нас будет в нескольких местах вызываться модальное окно
            item.addEventListener('click', (e) => { //(e) если есть href#
                if (e.target) {
                    e.preventDefault();
                }

                modal.classList.add('modal-overlay-show'); //класс для плавного показа мод окна
                modalBody.classList.add('modal-body-show'); //класс для плавного показа мод окна
                document.body.style.overflow = 'hidden'; //убирает скролл
                document.body.style.marginRight = `${scroll}px`; // убирает дергание страницы при открытие модального окна

            });
        });
        close.addEventListener('click', () => { //по клику на крестик закрываем окно

            modal.classList.remove('modal-overlay-show'); //класс для плавного показа мод окна
            modalBody.classList.remove('modal-body-show'); //класс для плавного показа мод окна
            document.body.style.overflow = ''; //возвращает скролл
            document.body.style.marginRight = `0px`; // убирает дергание страницы при закрытии модального окна

        });

        modal.addEventListener('click', (e) => { //по клику вне формы закрываем окно подложка
            if (e.target === modal && closeClickOverlay) {

                modal.classList.remove('modal-overlay-show'); //класс для плавного показа мод окна
                modalBody.classList.remove('modal-body-show'); //класс для плавного показа мод окна
                document.body.style.overflow = ''; //возвращает скролл
                document.body.style.marginRight = `0px`; // убирает дергание страницы при закрытии модального окна
            }
        })
    }
    // убирает дергание страницы при открытие модального окна (заменяет скролл на маржин)
    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth; // высчитываем ширину скроллбара
        div.remove();

        return scrollWidth;
    }
    bindModal('.js-modal-form', '.modal-window', '.modal-window__body', '.close-modal'); //модальное окно по клику


    // hamburger menu
    function burgerMenu(selector) {
        let menu = document.querySelector(selector),
            buttonMenu = document.querySelector('.burger-menu__btn');

        buttonMenu.addEventListener('click', () => {
            menu.classList.toggle('burger-menu__active');
        });
    }
    burgerMenu('.burger-menu');


    document.querySelectorAll(".input").forEach(item => {
        window.intlTelInput(item, {
            preferredCountries: ['ru', 'by', 'ua'],
            allowDropdown: true,
            autoHideDialCode: true,
            nationalMode: true,
            separateDialCode: false,
        });
    })
})