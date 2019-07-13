# Overview:
   ## End boredom with just a few clicks!
   - Clicking the "Entertain Me" button will return a video, book, movie, or song recommendation.
   - The user will then be able to save from videos, books, movies and music to create a custom playlist to cure boredom. 
   The media is currated from sites like YouTube, The New York Times, The Movie Database, & Genius.
# Installation
1. Clone the repo [entertainMe](https://github.com/asantoss/entertainMe).
2. In the *src* folder add a file name **apiKeys.js**  containing your firebase credentials.
   ```javascript
    var firebaseConfig = {
        apiKey: "xxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxxxxxxx",
        databaseURL: "xxxxxxxxxxxxxxxxxxxxx",
        projectId: "xxxxxxxxxxxxxx",
        storageBucket: "",
        messagingSenderId: "xxxxxxxxxxxxxxxxxxxxx",
        appId: "xxxxxxxxxxxxxxxxx"
    };
    var key = {
        NYT: 'xxxxxxxxxxxxxxxxxx',
        tmdb: 'xxxxxxxxxxxxxxxxxxx'
    }
    ```

      - API credentials can be obtained below.
        * [Firebase](https://console.firebase.google.com/)
        * [NYT](https://developer.nytimes.com/)
        * [TMDB](https://www.themoviedb.org/)

    
3. In [Firebase](https://console.firebase.google.com/) go to your database and add two collections to your firestore database. 
   - users
   - videos
# Usage
   ## Examples
```javascript
/*   Using New York Time's API to get the current list of best fiction books.
  The function will return the poster, title, author, description, and Amazon link.*/
function getNYT(){

}
/*   Using The Movies Database's API to get the current popular movies. The function will return the poster, description, and title.
  The user can save a movie and get similar recommendation when user is login. The function will saved movies to the Firebase database.
Collapse */ 

function getMovies(){

}

/* Using the YouTube api to curate a list of videos to reccomend to the users. */

function getUserRecommendeds(video) {
    var YouTubeApi = `https://www.googleapis.com/YouTube/v3/search?part=snippet&maxResults=50&relatedToVideoId=${video.video_id}&type=video&key=${firebaseConfig.apiKey}`
    return new Promise((resolve, reject) => {
        $.get(YouTubeApi)
            .done(results => {
                resolve(results)
            })
            .fail(error => {
                reject(error)
            })
    })
}

function reccomendVideos() {
    if (userVidIds === undefined) {
        userReccomendations = curatedVideos;
    } else {
        Promise.all(userVidIds.map(video => { return getUserRecommendeds(video) })).then(results => { userReccomendations = results })
    }
}

```
The APIs are seperated into individual JavaScript files that fetch the data with jQuery asynchronously.

The YouTube api introduces a hard limit of 10,000 request per 24 hours.
Because of this limit we are only calling the YouTube API on two occasions to provide our user with curated videos.

* First during the installation of the project when two documents are created in the database.
* When a user reaches the set amount of videos for us to get a good list.

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License
[MIT](https://github.com/asantoss/entertainMe/LICENSE.txt)