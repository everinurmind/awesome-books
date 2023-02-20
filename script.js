class BookApp {
  constructor() {
    const books = localStorage.getItem('books');
    this.books = books ? JSON.parse(books) : [];
    this.bookList = document.getElementById('bookList');
    this.addButton = document.getElementById('add');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.addButton.addEventListener('click', () => this.addBook());
    this.displayBooks();
  }

  addBook() {
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    if (title && author) {
      const book = { title, author };
      this.books.push(book);
      localStorage.setItem('books', JSON.stringify(this.books));
      this.displayBook(book);
      this.titleInput.value = '';
      this.authorInput.value = '';
    }
  }

  removeBook(title, author) {
    this.books = this.books.filter((book) => book.title !== title || book.author !== author);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  displayBook(book) {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      this.removeBook(book.title, book.author);
      li.remove();
    });
    li.appendChild(removeButton);
    this.bookList.appendChild(li);
  }

  displayBooks() {
    this.bookList.innerHTML = '';
    this.books.forEach((book) => {
      this.displayBook(book);
    });
  }
}

const bookApp = new BookApp();
bookApp.addBook();