import {header} from './Header.js';
import {main} from './Main.js';
import {footer} from './Footer.js';
import {nav} from './Nav.js';

class App {

    create() {
        this.element = document.createElement('div');
        this.element.classList.add('app');
    }

    render() {
        document.body.append(this.element);
        this.element.append(header, main, footer);
        header.append(nav);
    }

    async getData() {
        let url = 'https://fakestoreapi.com/products';
        return await fetch(url)
        .then(response =>{
            return response.json()
        })
        .then(data => {
            return data
        })
    }

    set storage(data) {
        localStorage.setItem('product', JSON.stringify(data));
    }

    get storage() {
        return JSON.parse(localStorage.getItem('product'));
    }

    init() {
        const meta = document.createElement('meta');
        meta.setAttribute('charset', 'UTF-8')
        const title = document.createElement('title');
        title.innerHTML = 'SPA'
        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/style.css')

        document.head.append(meta, title, link);
        
        this.getData().then(data =>{
            
            this.storage = data;
        })

        this.create()
        this.render()
    }
}

export default new App().init();