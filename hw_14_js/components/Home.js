class Home {
    create() {
        
        let data = JSON.parse(localStorage.getItem('product'));
        let arrBuy;
        if (localStorage.getItem('productCart')) {
            arrBuy = JSON.parse(localStorage.getItem('productCart'));
        } else {
            arrBuy = []
        }
        
        data.forEach(element => {
           let div = document.createElement('div');
           div.classList.add('item');

           let h2 = document.createElement('h2');
           h2.innerHTML = element.title;

           let img = document.createElement('img');
           img.setAttribute('src', element.image)

           let span = document.createElement('span');
           span.innerHTML = element.price + ' $';

           let h3 = document.createElement('h3');
           h3.innerHTML = element.category;

           let button = document.createElement('button');
           button.classList.add('buy');
           button.innerHTML = 'Buy';

           let a = document.createElement('a');
           a.setAttribute('href', `http://127.0.0.1:5500/#product${element.id}`);
           a.innerHTML = 'Go to product';
           a.classList.add('goToProduct');
           
           document.querySelector('.container').append(div);
           div.append(h2, img, span, h3, a, button);

           button.addEventListener('click', event => {
               let divBuy = event.target.closest('div');
               event.target.innerHTML = '&#10004;'
               event.target.classList.add('clickBuy');
               let title = divBuy.querySelector('h2').textContent;
               let price = divBuy.querySelector('span').textContent;
               price = +price.slice(0, -2)
               console.log(price)
               
               if (title == element.title && (!arrBuy.includes(element))) {
                   arrBuy.push(element);
                   localStorage.setItem('productCart', JSON.stringify(arrBuy));
                   document.querySelector('.count').innerHTML = +document.querySelector('.count').textContent + 1;
                   document.querySelector('.price').innerHTML = (+document.querySelector('.price').textContent.slice(0, -2) + price).toFixed(2) + ' $';
               }
           })
        });
    }

    init() {
        this.create()
    }
}

const home = new Home().init()
export default home