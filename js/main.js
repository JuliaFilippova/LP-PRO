window.addEventListener('DOMContentLoaded', () => {

    // trigger-селектор кнопки по клику, modalSelector-модальное окно которые открываем, modalSelectorBody-содержимое окна, close - закрытие именно этого модального окна.
    function bindModal(triggerSelector, modalSelector, modalSelectorBody, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector), //кнопки вызывающие модалку
            modal = document.querySelector(modalSelector), // подложка модального окна 
            modalBody = document.querySelector(modalSelectorBody), //модальное окно окошко
            close = document.querySelectorAll(closeSelector), //закрытие модального
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
        close.forEach(item => {

            item.addEventListener('click', () => { //по клику на крестик закрываем окно

                modal.classList.remove('modal-overlay-show'); //класс для плавного показа мод окна
                modalBody.classList.remove('modal-body-show'); //класс для плавного показа мод окна
                document.body.style.overflow = ''; //возвращает скролл
                document.body.style.marginRight = `0px`; // убирает дергание страницы при закрытии модального окна
            });
        });

        modal.addEventListener('click', (e) => { //по клику вне формы закрываем окно (подложка)
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
    // запускаем функции модальных окон
    bindModal('.js-modal-form', '.modal-window', '.modal-window__body', '.close-modal'); //модальное окно по клику
    bindModal('.js-modal-privacy', '.modal-privacy', '.modal-privacy__body', '.close-modal'); //политика конфиденциальности

    bindModal('.js-modal-video', '.modal-video', '.modal-video__body', '.close-modal'); //видео
    // проверка
    // let videoBtn = document.querySelector('.js-modal-video');
    // if (videoBtn.length != 0) {
    //     console.log('на странице есть видео')
    //     bindModal('.js-modal-video', '.modal-video', '.modal-video__body', '.close-modal'); //видео
    // } else {
    //     console.log('на странице нет видео')
    // }

    // маска для ввода телефона
    document.querySelectorAll('.phone-mask').forEach(item => {
        IMask(item, {
            mask: '+{7} (000) 000-00-00'
        });
    })

    // TABS
    let tab = function () {
        let tabNav = document.querySelectorAll('.tools-tabs__item'),
            tabContent = document.querySelectorAll('.tools-repair-tab_content'),
            tabName;

        tabNav.forEach(item => {
            item.addEventListener('click', selectTabNav)
        });

        function selectTabNav() {
            tabNav.forEach(item => {
                item.classList.remove('is-active');
            });
            this.classList.add('is-active');
            tabName = this.getAttribute('data-tab-name');
            selectTabContent(tabName);
        }

        function selectTabContent(tabName) {
            tabContent.forEach(item => {
                item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active');
            })
        }
    };
    tab();
})
// hamburger menu
function burgerMenu(selector) {
    let menu = document.querySelector(selector),
        buttonMenu = document.querySelector('.burger-menu__btn');

    buttonMenu.addEventListener('click', (e) => {
        if (e.target) {
            e.preventDefault();
        }
        menu.classList.toggle('burger-menu__active');
        document.body.classList.toggle('over-hid');
    });

    document.querySelector('.modal-window_burger').onclick = (e) => {
        if (e.target.classList.contains('modal-window_burger')) {
            menu.classList.remove('burger-menu__active');
            document.body.classList.remove('over-hid');
        }
    }
}
burgerMenu('.burger-menu');
// загружаем видео в модальном окне, только после всей загрузки стр
window.onload = function () {
    setTimeout(function () {
        document.getElementById('video').src = 'https://www.youtube.com/embed/VPND4dyCMd0';
    }, 100);
    // загружаем карту, только после всей загрузки стр
    setTimeout(function () {
        document.getElementById('map').src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A4d349ab81caa0c2acf7f710b82840e0d8e61af791eaee42e673daa9820f15ecc&amp;source=constructor';
    }, 3000);

    // лайтбокс галерея
    lightGallery(document.getElementById('lightgallery'));

    // плавная прокрутка до якоря
    // собираем все якоря; устанавливаем время анимации и количество кадров
    const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
        animationTime = 1000,
        framesCount = 100;
    anchors.forEach(function (item) {
        // каждому якорю присваиваем обработчик события
        item.addEventListener('click', function (e) {
            // убираем стандартное поведение
            e.preventDefault();
            // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
            // запускаем интервал, в котором
            let scroller = setInterval(function () {
                // считаем на сколько скроллить за 1 такт
                let scrollBy = coordY / framesCount;
                // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
                // и дно страницы не достигнуто
                if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                    // то скроллим на к-во пикселей, которое соответствует одному такту
                    window.scrollBy(0, scrollBy);
                } else {
                    // иначе добираемся до элемента и выходим из интервала
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
                // время интервала равняется частному от времени анимации и к-ва кадров
            }, animationTime / framesCount);
        });
    });


};