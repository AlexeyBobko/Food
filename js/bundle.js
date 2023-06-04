/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
       //Calorie calculator

       const result = document.querySelector('.calculating__result span');
       let sex, height, weight, age, ratio;
       
       if(localStorage.getItem('sex')) {
           sex = localStorage.getItem('sex')
       } else {
           sex = 'female';
           localStorage.setItem('sex', 'female');
       }
   
       if(localStorage.getItem('ratio')) {
           ratio = localStorage.getItem('ratio')
       } else {
           ratio = 1.375;
           localStorage.setItem('ratio', 1.375);
       }
   
       function initLocalSettings(selector, activeClass) {
           const elements = document.querySelectorAll(selector);
   
           elements.forEach(elem => {
               elem.classList.remove(activeClass);
               if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                   elem.classList.add(activeClass);
               }
               if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                   elem.classList.add(activeClass);
               }
           })
       }
   
       initLocalSettings('#gender div', 'calculating__choose-item_active');
       initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
   
       function calcTotal() {
           if(!sex || !height || !weight || !age || !ratio) {
               result.textContent = "____";
               return;
           }
   
           if(sex === 'female') {
               result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
           }else {
               result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
           }
       }
       calcTotal();
   
       function getStaticInformation(selector, activeClass) {
           const elements = document.querySelectorAll(selector);
   
           elements.forEach(elem => {
               elem.addEventListener('click', (e) => {
                   if(e.target.getAttribute('data-ratio')) {
                       ratio = +e.target.getAttribute('data-ratio');
                       localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                   } else {
                       sex = e.target.getAttribute('id');
                       localStorage.setItem('sex', e.target.getAttribute('id'));
                   }
   
                   elements.forEach(elem => {
                       elem.classList.remove(activeClass);
                   })
   
                   e.target.classList.add(activeClass);
                   calcTotal();
               });
           });
           
       }
   
       getStaticInformation('#gender div', 'calculating__choose-item_active');
       getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
   
       function getDynamicInformation(selector) {
           const input = document.querySelector(selector);
   
           input.addEventListener('input', () => {
   
               if(input.value.match(/\D/g)) {
                   input.style.border = '1px solid red';
               }else {
                   input.style.border = 'none';
               }
   
               switch(input.getAttribute('id')) {
                   case 'height':
                       height = +input.value;
                       break;
                   case 'weight':
                       weight = +input.value;
                       break;
                   case 'age':
                       age = +input.value;
                       break;
               }
               calcTotal();
           })
   
       }
   
       getDynamicInformation('#height');
       getDynamicInformation('#weight');
       getDynamicInformation('#age');
}
module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
 //Menu cards using classes

 class MenuCard {
    constructor(img, alt, title, descr, price, parentSelector, ...classes) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.transfer = 2.81;
        this.changeToBYN();
    }
    
    changeToBYN() {
        this.price = this.price * this.transfer;
    }

    render() {
        const element = document.createElement('div');
        this.classes.forEach(className => element.classList.add(className));
        element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
        `;
        this.parent.append(element);
    }
}

// const getResources = async (url) => {
//     let res = await fetch(url);
// if(!res.ok) {
//     throw new Error(`URL: ${url}, status ${res.status}`);
// }
//     return await res.json();
// };
// getResources('http://localhost:3000/menu')
// .then(data => {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
//     })
// })

axios.get('http://localhost:3000/menu')
.then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        })
    });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
        //Forms

        const forms = document.querySelectorAll('form');
        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо, мы с вами свяжемся',
            failure: 'Что-то пошло не так'
        };
    
        forms.forEach(item => {
            bindPostData(item);
        });
    
        const postData = async (url, data) => {
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });
        
            return await res.json();
        };
    
        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);
            
                const formData = new FormData(form);
    
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            });
        }
    
        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.classList.remove('show');
            prevModalDialog.classList.add('hide');
            openModalFunction();
    
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
    
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
    
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.remove('hide');
                prevModalDialog.classList.add('show');
                closeModalFunction();
            }, 3000)
        }
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
       // Slider

       const slides = document.querySelectorAll('.offer__slide'),
       slider = document.querySelector('.offer__slider'),
       prev = document.querySelector('.offer__slider-prev'),
       next = document.querySelector('.offer__slider-next'),
       total = document.querySelector('#total'),
       current = document.querySelector('#current'),
       slidesWrapper = document.querySelector('.offer__slider-wrapper'),
       slidesField = document.querySelector('.offer__slider-inner'),
       width = window.getComputedStyle(slidesWrapper).width;
 let slideIndex = 1,
     offset = 0;

 if(slides.length < 10) {
     total.textContent = `0${slides.length}`;
     current.textContent = `0${slideIndex}`;
 } else {
     total.textContent = slides.length;
     current.textContent = slideIndex;
 }
 
 slidesField.style.width = 100 * slides.length +'%';
 slidesField.style.display = 'flex';
 slidesField.style.transition = '0.5s all';

 slidesWrapper.style.overflow = 'hidden';
 slides.forEach(slide => {
     slide.style.width = width;
 });

 slider.style.position = 'relative';

 const indicators = document.createElement('ol'),
       dots = [];
 indicators.classList.add('carousel-indicators');
 slider.append(indicators);

 for(let i = 0; i < slides.length; i++) {
     const dot = document.createElement('li');

     dot.setAttribute('data-slide-to', i + 1);
     dot.classList.add('dot');
     if (i == 0) {
         dot.style.opacity = 1;
     }
     indicators.append(dot);
     dots.push(dot);
 }

 function deleteNotDigigts(str) {
     return +str.replace(/\D/g, '');
 }

 next.addEventListener('click', () => {
     if(offset == deleteNotDigigts(width) * (slides.length - 1)) {
         offset = 0;
     } else {
         offset += deleteNotDigigts(width);
     }
     slidesField.style.transform = `translateX(-${offset}px)`;

     if(slideIndex == slides.length) {
         slideIndex = 1;
     } else {
         slideIndex++;
     }

     if(slides.length < 10) {
         current.textContent = `0${slideIndex}`;
     } else {
         current.textContent = slideIndex;
     }

     dots.forEach(dot => dot.style.opacity = ".5");
     dots[slideIndex-1].style.opacity = 1;
 })

 prev.addEventListener('click', () => {
     if(offset == 0) {
         offset = deleteNotDigigts(width) * (slides.length - 1)
     } else {
         offset -= deleteNotDigigts(width);
     }
     slidesField.style.transform = `translateX(-${offset}px)`;

     if(slideIndex == 1) {
         slideIndex = slides.length;
     } else {
         slideIndex--;
     }

     if(slides.length < 10) {
         current.textContent = `0${slideIndex}`;
     } else {
         current.textContent = slideIndex;
     }

     dots.forEach(dot => dot.style.opacity = ".5");
     dots[slideIndex-1].style.opacity = 1;
 });

 dots.forEach(dot => {
     dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         slideIndex = slideTo;
         offset = deleteNotDigigts(width) * (slideTo - 1);

         slidesField.style.transform = `translateX(-${offset}px)`;
        
         if(slides.length < 10) {
             current.textContent = `0${slideIndex}`;
         } else {
             current.textContent = slideIndex;
         }
         dots.forEach(dot => dot.style.opacity = ".5");
         dots[slideIndex-1].style.opacity = 1;
     });
 })

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
        // Tabs
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
      tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
      })

      tabs.forEach(item => {
          item.classList.remove('tabheader__item_active');
      })
  }

  function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
  }

  tabsParent.addEventListener('click', (e) => {
      if(e.target && e.target.classList.contains('tabheader__item')){
          tabs.forEach((tab, i) => {
              if(e.target == tab) {
                  hideTabContent(i);
                  showTabContent(i)
              }
          })
      }
  })
  hideTabContent();
  showTabContent();
}
module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

// Timer
function timer() {


const deadline = '2023-08-09';

function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date);

    if(t <= 0) {
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0;
    } else {
        days = Math.floor(t/86400000),
        hours = Math.floor((t/3600000)%24),
        minutes = Math.floor((t/1000/60)% 60),
        seconds = Math.floor((t/1000)%60);
    }

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function getZero(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
function setClock(endtime) {
    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
          updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if(t.total <= 0) {
            clearInterval(timeInterval)
        }
    }
}

setClock(deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
            modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
            timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
            calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
            forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
            slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
            cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
    
    tabs();
    modal();
    timer();
    calc();
    forms();
    slider();
    cards();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map