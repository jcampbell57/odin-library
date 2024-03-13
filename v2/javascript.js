// Create page elements

const createFooter = () => {
  const footer = document.querySelector('footer');
  footer.classList.add('light')

  const copyright = document.createElement('p');
  copyright.textContent = `Copyright © ${new Date().getFullYear()} jcampbell57`;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/jcampbell57';
  githubLink.target = '_blank';

  const newGithubIcon = document.createElement('img');
  newGithubIcon.src = '../assets/GitHub-32px.png';
  newGithubIcon.classList.add('github', 'SVGlight');

  githubLink.appendChild(newGithubIcon);
  footer.appendChild(copyright);
  footer.appendChild(githubLink);
};

createFooter();


// Grab page elements

const bookList = document.getElementById('bookList')


const myLibrary = [];


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


function addBookToLibrary(book) {
  myLibrary.push(book);
}


function displayBooks() {
  console.log(myLibrary);
  myLibrary.forEach((book, index) => {
    // Create new row
    const newRow = document.createElement('tr')
    newRow.classList.add(book.isRead ? 'read' : 'notRead')

    // Add title cell
    const titleCell = document.createElement('td');
    titleCell.classList.add('bookTitle');
    titleCell.textContent = book.title;
    newRow.appendChild(titleCell);

    // Add author cell
    const authorCell = document.createElement('td');
    authorCell.classList.add('bookAuthor');
    authorCell.textContent = book.author;
    newRow.appendChild(authorCell);

    // Add year published cell
    const yearCell = document.createElement('td');
    yearCell.classList.add('bookYear');
    yearCell.textContent = book.yearPublished;
    newRow.appendChild(yearCell);

    // Add page count cell
    const pagesCell = document.createElement('td');
    pagesCell.classList.add('bookPages');
    pagesCell.textContent = `${book.pages} pages`;
    newRow.appendChild(pagesCell);

    // Add status cell
    const statusCell = document.createElement('td');
    statusCell.classList.add('bookStatus');

    const newButton = document.createElement('button');
    newButton.classList.add('bookStatusBtn', book.isRead ? 'read' : 'notRead');
    newButton.textContent = book.isRead ? 'Read!' : 'Not read!';
    
    const toggleStatus = () => {
      // const bookRow = newButton.parentElement.parentElement;
      const bookRow = newButton .closest('tr');
      bookRow.classList.toggle('read')
      bookRow.classList.toggle('notRead')
      newButton.classList.toggle('read')
      newButton.classList.toggle('notRead')
      newButton.textContent = newButton.classList.contains('read') ? 'Read!' : 'Not read!';
      bookCount = document.getElementById('bookCount');
      pageCount = document.getElementById('pageCount');
      if (newButton.classList.contains('read')) {
        bookCount.textContent = parseInt(bookCount.textContent) + 1;
        pageCount.textContent = parseInt(pageCount.textContent) + (book.pages);
      } else {
        bookCount.textContent = parseInt(bookCount.textContent) - 1;
        pageCount.textContent = parseInt(pageCount.textContent) - (book.pages);
      }
    };
    
    newButton.addEventListener('click', toggleStatus);
    statusCell.appendChild(newButton);
    newRow.appendChild(statusCell);
    
    // Add delete cell
    const removeBook = document.createElement('td');
    removeBook.classList.add('removeBook');
    
    const newImg = document.createElement('img');
    newImg.classList.add('removeBookIcon')
    newImg.src = '../assets/delete.svg';
    newImg.alt = 'delete';
    
    const deleteBook = (row) => {
      if (row.classList.contains('read')) {
        bookCount = document.getElementById('bookCount');
        pageCount = document.getElementById('pageCount');
        bookCount.textContent = parseInt(bookCount.textContent) - 1;
        pageCount.textContent = parseInt(pageCount.textContent) - parseInt(row.querySelector('.bookPages').textContent);
      }

      if (index !== -1) {
          myLibrary.splice(index, 1);
      }
      row.remove();
    }

    newImg.addEventListener('click', (e) => {
      const rowToRemove = e.target.closest('tr');
      if (rowToRemove) {
        deleteBook(rowToRemove)
      }
    });
    
    removeBook.appendChild(newImg);
    newRow.appendChild(removeBook);

    // Append row to table
    bookList.appendChild(newRow);
  })
}


// Add placeholder content

book1 = new Book('The Intelligent Investor', 'Benjamin Graham', 1949, 460);
addBookToLibrary(book1);
// console.log(book1.info());

book2 = new Book('A Random Walk Down Wall Street', 'Burton Malkiel', 1973, 464);
addBookToLibrary(book2);
// console.log(book2.info());

book3 = new Book('The Hobbit', 'J.R.R. Tolkien', 1937, 295);
addBookToLibrary(book3);
// console.log(book3.info());

displayBooks();


// Grab page elements
const body = document.querySelector('body');
const header = document.querySelector('header');
const logo = document.getElementById('logo');
const themeToggle = document.getElementById('themeToggle')
const table = document.querySelector('table')
const thead = document.querySelector('thead')
const addBookBtn = document.querySelector('.addBookBtn')
const removeBookIcons = document.querySelectorAll('.removeBookIcon')
const stats = document.getElementById('stats');
const footer = document.querySelector('footer');
const githubIcon = document.querySelector('.github');


// Add event listeners

themeToggle.addEventListener('mouseenter', (e) => {
  themeToggle.classList.toggle('SVGlight')
});

themeToggle.addEventListener('mouseout', (e) => {
  themeToggle.classList.toggle('SVGlight')
});

// Dark mode toggler
const projectsHeader = document.querySelector('.projectsHeader');
const themeToggleIcon = document.querySelector('.themeToggleIcon');
const themeToggler = document.querySelector('.themeToggle');

function toggleDarkMode() {
  body.classList.toggle('light')
  header.classList.toggle('light');
  logo.classList.toggle('SVGlight')
  themeToggle.classList.toggle('SVGlight')
  table.classList.toggle('light')
  thead.classList.toggle('light')
  addBookBtn.classList.toggle('light')
  stats.classList.toggle('light');  
  footer.classList.toggle('light');  
  githubIcon.classList.toggle('SVGlight');
  removeBookIcons.forEach(icon => {
      icon.classList.toggle('SVGlight');
  });
}

themeToggle.addEventListener('mousedown', function () {
  toggleDarkMode();
});

themeToggle.addEventListener('keydown', function (event) {
  // Check if the key pressed is 'Enter' (key code 13) or 'Space' (key code 32)
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleDarkMode();
  }
});
