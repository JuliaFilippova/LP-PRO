window.addEventListener('DOMContentLoaded', () => {

    // trigger-селектор нашей кнопки на которую клик, modal-модальное окно которые открываем, close - закрытие именно этого модального окна.
    function bindModal(triggerSelector, modalSelector, modalSelectorBody, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector), //кнопки вызывающие модалку
            modal = document.querySelector(modalSelector), // подложка модального окна 
            modalBody = document.querySelector(modalSelectorBody), //модальное окно окошко
            close = document.querySelector(closeSelector), //закрытие модального
            windows = document.querySelectorAll('[data-modal]'), //общий атрибут data-modal у каждой мадалки
            scroll = calcScroll(); //запустили функцию в переменной (убирает дергание страницы при открытие модального окна)

        trigger.forEach(item => { //цикл, т.к. у нас будет в нескольких местах вызываться модальное окно
            item.addEventListener('click', (e) => { //(e) если есть href#
                if (e.target) {
                    e.preventDefault();
                }

                // windows.forEach(item => { //закрываются все модальные окна по клику по общему атрибуту data-modal
                //     item.style.opacity = '0'
                // });

                modal.classList.add('modal-overlay-show');
                modalBody.classList.add('modal-body-show');
                // modal.style.opacity = '1';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`; // убирает дергание страницы при открытие модального окна

            });
        });
        close.addEventListener('click', () => { //по клику на крестик закрываем окно
            windows.forEach(item => { //закрываются все модальные окна по клику по общему атрибуту data-modal
                // item.style.opacity = '0'
                // document.body.classList.remove('modal-overlay-show');
            });

            modal.classList.remove('modal-overlay-show');
            modalBody.classList.remove('modal-body-show');
            // modal.style.opacity = '0';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`; // убирает дергание страницы при закрытии модального окна

        });

        modal.addEventListener('click', (e) => { //по клику вне формы закрываем окно подложка
            if (e.target === modal && closeClickOverlay) { //если 2 эти условия верны, то код выполнится
                windows.forEach(item => { //закрываются все модальные окна по клику по общему атрибуту data-modal
                    // item.style.opacity = '0'
                    modal.classList.remove('modal-overlay-show');
                    modalBody.classList.remove('modal-body-show');
                });

                modal.classList.remove('modal-overlay-show');
                modalBody.classList.remove('modal-body-show');
                // modal.style.opacity = '0';
                document.body.style.overflow = '';
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

})