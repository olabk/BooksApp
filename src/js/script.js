//Przygotuj referencję do szablonu oraz listy .books-list.
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

