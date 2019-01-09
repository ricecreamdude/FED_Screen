//Fetch data from Google Books API
let bookData = [];

//Increased query results size via URL param
function getBooks(callback,query){
  $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?maxResults=40&q=" + query,
      type: 'GET',
      async: false,
      success: function(res) {
          callback(res)
      }
  });
}

//Generate book classes
function createBooks(data){
  for (var i=0 ; i < data.items.length; i++){
    let curBook = data.items[i].volumeInfo;

    let title = curBook.title;
    let author = (curBook.authors) ? curBook.authors[0] : 'No Author';
    let img = curBook.imageLinks.smallThumbnail;

    bookData[i] = new Book(title, author, img);
  }
  alphabetizeBooks();
}


//Alphabetize by book title
function alphabetizeBooks(){
  var nonSortedArray = bookData
  var sortedArray = nonSortedArray.sort(function (a, b) {
      let nameA = a.title;
      let nameB = b.title;
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        return 0;
      });
}


function createBookshelf(data){
  //Six books per row
  for (let i = 0; i < 5; i++){
    drawShelf(data[i]);
  }
}

function drawShelf(data){
  let title = data.title;
  let author = data.author;
  let imgUrl = data.img
  $('#AthroughM').append(
    `<div class="book-container">
        <img src="${imgUrl}" alt="" class="book-img">
        <div class="book-txt">
          <div class="book-title">
            ${title}
          </div>
          <div class="book-author">
            by ${author}
          </div>
        </div>
    </div>`
  )
}

getBooks(createBooks,'potato');
createBookshelf(bookData);
