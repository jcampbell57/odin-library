function Book(title, author, yearPublished, pages, isRead = false) {
  this.title = title
  this.author = author
  this.yearPublished = yearPublished
  this.pages = pages
  this.isRead = isRead
  this.info = function () {
    info = `${this.title} by ${this.author}, ${this.pages} pages.`
    
    if (this.isRead === true) {
      info += `(${this.yearPublished}, not yet read)`
    } else {
      info += `(${this.yearPublished}, read)`
    }
    
    return info
  }
}

theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 1937, 295);
console.log(theHobbit.info());
