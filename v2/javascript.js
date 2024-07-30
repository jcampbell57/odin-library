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
const body = document.querySelector('body');
const header = document.querySelector('header');
const logo = document.getElementById('logo');
const themeToggle = document.getElementById('themeToggle')
const table = document.querySelector('table')
const thead = document.querySelector('thead')
const addBookBtn = document.querySelector('.addBookBtn')
const stats = document.getElementById('stats');
const addBookDialog = document.getElementById('addBookDialog');
const addBookForm = document.getElementById('addBookForm');
const closeModal = document.querySelector('.closeModal');
const footer = document.querySelector('footer');
const githubIcon = document.querySelector('.github');
const bookCount = document.getElementById('bookCount');
const pageCount = document.getElementById('pageCount');



class Book {
  constructor(title, author, yearPublished, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.pages = pages;
    this.isRead = isRead;
  }

  info() {
    let info = `${this.title} by ${this.author}, ${this.pages} pages.`;
    
    if (this.isRead) {
      info += `(${this.yearPublished}, read)`;
    } else {
      info += `(${this.yearPublished}, not yet read)`;
    }
    
    return info;
  }
}



class Library {
  constructor() {
    this.myLibrary = this.loadBooks() || [];
  }

  addBookToLibrary(book) {
    this.myLibrary.push(book);
    this.saveBooks();
    this.displayBook(book, this.myLibrary.length - 1);
  }

  saveBooks() {
    localStorage.setItem('wormholeBooks', JSON.stringify(this.myLibrary))
  }

  loadBooks() {
    const books = localStorage.getItem('wormholeBooks')
    if (books) {
      return JSON.parse(books)
    } else {
      return []
    }
  }

  displayBook(book, index) {
    const bookList = document.getElementById('bookList')
    
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
  
    const bookStatusBtn = document.createElement('button');
    bookStatusBtn.classList.add('bookStatusBtn', book.isRead ? 'read' : 'notRead');
    bookStatusBtn.textContent = book.isRead ? 'Read!' : 'Not read!';
    
    const incrementStats = () => {
      if (bookStatusBtn.classList.contains('read')) {
        bookCount.textContent = parseInt(bookCount.textContent) + 1;
        pageCount.textContent = parseInt(pageCount.textContent) + (book.pages);
      } else {
        bookCount.textContent = parseInt(bookCount.textContent) - 1;
        pageCount.textContent = parseInt(pageCount.textContent) - (book.pages);
      }
    }
  
    if (book.isRead) {
      incrementStats();
    }
  
    const toggleStatus = (index) => {
      const bookRow = bookStatusBtn.closest('tr');
      bookRow.classList.toggle('read')
      bookRow.classList.toggle('notRead')

      bookStatusBtn.classList.toggle('read')
      bookStatusBtn.classList.toggle('notRead')
      bookStatusBtn.textContent = bookStatusBtn.classList.contains('read') ? 'Read!' : 'Not read!';

      this.myLibrary[index].isRead = !this.myLibrary[index].isRead
      this.saveBooks()

      incrementStats();
    };
    
    bookStatusBtn.addEventListener('click', () => toggleStatus(index));
    statusCell.appendChild(bookStatusBtn);
    newRow.appendChild(statusCell);
    
    // Add delete cell
    const removeBook = document.createElement('td');
    removeBook.classList.add('removeBook');
    
    const themeToggle = document.getElementById('themeToggle')
    const darkMode = themeToggle.classList.contains('SVGlight')
  
    const newImg = document.createElement('img');
    newImg.classList.add('removeBookIcon', darkMode ? undefined : 'SVGlight')
  
    newImg.src = '../assets/delete.svg';
    newImg.alt = 'delete';
    
    const deleteBook = (row, index) => {
      if (row.classList.contains('read')) {
        bookCount.textContent = parseInt(bookCount.textContent) - 1;
        pageCount.textContent = parseInt(pageCount.textContent) - parseInt(row.querySelector('.bookPages').textContent);
      }
  
      if (index !== -1) {
        this.myLibrary.splice(index, 1);
        this.saveBooks()
      }

      row.remove();
    }
  
    newImg.addEventListener('click', (e) => {
      const rowToRemove = e.target.closest('tr');
        if (rowToRemove) {
        // Ask for confirmation before deleting
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (confirmed) {
          deleteBook(rowToRemove, index);
        }      
      }
    });
    
    removeBook.appendChild(newImg);
    newRow.appendChild(removeBook);
  
    // Append row to table
    bookList.appendChild(newRow);
  }

  displayBooks() {
    this.myLibrary.forEach((book, index) => {
      this.displayBook(book, index);
    });
  }
}

const myLibrary = new Library();



// Add placeholder content

