//Vanilla Javascript The old way

//Book Contructor - Handles creating the book object

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Contstructor - Handles everything else :)

function UI() {}

//Add Book to list function
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  //Create a tr element
  const row = document.createElement('tr');
  //Insert Cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  const div = document.createElement('div');
  //classes
  div.className = `alert alert-danger ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get A Parent
  const container = document.querySelector('.container');
  //Get form
  const form = document.querySelector('#book-form');
  //Insert alert
  container.insertBefore(div, form);

  // Time out after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 4000);
};

//Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

//Clear Fields Function
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

//Event Listener for add book
document.querySelector('.btn').addEventListener('click', function(e) {
  //get form values.
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate Book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Uhhh, I think you forgot something Speedy McSpeedster :-)');
  } else {
    // Add Book to List
    ui.addBookToList(book);
    //Show Success Alert
    ui.showAlert(
      'Success!! Your Book  has been Added, How great do you feel right now?!!',
      'success'
    );

    //Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for Delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  //Instantiate UI
  const ui = new UI();

  //Delete Book
  ui.deleteBook(e.target);

  //Show Message
  ui.showAlert(
    'Book Removed, Comeback and visit soon to add your next great read!',
    'success'
  );

  e.preventDefault();
});
