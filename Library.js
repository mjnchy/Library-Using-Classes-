const bookArray = {};

class Book {
    constructor () {
        this.name = document.querySelector('#form-input')[0].value;
        this.author = document.querySelector('#form-input')[1].value;
        this.releaseDate = document.querySelector('#form-input')[2].value;
        this.read = document.querySelector('#form-input')[3].checked;
    };

    createBookElements () {
        const self = this;

        function createBookElements (a, x, y, z =['card-content']) {
            a = document.createElement(x);
            a.textContent = y;
            a.classList.add(...z);

            return a;
        };

        function createCardBtn () {
            const newDiv = createBookElements('newDiv', 'div', undefined, ['content-btn-div']);
            
            const rmvBtn = createBookElements('newBtn', 'button', undefined, ['card-btn-rmv']);
            const rmvIcon = createBookElements('newIcon', 'i', undefined, ['fa-solid', 'fa-trash']);
            rmvBtn.append(rmvIcon);
            
            const readBtn = createBookElements('newBtn', 'button', undefined, ['card-btn-read']);

            const readIcon = self.read === true? createBookElements('newIcon', 'i', undefined, ['fa-solid', 'fa-check']):
            createBookElements('newIcon', 'i', undefined, ['fa-solid', 'fa-exclamation']);
            
            readBtn.append(readIcon);
            
            newDiv.append(readBtn, rmvBtn);

            return newDiv;
        };

        const newBook = createBookElements('newBook', 'div', undefined, ['card']);
            newBook.append(createBookElements('bookName', 'h2', [`"${this.name}"`]),
            createBookElements('by', 'h5', 'by'),
            createBookElements('authorName', 'h4', [this.author]),
            createBookElements('releaseDate', 'h4', [this.releaseDate]),
            createCardBtn()
        );
        
        return newBook;
    };

    appendElements() {
        const mainContent = document.querySelector('#main-content');
        const addBtn = document.querySelector('#add-card');
        const newBook = this.createBookElements();

        mainContent.insertBefore(newBook, addBtn);
    };
};

(function viewForm () {
    const form = document.querySelector('#form-hidden');
    function formStatusChanger () {
        form.id === 'form-hidden'? form.id = 'form-view': form.id = 'form-hidden';
    };

    const addBtn = document.querySelector('#add-card');
    addBtn.addEventListener('click', formStatusChanger);
    
    const quitBtn = document.querySelector('.quit');
    quitBtn.addEventListener('click', formStatusChanger);
})();

(function addBook () {
    const form = document.querySelector('#form-input');
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let book = new Book();
        bookArray[book.name] = book;
        book.appendElements();
    });
})();

const maindContent = document.querySelector('#main-content');

function rmvBook (x) {
    delete(bookArray[x.children[0].textContent.replaceAll('"', '')]);
    maindContent.removeChild(x);
};

function readBook (x) {
    bookArray[x.children[0].textContent.replaceAll('"', '')].read = !bookArray[x.children[0].textContent.replaceAll('"', '')].read;
};

function changeStatus (x) {
            x.contains('fa-exclamation')? x.replace('fa-exclamation', 'fa-check'): x.replace('fa-check', 'fa-exclamation');
}

(function updateLibrary () {
    maindContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('card-btn-rmv')) {
            rmvBook(e.target.parentElement.parentElement);
        }

        else if (e.target.classList.contains('fa-trash')) {
            rmvBook(e.target.parentElement.parentElement.parentElement);
        }

        else if (e.target.classList.contains('card-btn-read')) {
            readBook(e.target.parentElement.parentElement);
            changeStatus(e.target.firstChild.classList);
            
        }

        else if (e.target.classList.contains('fa-check' || 'fa-excalamation')) {
            readBook(e.target.parentElement.parentElement.parentElement);
            changeStatus(e.target.classList);
        };
    });
})();