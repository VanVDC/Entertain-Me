// //movies api


async function getMovies(t){
    const urlLink ='http://www.omdbapi.com/?apikey=3430a78&s=';
    const movieSearch=urlLink+t;
    const rawMovies =await fetch(movieSearch);
    const movie = await rawMovies.json();
    const movData=movie.Search; 

    for(var i=0; i<movData.length;i++){
        const {Title,Poster,Year}=movie.Search[i]; 
        if(Title==t&&Year>=2018&&Poster!="N/A"){
            return Poster;

        }
    }
}



//====================

// //books api

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


var ranNum= Math.floor((Math.random() * 10) + 1);


// async function getNYT(){
//     const nytURL='https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key='+key.NYT;
//     const rawNYTBooks= await fetch(nytURL);
//     const nytbooks=await rawNYTBooks.json();
//     //data
//     let {title, author, book_image, description, amazon_product_url}=nytbooks.results.books[ranNum];

//     let img = document.createElement('img');
//     img.setAttribute('src', book_image);
//     document.getElementById('title').textContent=title;
    
//     document.getElementById('apiResults').appendChild(img);
//     document.getElementById('summary').textContent=description;

//     let a =document.createElement('a');
//     a.setAttribute('href', amazon_product_url);
//     document.getElementById('amazon').appendChild(a);

// }

// getNYT();
// //========================


async function getNYTMoviesPick(){


    const nytMovie='https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key='+key.NYT;
    const rawNYTMovies= await fetch(nytMovie);
    const nytMovies=await rawNYTMovies.json();
    //data
    const{display_title, summary_short, multimedia}=nytMovies.results[ranNum];


    var pic =getMovies(display_title);

    let img = document.createElement('img');

    if(display_title=='')

    img.setAttribute('src',multimedia.src);
    

    document.getElementById('title').textContent=display_title;
    document.getElementById('apiResults').appendChild(img);
    document.getElementById('title').textContent=summary_short;


    
}

getNYTMoviesPick();

