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