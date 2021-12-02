let img = function(id) {
    let elem = document.querySelectorAll('#' + id);

    if (elem.length > 1) return;

    let element = elem[0];
    let img = element.querySelectorAll('img');

    let show = function(event) {
        event.preventDefault();
        let link = event.target;

        if (link.nodeName != 'A') {
            link = link.closest('a');
        }

        let srcImg = link.getAttribute('href');

        let div = document.createElement('div');
        div.classList.add('img_show');
        element.append(div);

        div.style.backgroundImage = `url(${srcImg})`;

        let close = function(event) {
            let allDiv = element.querySelectorAll('.img_show');

            allDiv.forEach(item =>{
                item.classList.add('none')
            })
        }

        let closeImg = document.createElement('span');
        closeImg.classList.add('close');
        closeImg.innerHTML = 'X';
        div.append(closeImg)

        closeImg.addEventListener('click', event => {
            close(event)
        });
    }

    img.forEach(item => {
        item.addEventListener('click', event => {
            show(event)
        })
    })
}

img('maket')

const slider = function(id) {
    let elem = document.querySelectorAll('#' + id);

    if (elem.length == 0 || elem.length > 1) return;

    let element = elem[0];
    let img = element.querySelectorAll('.photo');
    let counter = 0;
    let widthImg = null;

    img.forEach(item => {
        let width = item.offsetWidth;
        let marginImg = window.getComputedStyle(item).getPropertyValue('margin-right');
        marginImg = +marginImg.substr(0, 2);
        widthImg = width + marginImg;
    })

    let wrapperSlider = element.querySelector('.wrapper_slider');
    wrapperSlider.style.width = widthImg * 2 + 'px';

    let ul = element.querySelector('.wrapper_slider ul');

    ul.style.width = widthImg * img.length + 'px';
    
    let left = element.querySelector('.left');
    let right = element.querySelector('.right');

    let move = function() {
        if (counter >= img.length - 2) {
            counter = 0;
        }

        counter++

        sliderRoll()
    }

    let move2 = function() {
        if (counter == 0) {
            counter = img.length - 1;
        }

        counter--

        sliderRoll()
    }

    function sliderRoll() {
        ul.style.transform = 'translate(-' + widthImg * counter + 'px)';
    }

    left.addEventListener('click', function(){
        move2()
    })

    right.addEventListener('click', function(){
        move()
    })
}

slider('Idslider')

