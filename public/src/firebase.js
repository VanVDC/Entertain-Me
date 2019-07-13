firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var login = $('#navLinks_login');



var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            modal.style.display = "none";
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
//-----------------------------//
//Firebase auth state listener to show user data on an element.


/* Modal code */

/* Saved Modal */

// Get the modal
var saveModal = document.getElementById("myModalSaved");

var saveBtn = document.getElementById("saved-content");

var saveSpan = document.getElementsByClassName("closeSaved")[0];

saveBtn.onclick = function () {
    saveModal.style.display = "block";
    renderUserSaved(uid)
}


function showMovie(id) {
    movie = userMovies.find(userMovie => {
        return userMovie.id == id
    })
    const { poster_path, overview, original_title } = movie; //data
    let img = document.getElementById('img'); // get the img tag
    img.setAttribute('src', imgLink + poster_path);
    document.getElementById('title').textContent = original_title; //render the title
    document.getElementById('summary').textContent = overview; // render the summary
    youtubeVideoDivContainer.css('opacity', '0');
    youtubeVideoDivContainer.css('display', 'none');
    document.getElementById('nyt_tmdb').setAttribute('style', 'display: block;');
    return saveModal.style.display = "none"
}
function renderUserSaved(uid) {
    readData(uid).then(() => {
        let videosHTML = userVidIds.map(video => {
            if (video.title === "") {
                video.title = "Unknown"
            }
            if (video.author === "") {
                video.author = "Unknown"
            }
            return `<div class="userSavedInfo"><h4>Video</h4><p>${video.author}</p><p>${video.title}</p><a class="button5" style="background-color:#42cc8c;" onClick="playSavedVid('${video.video_id}')">Play</a><a class="button5" style="background-color:Red;" onClick="deleteItem('${video.video_id}', 'video', '${uid}')">Remove</a></div>`
        })
        document.getElementById('youtubeVideo').innerHTML = videosHTML.join('')
        document.getElementById('savedMovies').innerHTML = userMovies.map(movie => {
            return `<div class="userSavedInfo"><h4>Movie</h4><p>${movie.title}</p><p>${movie.release_date}</p><img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" width="200px" height="200px"><a class="button5" style="background-color:#42cc8c;" onClick="showMovie('${movie.id}')">Info</a> <a class="button5" style="background-color:Red;" onClick="deleteItem('${movie.id}', 'movie', '${uid}')">Remove</a></div>`
        }).join('');
        document.getElementById('savedBooks').innerHTML = userBooks.map(book => {
            return `<div class="userSavedInfo"><h4>Book</h4><p>${book.title}</p><p>${book.author}</p><img src="${book.book_image}" width="200px" height="200px"><br><a href="${book.amazon_product_url}">Amazon</a><a class="button5" style="background-color:Red;" onClick="deleteItem('${book.primary_isbn10}','book', '${uid}')">Remove</a></div>`
        }).join('');
        document.getElementById('savedSongs').innerHTML = userSongs.map(song => {
            return `<div class="userSavedInfo"><h4>Song</h4><p>${song.full_title}</p><img src="${song.header_image_thumbnail_url}" width="200px" height="150px"><br><a id="appleMusic" href="${song.apple_music_player_url}">Play</a><hr>${song.embed_content}<a class="button5" style="background-color:Red;" onClick="deleteItem('${song.id}','song', '${uid}')">Remove</a></div>`
        }).join('')
    })
}

function playSavedVid(id) {
    youtubeVideoDivContainer.css('opacity', '1');
    youtubeVideoDivContainer.css('display', 'block');
    document.getElementById('nyt_tmdb').setAttribute('style', 'display: none;');
    player.loadVideoById(id)
    return saveModal.style.display = "none"

}

function showSavedBook(id) {
    youtubeVideoDivContainer.style.opacity = '1'
    youtubeVideoDivContainer.style.display = 'none'

}

saveSpan.onclick = function () {
    saveModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        saveModal.style.display = "none";
    }
}

//login modal

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById('navLinks_login')

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal || event.target == saveModal) {
        modal.style.display = "none";
        saveModal.style.display = "none";
    }
}


$('#about').click(() => {
    showAbout()
})

function showAbout() {
    return location = `about_index.html`
}
