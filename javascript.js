
// page elements
const addBookBtn = document.querySelector('.addBookBtn');

const bookList = document.getElementById('bookList')
const bookStatusBtn = document.querySelectorAll('.bookStatusBtn');
const removeRow = document.querySelectorAll('#removeRow');

const newBookForm = document.querySelector('.newBookForm')
const popup = document.querySelector('.popup');
const closePopup = document.getElementById('closePopup');



// library array
let myLibrary = [
    // adding the placeholder books below breaks the book constructor
    {
        title: 'The Intelligent Investor',
        author: 'Benjamin Graham',
        pages: '460',
    },
    {
        title: 'A Random Walk Down Wall Street',
        author: 'Burton Malkiel',
        pages: '464',
    },
];


// object constructor for new book
function book (title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
}

book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
}; 


// create rows from library array
displayBooks = function () {
    myLibrary.forEach((book) => {
        console.log(book);
        populateRows(book);
    }); 
}



const book1 = new book('How to WIN', 'Jason Campbell', '420', 'hella read that');
console.log(book1.info());



function addBookToLibrary() {
    let newBook = object.create(book.prototype)
}



// add book / row
function populateRows(book) {
    // create new row
    const newRow = document.createElement('tr')
    newRow.setAttribute('ID', 'notRead')

    // populate row with book info
    newRow.innerHTML = `
    <td class='bookTitle'>${book.title}</td>
    <td class='bookAuthor'>${book.author}</td>
    <td class='bookPages'>${book.pages} pages</td>    
    `;

    // create and append status and delete buttons
    const newBookStatus = document.createElement('td');
    newBookStatus.setAttribute('class', 'bookStatus');
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

    // append button containers to row
    newRow.appendChild(newBookStatus);    
    newRow.appendChild(newCloseContainer);

    // append row to table
    bookList.appendChild(newRow);
}



// open popup / add book 
addBookBtn.addEventListener('click', () => {
    popup.id = 'newBook';
})

// close popup
closePopup.addEventListener('click', () => {
    popup.id = 'noNewBook';
})

// submit book
newBookForm.addEventListener('submit', (e) => {    
    //prevent actual submit & hide form
    e.preventDefault();
    popup.id = 'noNewBook';
    
    // get form values 
    const title = document.getElementById('bookTitle').value
    const author = document.getElementById('bookAuthor').value
    const pages = document.getElementById('bookPages').value

    // make book
    let newBook = new book(title, author, pages)

    // add book to myLibrary array


    // create row
    populateRows(newBook);
})



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

displayBooks();