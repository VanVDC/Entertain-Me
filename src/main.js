var apiResults = $('#apiResults')
var random;
$('#entertainMeBtn').click(() => {
    //This portion sets our iframe element to hide
    youtubeVideoDivContainer.css('opacity', '0');
    youtubeVideoDivContainer.css('display', 'none');
    document.getElementById('nyt_tmdb').setAttribute('style', 'display: none;');

    stopVideo();
    random = Math.floor((Math.random() * 3) + 1);
    console.log(random);
    if (random === 1) {
        saveBtn.addEventListener('click', () => {
            saveData(uid, 'video', player.getVideoData())
        })
        giveMeRandomVid()
    } else if (random === 2) {
        saveBtn.addEventListener('click', () => {
            saveData(uid, 'book', currentBook)
        })
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getNYT()
    } else if (random === 3) {
        saveBtn.addEventListener('click', () => {
            saveData(uid, 'movie', currentMovie)
        })
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getMovies()
    }
})







