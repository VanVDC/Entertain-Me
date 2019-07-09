var apiResults = $('#apiResults')
var random;
var saveBtn = $('#saveButton')
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
        saveBtn.click(() => {
            saveVid(uid, player.getVideoData())
        })
        giveMeRandomVid()
    } else if (random === 2) {
        saveBtn.click(() => {
            saveBook(uid, currentBook)
        })
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getNYT()
    } else if (random === 3) {
        saveBtn.click(() => {
            saveMovie(uid, currentMovie)
        })
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getMovies()
    } else if (random == 4) {
        saveBtn.click(() => {
            saveSong(uid, song)
        })
    }
})







