'use strict';

import  tabs from './modules/tabs';
import  modal from './modules/modal';
import  timer from './modules/timer';
import  calc from './modules/calc';
import  forms from './modules/forms';
import  slider from './modules/slider';
import  cards from './modules/cards';

window.addEventListener('DOMContentLoaded', () => {
    
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('2023-08-09');
    calc();
    forms('form');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        field: '.offer__slider-inner',
        wrapper: '.offer__slider-wrapper',
        currentCounter: '#current',
        totalCounter: '#total'
    });
    cards();
});