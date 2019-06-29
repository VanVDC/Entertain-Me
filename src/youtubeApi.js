var youtubeVideoDiv = $('#player');
//This array contains a set of video id's from Tasty
var bestCookingVidsId = [`AL6GWJdzhUg`, 'z4L2E6_Gmkk', 'ir5U88d_3iI', 'gauyUvRIPzs']

//This function calls out to the youtube search api using one of the Ids from our array.
var giveMeRandomVid = () => {
    let vidId = bestCookingVidsId[randNum(0, bestCookingVidsId.length)]
    var youtubeApi = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&relatedToVideoId=${vidId}&type=video&key=${firebaseConfig.apiKey}`
    $.get(youtubeApi)
        .then(results => {
            var random = randNum(1, results.pageInfo.resultsPerPage)
            var video = results.items[random].id.videoId
            youtubeVideoDiv.attr('src', `https://www.youtube.com/embed/${video}?enablejsapi=1&amp;origin=http%3A%2F%2F127.0.0.1%3A5500&amp;widgetid=1`)
            youtubeVideoDiv.css('display', 'block');
            $('#entertainMeBtn').removeClass('disabled');
            youtubeVideoDiv.css('opacity', '1');
            youtubeVideoDiv.css('animation', 'videoOn 1s ease-in')
        })

    //After our ajax request is fufilled we set the iframe to display block and add a src attribute
}



//This function just gives me a random number from a min & max
var randNum = function (min, max) {
    if (Number.isInteger(min) && Number.isInteger(max)) {
        return Math.floor((Math.random() * max) + min);
    } else {
        console.log(`Please give me numbers!`)
    }
}