const bookList = document.querySelector('.books-list');
const bookTemplateScript = document.querySelector('#template-book');
const bookTemplate = Handlebars.compile(bookTemplateScript.innerHTML);
const formFilters = document.querySelector('.filters');

function render(){
  for (const book of dataSource.books) {
    const generatedHTML = bookTemplate(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(element);
  }
}
render();

const favoriteBooks = [];
const filters=[];

function initActions(){
  
  bookList.addEventListener('dblclick', function(event) {
    const bookImage = event.target.closest('.book__image');

    if (!bookImage){
      return;
    }

    event.preventDefault();

    const bookId = bookImage.getAttribute('data-id');

    const classList = bookImage.classList;
    const isFavorite = classList.contains('favorite');
    
    if(isFavorite) {
      classList.remove('favorite');
      const index = favoriteBooks.indexOf(bookId);
      favoriteBooks.splice(index, 1);
    } else {
      favoriteBooks.push(bookId);
      classList.add('favorite');
    }
  });

  formFilters.addEventListener('click', function(event) {
    if (event.target.name !== 'filter'){
      return;
    }
  
    // clear filters array
    filters.splice(0, filters.length);

    const checked = formFilters.querySelectorAll('input:checked');
    for (const selected of checked){
      const filter = selected.getAttribute('value');
      filters.push(filter);
    }

    filterBooks();
  });
}

function filterBooks(){
  for (const book of dataSource.books) {
    let isHidden = false;

    for (const filter of filters) {
      if (!book.details[filter]){
        isHidden = true;
      }
    }

    const bookImage = bookList.querySelector('[data-id="' + book.id + '"]');
    const classList = bookImage.classList;

    if(isHidden) {
      classList.add('hidden');
    } else {
      classList.remove('hidden');
    }
  }
}

initActions();