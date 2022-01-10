class Product {
    create() {
        document.querySelector('.container').innerHTML = '';
        let data = JSON.parse(localStorage.getItem('product'));

        let div = document.createElement('div');
        div.classList.add('item');

        let div2 = document.createElement('div');
        div2.classList.add('item2')

        let h2 = document.createElement('h2');

        let p = document.createElement('p');

        let img = document.createElement('img');
        img.setAttribute('src', data[0].image);

        let h3 = document.createElement('h3');
    
        document.querySelector('.container').append(div, div2);

        div.append(h2, img, h3);
        div2.append(p);
       
        data.forEach(element => {
            if (element.id == +location.hash.substring(8)){
                h2.innerHTML = element.title;
                img.setAttribute('src', element.image);
                p.innerHTML = element.description;
                h3.innerHTML = element.category;
            }
        })
    }

    init() {
        this.create()
    }
}

const product = new Product().init()
export default product