const bookList = document.querySelector('.books-list');
const bookTemplateScript = document.querySelector('#template-book');
const bookTemplate = Handlebars.compile(bookTemplateScript.innerHTML);

function render(){
  for (const book of dataSource.books) {
    const generatedHTML = bookTemplate(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(element);
  }
}
render();

const favoriteBooks = [];

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
}
initActions();
