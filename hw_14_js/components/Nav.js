class Nav {
    create() {
        this.element = document.createElement('nav');
        this.element.classList.add('nav');

        let count = document.createElement('span');
        count.classList.add('count');

        if (localStorage.getItem('productCart')) {
            let number = JSON.parse(localStorage.getItem('productCart')).length;
            count.innerHTML = number;
        } else {
            count.innerHTML = '0';
        }

        let price = document.createElement('span');
        price.classList.add('price');

        if (localStorage.getItem('productCart')) {
            let priceArrow = JSON.parse(localStorage.getItem('productCart'));

             priceArrow = priceArrow.map(item => {
               return item.price
            })
            let total = priceArrow.reduce((acc, item) => {
                return acc + item;
            }, 0)
            total = total.toFixed(2)
             price.innerHTML = total + ' $'
            
        } else {
            price.innerHTML = 0 + ' $'
        }

        let ul = document.createElement('ul');
        let li = document.createElement('li');
        let li2 = document.createElement('li')
        let a = document.createElement('a');
        a.setAttribute('href', 'http://127.0.0.1:5500/')

        let a2 = document.createElement('a');
        a2.setAttribute('href', 'http://127.0.0.1:5500/#cart')

        a.innerHTML = 'Main';
        a2.innerHTML = 'Cart'
        this.element.append(ul)
        ul.append(li, li2)
        li.append(a);
        li2.append(a2, count, price);
    }

    init() {
        this.create()
        return this.element
    }
}

const nav = new Nav().init()
export {nav}