const bookList = document.querySelector('.books-list');
const bookTemplateScript = document.querySelector('#template-book');
const bookTemplate = Handlebars.compile(bookTemplateScript.innerHTML);
const formFilters = document.querySelector('.filters');

function render(){
  for (const book of dataSource.books) {
    book.ratingBgc = determineRatingBgc(book.rating);
    book.ratingWidth = 10 * book.rating;
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

    const bookImage = bookList.querySelector(`[data-id="${book.id}"]`);
    const classList = bookImage.classList;

    if(isHidden) {
      classList.add('hidden');
    } else {
      classList.remove('hidden');
    }
  }
}

function determineRatingBgc(rating){
  if (rating <6 ){
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
  } 
  if (rating <= 8)  {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  } 
  if (rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  }
  return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
}



initActions();