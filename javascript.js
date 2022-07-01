// page elements
const addBookBtn = document.querySelector('.addBookBtn');
const submitBookBtn = document.getElementById('submitBookBtn');

const bookStatusBtn = document.querySelectorAll('.bookStatusBtn');
const removeRow = document.querySelectorAll('#removeRow');

const popup = document.querySelector('.popup');
const closePopup = document.getElementById('closePopup');

const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookPages = document.getElementById('bookPages');
const bookStatus = document.getElementById('bookStatus');

// library array
let myLibrary = [
    // adding the placeholder books below breaks the book constructor
    // {
    //     title: 'The Intelligent Investor',
    //     author: 'Benjamin Graham',
    //     pages: '460',
    // },
    // {
    //     title: 'A Random Walk Down Wall St',
    //     author: 'Burton Malkiel',
    //     pages: '464',
    // },
];

// object constructor for new book
function book (title, author, pages, read) {
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
    popup.id = 'noNewBook';
    addCard();

    // for debugging
    // console.log(bookTitle.value);
    // console.log(bookAuthor.value);
    // console.log(bookPages.value);
})



// add book / row



// add book / card
function addCard() {
    // create new card
    const newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');
    newCard.setAttribute('id', 'notRead');
    // cardContainer.appendChild(newCard);

    //populate card with book info
    const newCloseContainer = document.createElement('div');
    newCloseContainer.setAttribute('class', 'closeContainer');
    newCloseContainer.innerHTML = "<img src='assets/delete.svg' alt='delete' id='removeCard'>";

    const newBookTitle = document.createElement('span');
    newBookTitle.setAttribute('class', 'bookTitle');
    newBookTitle.textContent = bookTitle.value;

    const newBookAuthor = document.createElement('span');
    newBookAuthor.setAttribute('class', 'bookAuthor');
    newBookAuthor.textContent = 'by ' + bookAuthor.value;

    const newBookPages = document.createElement('span');
    newBookPages.setAttribute('class', 'bookPages');
    newBookPages.textContent = bookPages.value + 'pages';

    const newBookStatus = document.createElement('button');
    newBookStatus.setAttribute('class', 'bookStatusBtn');
    newBookStatus.setAttribute('id', 'notRead');
    newBookStatus.textContent = 'Not read!';


    // append book info to card
    newCard.appendChild(newCloseContainer);
    newCard.appendChild(newBookTitle);
    newCard.appendChild(newBookAuthor);
    newCard.appendChild(newBookPages);
    newCard.appendChild(newBookStatus);    

    // append card to page
    cardContainer.appendChild(newCard);
}



// remove book / row
removeRow.forEach(Btn => {
    Btn.addEventListener('click', (e) => {
        //need to figure out new way
        // console.log(e.composedPath())
        // old way
        e.path[3].remove();
    })
}) 



// toggle book status
bookStatusBtn.forEach(Btn => {
    Btn.addEventListener('click', (e) => {
        if (e.target.id === 'read') {
            e.path[2].id = 'notRead'
            e.target.id = 'notRead'
            e.target.textContent = 'Not read!'
        } else if (e.target.id === 'notRead') {
            e.path[2].id = 'read'
            e.target.id = 'read'
            e.target.textContent = 'Read!'
        } else {
            console.log('this is weird')
        }
    })
})
