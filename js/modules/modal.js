function modal() {
       //Modal

       const modalTrigger = document.querySelectorAll('[data-modal]'),
       modal = document.querySelector('.modal');
       
 function openModalFunction() {
     modal.classList.add('show');
     modal.classList.remove('hide');
     document.body.style.overflow = 'hidden';
 }

 modalTrigger.forEach(item => {
     item.addEventListener('click', openModalFunction)
 })


 function closeModalFunction() {
     modal.classList.add('hide');
     modal.classList.remove('show');
     document.body.style.overflow = '';
 }

 modal.addEventListener('click', (e) => {
     if(e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModalFunction();
     }
 });

 document.addEventListener('keydown', (e) => {
     if(e.code === 'Escape' && modal.classList.contains('show')) {
         closeModalFunction();
     }
 });


 function showModalByScroll() {
     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModalFunction();
         window.removeEventListener('scroll', showModalByScroll);
     }
 }

 window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;