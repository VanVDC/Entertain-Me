//movies api

// const urlLink ='http://www.omdbapi.com/?apikey=3430a78&s=';
// const search='superman';
// const movieSearch=urlLink+search;

// async function getMovies(){
//     const rawMovies =await fetch(movieSearch);
//     const movie = await rawMovies.json();
//     const {Title,Poster}=movie.Search[0];
//     console.log(Poster);
   
//     let img = document.createElement('img');
    
//     img.setAttribute('src',Poster);
    

//     document.getElementById('render').appendChild(img);

// }

// getMovies();

//====================

//books api

// const bookSearch='harrypotter';
// const googleApi='https://www.googleapis.com/books/v1/volumes?q='+ bookSearch;

// async function getBooks(){
//     const rawBooks=await fetch(googleApi);
//     const book = await rawBooks.json();
//     const {title, authors, imageLinks }=book.items[0].volumeInfo;

//     let img = document.createElement('img');
//     img.setAttribute('src', imageLinks.thumbnail);
    
//     document.getElementById('render').appendChild(img);
// }

// getBooks();

//=============================

// NYT top books and movies


// const nytURL='https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key='+key;

// async function getNYT(){
//     const rawNYTBooks= await fetch(nytURL);
//     const nytbooks=await rawNYTBooks.json();
//     const{title, author, book_image, description, amazon_product_url}=nytbooks.results.books[1];

//     let img = document.createElement('img');
//     img.setAttribute('src', book_image);

//     document.getElementById('render').appendChild(img);
// }

// getNYT();
//========================

// const nytMovie='https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key='+key;

// async function getNYTMoviesPick(){
//     const rawNYTMovies= await fetch(nytMovie);
//     const nytMovies=await rawNYTMovies.json();
//     const{display_title, summary_short, multimedia}=nytMovies.results[1];

//     let img = document.createElement('img');
//     img.setAttribute('src', multimedia.src);

//     document.getElementById('render').appendChild(img);
// }

// getNYTMoviesPick();