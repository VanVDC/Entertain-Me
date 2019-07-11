var youtubeVideoDiv = $('#player');
var youtubeVideoDivContainer = $('#playerContainer');
//This array contains a set of video id's from Tasty;
var bestCookingVidsId = [{ video_id: "vEROU2XtPR8", author: "Traversy Media", title: "JavaScript Fundamentals For Beginners", video_quality: "medium", video_quality_features: Array(0) }, { video_id: "z4L2E6_Gmkk", author: "Tasty", title: "I Made A Giant 30-Pound Burger", video_quality: "medium", video_quality_features: Array(0) }, { video_id: "hHW1oY26kxQ", author: "ChilledCow", title: "lofi hip hop radio - beats to relax/study to", video_quality: "medium", video_quality_features: Array(0) }];



//This function calls out to the youtube search api using one of the Ids from our array.
var giveMeRandomVid = () => {
    if (userVidIds === undefined) {
        userVidIds = bestCookingVidsId;
    }
    let vidId = userVidIds[randNum(0, userVidIds.length)]
    var youtubeApi = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&relatedToVideoId=${vidId.video_id}&type=video&key=${firebaseConfig.apiKey}`
    $.get(youtubeApi)
        .then(results => {
            var random = randNum(1, results.pageInfo.resultsPerPage)
            video = results.items[random].id.videoId;
            player.loadVideoById(video)
            // youtubeVideoDiv.attr('src', `https://www.youtube.com/embed/${video}?enablejsapi=1&amp;origin=http%3A%2F%2F127.0.0.1%3A5500&amp;widgetid=1`)
            youtubeVideoDivContainer.css('display', 'block');
            youtubeVideoDivContainer.css('opacity', '1');
            youtubeVideoDivContainer.css('animation', 'videoOn 1s ease-in');
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


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE',
        // events: {
        //     'onReady': onPlayerReady,
        //     'onStateChange': onPlayerStateChange
        // }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         setTimeout(stopVideo, 6000);
//         done = true;
//     }
// }
function stopVideo() {
    player.stopVideo();
}
function playVideo() {
    player.playVideo();
}