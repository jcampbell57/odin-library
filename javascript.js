// page elements
const addBookBtn = document.querySelector('.addBookBtn');
const submitBookBtn = document.getElementById('submitBookBtn');
const bookStatusBtn = document.querySelector('.bookStatusBtn');
const card = document.querySelector('.card');
const removeCard = document.getElementById('removeCard');
const popup = document.querySelector('.popup');
const closePopup = document.getElementById('closePopup');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookPages = document.getElementById('bookPages');
const bookStatus = document.getElementById('bookStatus');

// library array
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



// open popup / add book 
addBookBtn.addEventListener('click', () => {
    popup.id = 'newBook';
})

// close popup
closePopup.addEventListener('click', () => {
    popup.id = 'noNewBook';
})

// submit book
submitBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    console.log(bookTitle);
    console.log(bookAuthor.textContent);
    console.log(bookPages.textContent);
    console.log(bookStatus.textContent);
    popup.id = 'noNewBook';

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

// remove book / card
removeCard.addEventListener('click', (e) => {
    e.path[2].remove();
})