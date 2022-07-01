
// page elements
const addBookBtn = document.querySelector('.addBookBtn');
const bookList = document.getElementById('bookList')
const newBookForm = document.querySelector('.newBookForm')
const popup = document.querySelector('.popup');
const closePopup = document.getElementById('closePopup');
const error = document.querySelector('.error');



// library array
let myLibrary = [];



// object constructor for new book
function book (title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
}

book.prototype.info = function() {
    //add if statement for read status comment
    return `${this.title} by ${this.author}, ${this.pages} pages.`
}; 



// placeholder books
const book1 = new book('The Intelligent Investor', 'Benjamin Graham', '460');
addBookToLibrary(book1);
const book2 = new book('A Random Walk Down Wall Street', 'Burton Malkiel', '464');
addBookToLibrary(book2);
// console.log(book2.info());
// console.log(book2.info());



// open popup / add book 
addBookBtn.addEventListener('click', () => {
    popup.id = 'newBook';
})

// close popup
closePopup.addEventListener('click', () => {
    popup.id = 'noNewBook';
})

// submit new book
newBookForm.addEventListener('submit', (e) => {    
    //prevent actual submit
    e.preventDefault();
    
    // get form values 
    const title = document.getElementById('bookTitle').value
    const author = document.getElementById('bookAuthor').value
    const pages = document.getElementById('bookPages').value

    // validate form values
    if (title === '' || author === '' || pages === '') {
        error.id = 'error';
    } else {
        // hide form
        popup.id = 'noNewBook';
        
        // make book
        let newBook = new book(title, author, pages)

        // clear form  
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookPages').value = '';

        // add book to myLibrary array


        // create row
        addBookToLibrary(newBook);
    }
})



// Add book to library
function addBookToLibrary(newBook) {
    // add book to library array
    myLibrary.push(newBook);

    // create new row
    const newRow = document.createElement('tr')
    newRow.setAttribute('ID', 'notRead')

    // populate row with book info
    newRow.innerHTML = `
    <td class='bookTitle'>${newBook.title}</td>
    <td class='bookAuthor'>${newBook.author}</td>
    <td class='bookPages'>${newBook.pages} pages</td>    
    `;

    // new container for book status button
    const newBookStatus = document.createElement('td');
    newBookStatus.setAttribute('class', 'bookStatus');
    // new book status button
    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'bookStatusBtn');
    newButton.setAttribute('id', 'notRead');
    newButton.textContent = 'Not read!';
    newButton.addEventListener('click', (e) => {
        if (e.target.id === 'read') {
            e.target.parentElement.parentElement.id = 'notRead'
            e.target.id = 'notRead'
            e.target.textContent = 'Not read!'
        } else if (e.target.id === 'notRead') {
            e.target.parentElement.parentElement.id = 'read'
            e.target.id = 'read'
            e.target.textContent = 'Read!'
        } else {
            console.log('no button id detected.');
        }
    })
    // append button to container
    newBookStatus.appendChild(newButton);

    // new container for delete row button
    const newCloseContainer = document.createElement('td');
    newCloseContainer.setAttribute('class', 'closeContainer');
    // new delete row button
    const newImg = document.createElement('Img');
    newImg.src = 'assets/delete.svg'
    newImg.setAttribute('alt', 'delete');
    newImg.addEventListener('click', (e) => {
        myLibrary.forEach((book, index) => {
            if (book.title === `${newBook.title}`) {
                console.log('yay');
                myLibrary.splice(index, 1);
            }   
        })
        e.target.parentElement.parentElement.remove();
    })
    // append button to container
    newCloseContainer.appendChild(newImg);

    // append button containers to row
    newRow.appendChild(newBookStatus);    
    newRow.appendChild(newCloseContainer);

    // append row to table
    bookList.appendChild(newRow);
}