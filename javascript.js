
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