const addPlaceholderBooks = () => {
  const placeholderBooks = [
    ['The Intelligent Investor', 'Benjamin Graham', 1949, 460, true],
    ['A Random Walk Down Wall Street', 'Burton Malkiel', 1973, 464, true],
    ['The Hobbit', 'J.R.R. Tolkien', 1937, 295],
    ['Evicted: Poverty and Profit in the American City', 'Matthew Desmond', 2016, 293, true],
    ['Steve Jobs', 'Walter Isaacson', 2011, 630, true],
    ['Cooked: A Natural History of Transformation', 'Michael Pollan', 2013, 480, true],
    ['Thinking, Fast and Slow', 'Daniel Kahneman', 2011, 512],
    ['How to Lie with Statistics', 'Darrell Huff', 1954, 145],
    ["The Queen's Gambit", 'Walter Tevis', 1983, 266],
    ["The Hitchhiker's Guide to the Galaxy", 'Douglas Adams', 1979, 193],
    ['Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 2011, 414],
    ['Crime and Punishment', 'Fyodor Dostoevsky', 1866, 671],
  ]

  // Default sort (year published)
  // placeholderBooks = placeholderBooks.sort((a, b) => a[2] - b[2]);

  placeholderBooks.forEach(book => {
    let newBook = new Book(book[0], book[1], book[2], book[3], book[4])
    myLibrary.addBookToLibrary(newBook)
  })
}

if (myLibrary.myLibrary.length === 0) {
  addPlaceholderBooks()
} else {
  myLibrary.displayBooks()
}


// Add event listeners

themeToggle.addEventListener('mouseenter', (e) => {
  themeToggle.classList.toggle('SVGlight')
});

themeToggle.addEventListener('mouseout', (e) => {
  themeToggle.classList.toggle('SVGlight')
});

// Add book modal
addBookBtn.addEventListener("click", () => {
  addBookDialog.showModal();
});

function clearFormFields(form) {
  const inputs = form.querySelectorAll('input');
  const statusInput = form.querySelector('#bookStatus');
  inputs.forEach(input => {
      input.value = '';
  });
  statusInput.checked = false;
}

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const titleInput = form.querySelector('#bookTitle');
  const authorInput = form.querySelector('#bookAuthor');
  const yearInput = form.querySelector('#bookYear');
  const pagesInput = form.querySelector('#bookPages');
  const statusInput = form.querySelector('#bookStatus');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const yearPublished = yearInput.value.trim();
  const pages = parseInt(pagesInput.value, 10);
  const isRead = statusInput.checked;

  const error = document.querySelector('.error');
  
  // Validate form values
  if (title === '' || author === '' || isNaN(pages) || pages <= 0) {
    error.textContent = 'Please fill out all fields correctly.';
    error.style.display = 'block';
    return; // Exit early if validation fails
  } else {
    error.style.display = 'none';
    
    // Hide form
    addBookDialog.close();
    
    // Create new book
    const newBook = new Book(title, author, yearPublished, pages, isRead)

    // Clear form fields
    clearFormFields(form);

    // Add book to library
    myLibrary.addBookToLibrary(newBook);
  }
});

closeModal.addEventListener('click', function(e) {
  e.preventDefault();
  addBookDialog.close();
});



// Dark mode toggler

const projectsHeader = document.querySelector('.projectsHeader');
const themeToggleIcon = document.querySelector('.themeToggleIcon');
const themeToggler = document.querySelector('.themeToggle');

function toggleDarkMode() {
  const removeBookIcons = document.querySelectorAll('.removeBookIcon')

  body.classList.toggle('light')
  header.classList.toggle('light');
  logo.classList.toggle('SVGlight')
  themeToggle.classList.toggle('SVGlight')
  table.classList.toggle('light')
  thead.classList.toggle('light')
  addBookBtn.classList.toggle('light')
  addBookDialog.classList.toggle('light')
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


// Table sort functionality

// Function to sort the table
function sortTable(column, dataType, header) {
  const rows = Array.from(document.querySelectorAll('tbody tr'));
  const sortOrder = header.dataset.order || 'asc';

  rows.sort((rowA, rowB) => {
    let valueA = rowA.querySelector(`td.${column}`).textContent;
    let valueB = rowB.querySelector(`td.${column}`).textContent;

    if (dataType === 'number') {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    } else if (dataType === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  // Reverse the sort order for the next click
  header.dataset.order = sortOrder === 'asc' ? 'desc' : 'asc';

  // Clear existing rows
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  // Append sorted rows to the table
  rows.forEach(row => {
    tableBody.appendChild(row);
  });
}

// Function to initialize event listeners for sorting
function initializeSorting() {
  const tableHeaders = document.querySelectorAll('thead th');
  tableHeaders.forEach(header => {
    // Check if the header does not have the class 'removeBook'
    if (!header.classList.contains('removeBook')) {
      header.addEventListener('click', () => {
        // Remove 'sorted' class from all headers
        tableHeaders.forEach(header => {
          header.classList.remove('sorted');
        });

        // Add 'sorted' class to the clicked header
        header.classList.add('sorted');

        const column = header.dataset.column;
        const dataType = header.dataset.type;
        sortTable(column, dataType, header);
      });
    }
  });
}

// Call initializeSorting function to set up sorting on page load
initializeSorting();
