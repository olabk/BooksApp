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
  const bookImages = bookList.querySelectorAll('.book__image');
  for(const bookImage of bookImages){
    const bookId = bookImage.getAttribute('data-id');

    bookImage.addEventListener('dblclick', function(event) {
      event.preventDefault();
      bookImage.classList.add('favorite');
      favoriteBooks.push(bookId);
    });
  }
}
initActions();
