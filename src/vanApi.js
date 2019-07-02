

async function getNYT() {

    const nytURL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=' + key.NYT;
    const rawNYTBooks = await fetch(nytURL);
    const nytbooks = await rawNYTBooks.json(); //create a New York Time URL
    let ran = Math.floor((Math.random() * 15) + 1) // create a random number for API index
    //data
    let { title, author, book_image, description, amazon_product_url } = nytbooks.results.books[ran];

    console.log(book_image);
    console.log(title);
    console.log(author);
    console.log(description);
    console.log(amazon_product_url);


    let img = document.getElementById('img'); // get the img tag
    img.setAttribute('src', book_image);
    document.getElementById('title').textContent = title; //render the title

    document.getElementById('summary').textContent = description;//render the summary

    let a = document.getElementById('amazonURL')
    a.setAttribute('href', amazon_product_url); //render the amazon link

}

// getNYT();


const key1 = '?api_key=' + key.tmdb;
const baseUrl = 'https://api.themoviedb.org/3/movie/';
const search = { //object for searches
    latest: 'latest',
    popular: 'popular',
    now_playing: 'now_playing',
    top_rating: 'top_rated'
};
const endUrl = 'ac&language=en-US&page=1';

const imgLink = 'https://image.tmdb.org/t/p/w500';

const url = baseUrl + search.popular + key1; //create the URL

async function getMovies() {
    let ran = Math.floor((Math.random() * 19) + 1) //crate a random number for the index

    const rawData = await fetch(url); // get the raw data
    const movieData = await rawData.json(); // get the movies data

    const { poster_path, overview, original_title, } = movieData.results[ran]; //data

    console.log(imgLink + poster_path);
    console.log(original_title);
    console.log(overview);

    let img = document.getElementById('img'); // get the img tag
    img.setAttribute('src', imgLink + poster_path);
    document.getElementById('title').textContent = original_title; //render the title
    document.getElementById('summary').textContent = overview; // render the summary

}
// getMovies()

