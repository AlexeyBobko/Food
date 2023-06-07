function openModalFunction(modalSelector) {
const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

 function closeModalFunction(modalSelector) {
const modal = document.querySelector(modalSelector);
     modal.classList.add('hide');
     modal.classList.remove('show');
     document.body.style.overflow = '';
 }

function modal(triggerSelector, modalSelector) {
const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModalFunction(modalSelector))
    })

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModalFunction(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalFunction(modalSelector);
        }
    });


    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalFunction(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModalFunction, closeModalFunction};