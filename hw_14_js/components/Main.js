class Main {
    create() {
        this.element = document.createElement('main');
        this.element.classList.add('main');
        let container = document.createElement('div');
        container.classList.add('container');
        this.element.append(container);

        if (!location.hash) {
            import('./home.js')
        }

        window.addEventListener('hashchange', _ => {
            if (location.hash == '#cart') {
                 import('./cart.js')
            } else {
                import('./product.js')
            }
        })
    }

    init() {
        this.create()
        return this.element
    }
}

const main = new Main().init()
export {main}