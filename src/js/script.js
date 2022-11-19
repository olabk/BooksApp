class BooksList {
  constructor(books) {
    this.books = books;

    this.getElements();
    this.render();
    this.initActions();
  }

  getElements(){
    const bookTemplateScript = document.querySelector('#template-book');
    this.bookTemplate = Handlebars.compile(bookTemplateScript.innerHTML);
    this.bookList = document.querySelector('.books-list');
    this.formFilters = document.querySelector('.filters');
    this.favoriteBooks = [];
    this.filters = [];
  }
  
  render(){
    for (const book of this.books) {
      book.ratingBgc = this.determineRatingBgc(book.rating);
      book.ratingWidth = 10 * book.rating;
      const generatedHTML = this.bookTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      this.bookList.appendChild(element);
    }
  }
 
  initActions() {
    const bookApp = this;

    this.bookList.addEventListener('dblclick', function(event) {
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
        const index = bookApp.favoriteBooks.indexOf(bookId);
        bookApp.favoriteBooks.splice(index, 1);
      } else {
        classList.add('favorite');
        bookApp.favoriteBooks.push(bookId);
      }
    });

    this.formFilters.addEventListener('click', function(event) {
      if (event.target.name !== 'filter'){
        return;
      }
    
      // clear filters array
      bookApp.filters.splice(0, bookApp.filters.length);

      const checked = bookApp.formFilters.querySelectorAll('input:checked');
      for (const selected of checked){
        const filter = selected.getAttribute('value');
        bookApp.filters.push(filter);
      }

      bookApp.filterBooks();
    });
  }

  filterBooks(){
    for (const book of this.books) {
      let isHidden = false;

      for (const filter of this.filters) {
        if (!book.details[filter]){
          isHidden = true;
        }
      }

      const bookImage = this.bookList.querySelector(`[data-id="${book.id}"]`);
      const classList = bookImage.classList;

      if(isHidden) {
        classList.add('hidden');
      } else {
        classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating){
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
}

// eslint-disable-next-line no-unused-vars
const app = new BooksList(dataSource.books);
