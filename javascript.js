
// page elements
const addBookBtn = document.querySelector('.addBookBtn');

const bookList = document.getElementById('bookList')
const bookStatusBtn = document.querySelectorAll('.bookStatusBtn');
const removeRow = document.querySelectorAll('#removeRow');

const popup = document.querySelector('.popup');
const closePopup = document.getElementById('closePopup');
const submitBookBtn = document.getElementById('submitBookBtn');

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

const book1 = new book('How to WIN', 'Jason Campbell', '420', 'hella read that');

book1.info();
console.log(book1.info());



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
    addRow();

    // for debugging
    // console.log(bookTitle.value);
    // console.log(bookAuthor.value);
    // console.log(bookPages.value);
})



// add book / row
function addRow() {
    // create new row
    const newRow = document.createElement('tr')
    newRow.setAttribute('ID', 'notRead')

    // populate row with book info
    const newBookTitle = document.createElement('td');
    newBookTitle.setAttribute('class', 'bookTitle');
    newBookTitle.textContent = bookTitle.value;

    const newBookAuthor = document.createElement('td');
    newBookAuthor.setAttribute('class', 'bookAuthor');
    newBookAuthor.textContent = bookAuthor.value;

    const newBookPages = document.createElement('td');
    newBookPages.setAttribute('class', 'bookPages');
    newBookPages.textContent = bookPages.value + ' pages';

    const newBookStatus = document.createElement('td');
    newBookStatus.setAttribute('class', 'bookStatus');
    // newBookStatus.innerHTML = "<button class='bookStatusBtn' id='notRead'>Not read!</button>";
    // new book status button
    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'bookStatusBtn');
    newButton.setAttribute('id', 'notRead');
    newButton.textContent = 'Not read!';
    newButton.addEventListener('click', (e) => {
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
    // append button to container
    newBookStatus.appendChild(newButton);

    const newCloseContainer = document.createElement('td');
    newCloseContainer.setAttribute('class', 'closeContainer');
    // newCloseContainer.innerHTML = "<img src='assets/delete.svg' alt='delete' id='removeRow'>";
    // new delete row button
    const newImg = document.createElement('Img');
    newImg.src = 'assets/delete.svg'
    newImg.setAttribute('id', 'removeRow');
    newImg.setAttribute('alt', 'delete');
    newImg.addEventListener('click', (e) => {
        e.path[2].remove();
    })
    // append button to container
    newCloseContainer.appendChild(newImg);

    // append book info to row
    newRow.appendChild(newBookTitle);
    newRow.appendChild(newBookAuthor);
    newRow.appendChild(newBookPages);
    newRow.appendChild(newBookStatus);    
    newRow.appendChild(newCloseContainer);

    // append row to table
    bookList.appendChild(newRow);
}



// remove book / row
removeRow.forEach(Btn => {
    Btn.addEventListener('click', (e) => {
        //need to figure out new way
        // console.log(e.composedPath())
        // old way
        e.path[2].remove();
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
