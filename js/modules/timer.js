// Timer
function timer(deadline) {

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

export default timer;