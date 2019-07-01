var apiResults = $('#apiResults')
$('#entertainMeBtn').click(() => {
    //This portion sets our iframe element to hide
    youtubeVideoDiv.css('opacity', '0');
    youtubeVideoDiv.css('display', 'none');
    youtubeVideoDiv.attr('src', ``);
    let random = Math.floor((Math.random() * 3) + 1);
    console.log(random);
    // if (random === 1) {
    //     giveMeRandomVid()
    // } else if (random === 2) {
    //     getNYT()
    // } else if (random === 3) {
    //     getNYTMoviesPick()
    // }
    getNYTMoviesPick()
})