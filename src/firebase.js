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
    let videosHTML = userVidIds.map(video => {
        if (video.title === "") {
            video.title = "Unknown"
        }
        if (video.author === "") {
            video.author = "Unknown"
        }
        return `<div class="userSavedInfo"><p>${video.author}</p><p>${video.title}</p> <button style="margin-top: 100px; border: 1px solid black; border-radius: 50px; heigh: 100px; width: 50%;" onClick="playSavedVid('${video.video_id}')">Play</button></div>`
    })
    document.getElementById('youtubeVideo').innerHTML = videosHTML.join('')
    document.getElementById('savedMovies').innerHTML = userMovies.map(movie => {
        return `<div class="userSavedInfo"><p>${movie.title}</p><p>${movie.release_date}</p><img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" width="200px" height="200px"></div>`
    }).join('')
    document.getElementById('savedBooks').innerHTML = userBooks.map(book => {
        return `<div class="userSavedInfo"><p>${book.title}</p><p>${book.author}</p><img src="${book.book_image}" width="200px" height="200px"><br><a href="${book.amazon_product_url}">Amazon</a></div>`
    }).join('')
}


function playSavedVid(id) {
    youtubeVideoDivContainer.css('opacity', '1');
    youtubeVideoDivContainer.css('display', 'block');
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
    if (event.target == modal) {
        modal.style.display = "none";
        saveModal.style.display = "none";
    }
}
