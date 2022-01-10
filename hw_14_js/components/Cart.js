class Cart {
    create() {
        document.querySelector('.container').innerHTML = '';
        let data = JSON.parse(localStorage.getItem('productCart'));

        let data2 = Object.values(data.reduce((acc,n) => ((!acc[n.id]) && (acc[n.id] = n), acc), {}));

        let arr = data.map(item => {
            return String(item.id);
        })

        data2.forEach((element, index) => {

            let div = document.createElement('div');
            div.classList.add('item');

            let h2 = document.createElement('h2');
            h2.innerHTML = element.title;

            let divCount = document.createElement('div');
            divCount.classList.add('divcount')

            let btnPlus = document.createElement('button');
            btnPlus.classList.add('btnplus');
            btnPlus.innerHTML = '+'

            let btnMinus = document.createElement('button');
            btnMinus.classList.add('btnminus');
            btnMinus.innerHTML = '-'

            let spanValue = document.createElement('span');
            spanValue.classList.add('spanvalue');

            let array = [];
        
            let el = String(element.id);
            let el_index = arr.indexOf(el);

            while(el_index != -1) {
                array.push(el_index);
                el_index = arr.indexOf(el, el_index +1)
            }

            spanValue.innerHTML = array.length;

            let img = document.createElement('img');
            img.setAttribute('src', element.image)

            let span = document.createElement('span');
            span.innerHTML = element.price + ' $';

            let h3 = document.createElement('h3');
            h3.innerHTML = element.category;

            let close = document.createElement('span');
            close.classList.add('close')
            close.innerHTML = 'X';

            divCount.append(btnMinus, spanValue, btnPlus);
            document.querySelector('.container').append(div);
            div.append(h2, img, span, h3, close, divCount);

            btnPlus.addEventListener('click', event => {
                let div = event.target.closest('.item');
                let spanV = div.querySelector('.spanvalue');
                spanV.innerHTML = +spanV.textContent + 1;

                let count = document.querySelector('.count')
                count.innerHTML = +count.textContent + 1;

                let price = document.querySelector('.price');
                let itemPrice= div.querySelector('.item span').textContent.slice(0, -2);
                price.innerHTML = (+price.textContent.slice(0, -2) + +itemPrice).toFixed(2) + ' $';

                let title = div.querySelector('h2');

                if (title.textContent == element.title) {
                    data.push(element)
                    localStorage.setItem('productCart', JSON.stringify(data))
                }
            })

            btnMinus.addEventListener('click', event => {
                let div = event.target.closest('.item');
                let spanV = div.querySelector('.spanvalue');
                
                let title = div.querySelector('h2');
                
                spanV.innerHTML = +spanV.textContent - 1;
                
                if (spanV.textContent == 0) {
                    div.remove()
                }

                if (title.textContent == element.title) {
                    data.splice(index, 1);

                    localStorage.setItem('productCart', JSON.stringify(data))

                    let count = document.querySelector('.count');
                    count.innerHTML = +count.textContent - 1;

                    let price = document.querySelector('.price');
                    let itemPrice = div.querySelector('.item span').textContent.slice(0, -2);
                    price.innerHTML = ((+price.textContent.slice(0, -2)) - (+itemPrice)).toFixed(2) + ' $';
                }  
            })
        })
       
       let close_ = document.querySelectorAll('.close');

       close_.forEach(item => {
           item.addEventListener('click', event => {
           let closeDiv = event.target.closest('div');
           let h2 = closeDiv.querySelector('h2').textContent;

           data = data.filter(item => {
                if (item.title !== h2) {
                    return item
                }
            })

            localStorage.setItem('productCart', JSON.stringify(data));
            let countLength = JSON.parse(localStorage.getItem('productCart')).length;
            
            document.querySelector('.count').innerHTML = countLength;
            
            let price = JSON.parse(localStorage.getItem('productCart'))
            price = price.map(item => {
                return item.price
            })
            
            let total = price.reduce((acc, item) => {
                return acc + item
            }, 0)

            document.querySelector('.price').innerHTML = total.toFixed(2) + ' $';

            closeDiv.remove()
        })

       })
    }

    init() {
        this.create()
    }
}

const cart = new Cart().init()
export default cart