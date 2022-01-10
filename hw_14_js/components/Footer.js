class Footer {
    create() {
        this.element = document.createElement('footer');
        this.element.classList.add('footer');
    }

    init() {
        this.create()
        return this.element
    }
}

const footer = new Footer().init();
export {footer};