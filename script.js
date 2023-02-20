class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class BookCollection {
    constructor() {
      const books = localStorage.getItem('books');
      this.books = books ? JSON.parse(books) : [];
    }

    addBook(book) {
      this.books.push(book);
      localStorage.setItem('books', JSON.stringify(this.books));
    }

    removeBook(title, author) {
      this.books = this.books.filter(book => book.title !== title || book.author !== author);
      localStorage.setItem('books', JSON.stringify(this.books));
    }

    displayBooks() {
      const bookList = document.getElementById('bookList');
      bookList.innerHTML = '';
      this.books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          this.removeBook(book.title, book.author);
          li.remove();
        });
        li.appendChild(removeButton);
        bookList.appendChild(li);
      });
    }
  }

  const bookCollection = new BookCollection();
  bookCollection.displayBooks();

  const addButton = document.getElementById('add');
  addButton.addEventListener('click', () => {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const title = titleInput.value;
    const author = authorInput.value;
    const book = new Book(title, author);
    bookCollection.addBook(book);
    bookCollection.displayBooks();
    titleInput.value = '';
    authorInput.value = '';
  });