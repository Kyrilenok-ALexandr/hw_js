class Header {
    create() {
        this.element = document.createElement('header');
        this.element.classList.add('header');
        
    }

    init() {
        this.create()
        return this.element
    }
}

const header = new Header().init();
export {header};