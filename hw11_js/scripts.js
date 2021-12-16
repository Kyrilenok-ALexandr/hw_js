class User {
    constructor(data) {

        this.data = {
            id: data.id || 0,
            name: data.name || '---',
            email: data.email || '---',
            address: data.address || '---',
            phone: data.phone || '---'
        }
    }

    edit(obj) {
        for(let key in obj) {
            for(let key2 in this.data) {
                if (key == key2) {
                    this.data[key] = obj[key]
                }
            }
        }
    }

    get() {
        return this.data;
    }
}

class Contacts {
    constructor() {
        this.data = []
    }

    add(data) {
       this.data.forEach(item =>{
           if (item.data.id == item.data.id) {
               item.data.id++
           }
       })

       let user = new User(data)
       this.data.push(user)
    }

    edit(id, obj) {
        let user = this.data.find(item =>{
            return item.data.id == id;
        })

        user.edit(obj)
    }

    remove(id) {
        this.data.forEach((item, index) =>{
            if (id == item.data.id) {
                this.data.splice(index, 1)
            }
        })
    }

    get() {
        return this.data;
    }
}

class ContactsApp extends Contacts {
    constructor() {
        super()

        this.init()
    }

    init() {
        let btnAddELem = document.querySelector('button');

        this.inputTitleName = document.querySelector('.name');
        this.inputTitleTel = document.querySelector('.tel');
        this.inputTitleAddress = document.querySelector('.address');
        this.inputTitleEmail = document.querySelector('.email');
        this.listElem = document.querySelector('.contacts');

        btnAddELem.addEventListener('click', event => {
            event.preventDefault()
            this.onAdd()
            this.inputTitleName.value = '';
            this.inputTitleTel.value = '';
            this.inputTitleAddress.value = '';
            this.inputTitleEmail.value = '';

            this.update()
        })

        let data = this.storage;

        if (data && data.length > 0) {
            this.data = data;
            this.update();
        }
    }



    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {

        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
      
        document.cookie = updatedCookie;
    }

    set storage(data) {
        localStorage.setItem('contact', JSON.stringify(data));
        this.setCookie('storageExpiration', data, {'max-age': 3000});
    }

    get storage() {
        
        this.getCookie('storageExpiration');
        
        let localData = JSON.parse(localStorage.getItem('contact'));

        if (!localData) return;

        localData = localData.map(el=> {
            el = new User(el.data);
            return el;
        })
       
        return localData;
    }

    update() {
        let data = this.get()

        this.listElem.innerHTML = '';

        data.forEach(item =>{
            this.divShow = document.createElement('div');
            this.divShow.classList.add('divShow');

            let wrapperName = document.createElement('div');
            wrapperName.classList.add('wrapper_name');

            let wrapperPhone = document.createElement('div');
            wrapperPhone.classList.add('wrapper_phone');

            let wrapperAddress = document.createElement('div');
            wrapperAddress.classList.add('wrapper_address');

            let wrapperEmail = document.createElement('div');
            wrapperEmail.classList.add('wrapper_email');
           
            let spanName = document.createElement('span');
            let spanPhone = document.createElement('span');
            let spanAddress = document.createElement('span');
            let spanEmail = document.createElement('span');

            spanName.innerHTML = 'Name: ';
            spanPhone.innerHTML = 'Phone: ';
            spanAddress.innerHTML = 'Address: ';
            spanEmail.innerHTML = 'Email: ';

            let divName = document.createElement('div');
            divName.classList.add('dName');
            
            let divPhone = document.createElement('div');
            divPhone.classList.add('dPhone');
            let divAddress = document.createElement('div');
            divAddress.classList.add('dAddress');
            let divEmail = document.createElement('div');
            divEmail.classList.add('dEmail');
            
            let close = document.createElement('button');
            close.classList.add('closeListElem');
            close.innerHTML = '&#10008;';

            let btnEdit = document.createElement('button');
            btnEdit.classList.add('edit');
            btnEdit.innerHTML = 'Save';

            divName.setAttribute('contentEditable', true);
            divPhone.setAttribute('contentEditable', true);
            divAddress.setAttribute('contentEditable', true);
            divEmail.setAttribute('contentEditable', true);

            divName.innerHTML = item.data.name;
            divPhone.innerHTML = item.data.phone;
            divAddress.innerHTML = item.data.address;
            divEmail.innerHTML = item.data.email;

            wrapperName.append(spanName, divName);
            wrapperPhone.append(spanPhone, divPhone);
            wrapperAddress.append(spanAddress, divAddress);
            wrapperEmail.append(spanEmail, divEmail);

            this.divShow.append(wrapperName, wrapperPhone, wrapperAddress, wrapperEmail, close, btnEdit);
            this.listElem.append(this.divShow);

            btnEdit.addEventListener('click', _ => {
                this.onEdit(item.data.id, divName, divPhone, divAddress, divEmail)
            })

            close.addEventListener('click', _ => {
                this.onRemove(item.data.id)
            })
        })

        this.storage = data;
    }

    onAdd() {
        let name = this.inputTitleName.value;
        let phone = this.inputTitleTel.value;
        let address = this.inputTitleAddress.value;
        let email = this.inputTitleEmail.value;

        let data = {
            name: name,
            phone: phone,
            address: address,
            email: email
        }

        return this.add(data)
    }

    onRemove(id) {
        this.remove(id)
        return this.update()
    }

    onEdit(id, divName, divPhone, divAddress, divEmail) {
        let data = {
            name: divName.textContent,
            phone: divPhone.textContent,
            address: divAddress.textContent,
            email: divEmail.textContent
        }

        this.edit(id, data);
        this.update()
    }
}

let contactsApp = new ContactsApp()
console.log(contactsApp)
