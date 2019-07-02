var apiResults = $('#apiResults')
$('#entertainMeBtn').click(() => {
    //This portion sets our iframe element to hide
    youtubeVideoDivContainer.css('opacity', '0');
    youtubeVideoDivContainer.css('display', 'none');
    document.getElementById('nyt_tmdb').setAttribute('style', 'display: none;');
    stopVideo();
    let random = Math.floor((Math.random() * 3) + 1);
    console.log(random);
    if (random === 1) {
        giveMeRandomVid()
    } else if (random === 2) {
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getNYT()
    } else if (random === 3) {
        document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
        getMovies()
    }
})







