var apiResults = $('#apiResults')
var random;
$('#entertainMeBtn').click(() => {
    //This portion sets our iframe element to hide
    youtubeVideoDivContainer.css('opacity', '0');
    youtubeVideoDivContainer.css('display', 'none');
    document.getElementById('nyt_tmdb').setAttribute('style', 'display: none;');
    document.getElementById('errorStats').innerHTML = ""
    stopVideo();
    random = Math.floor((Math.random() * 3) + 1);
    console.log(random);
    if (random === 1) {
        saveBtn.addEventListener('click', () => {
            saveVid(uid, 'video', player.getVideoData())
        })
        giveMeRandomVid()
    } else if (random === 2) {
        saveBtn.addEventListener('click', () => {
            saveBook(uid, 'book', currentBook)
        })
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getNYT()
    } else if (random === 3) {
        saveBtn.addEventListener('click', () => {
            saveMovie(uid, 'movie', currentMovie)
        })
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getMovies()
    } else if (random == 4) {
        saveBtn.addEventListener('click', () => {
            saveSong(uid, 'song', song)
        })
    }
})







