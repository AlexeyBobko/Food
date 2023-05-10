'use strict';

window.addEventListener('DOMContentLoaded', () => {
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
    showTabContent()

    // Timer

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
});