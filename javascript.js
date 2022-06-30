const addBookBtn = document.querySelector('.addBookBtn');
const bookStatusBtn = document.querySelector('.bookStatusBtn')
const card = document.querySelector('.card')
const popup = document.querySelector('.popup')

let myLibrary = [];

// object constructor for new book
function book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
}; 

function addBookToLibrary() {
    let newBook = object.create(book.prototype)
}

for (book in myLibrary) {
}


const book1 = new book('How to WIN', 'Jason Campbell', '666', 'hella read that');

book1.info();



// add book 
addBookBtn.addEventListener('click', () => {
    popup.id = 'newBook';
})



// toggle book status
bookStatusBtn.addEventListener('click', (e) => {
    if (e.target.id === 'read') {
        card.id = 'notRead'
        bookStatusBtn.id = 'notRead'
        bookStatusBtn.textContent = 'Not read!'
    } else if (e.target.id === 'notRead') {
        card.id = 'read'
        bookStatusBtn.id = 'read'
        bookStatusBtn.textContent = 'Read!'
    } else {
        console.log('this is weird')
    }
})