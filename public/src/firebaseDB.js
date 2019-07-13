var db = firebase.firestore();
var userVidIds;
var userBooks;
var userSongs;
var userMovies;
var curatedVideos;
var video;
var isUsrLoggedIn = false;

//This UID will be used for our saved function. 
//It is assigned a value when the user logs in.
var uid;


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        isUsrLoggedIn = true;
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        uid = user.uid;
        var providerData = user.providerData;
        //....
        document.getElementsByClassName('save')[0].setAttribute('style', 'display: block;');
        try {
            readData(uid)
            userDataHTML(displayName, uid)
        } catch (error) {
            console.error(error);
        }
        login.click(() => {
            firebase.auth().signOut().then(function () {
                location = `./index.html`
            }, function (error) { });
        })
        $('.container_footer_left').css('grid-column', 'span 1')
        $('.container_footer_right').css('display', 'flex')
    } else {
        isUsrLoggedIn = false;
        $('.container_footer_left').css('grid-column', 'span 2')
        $('.container_footer_right').css('display', 'none')
        login.text('Login');
        login.click(() => {
            ui.start('#firebaseui-auth-container', uiConfig);
        })
        // User is signed out.
        // ...
    }
});

function userDataHTML(name, uid, ) {
    login.text('Sign Out');
}


function saveVid(uid, data) {
    if (!userVidIds.includes(data) || userVidIds === undefined) {
        return db.collection('users').doc(uid).update({
            videoIds: firebase.firestore.FieldValue.arrayUnion(data)
        }).then(() => {
            if (userVidIds.length >= 5 && userVidIds.length <= 7) {
                readData(uid)
                return reccomendVideos()
            } else {
                return
            }
        })
    }
}

function saveBook(uid, data) {
    if (!userBooks.includes(data) || userBooks === undefined) {
        return db.collection('users').doc(uid).update({
            books: firebase.firestore.FieldValue.arrayUnion(data)
        })
    }
}
function saveMovie(uid, data) {
    if (!userMovies.includes(data) || userMovies === undefined) {
        return db.collection('users').doc(uid).update({
            movies: firebase.firestore.FieldValue.arrayUnion(data)
        })
    }
}
function saveSong(uid, data) {
    if (!userSongs.includes(data) || userSongs === undefined) {
        return db.collection('users').doc(uid).update({
            songs: firebase.firestore.FieldValue.arrayUnion(data)
        })
    }
}
function deleteItem(id, type, uid) {
    let data;
    if (type === 'song') {
        data = userSongs.find(song => {
            return song.id == id
        })
    } else if (type === 'movie') {
        data = userMovies.find(movie => {
            return movie.id == id
        })
    } else if (type === 'book') {
        data = userBooks.find(book => {
            return book.primary_isbn10 == id
        })
    } else if (type === 'video') {
        data = userVidIds.find(video => {
            return video.video_id == id
        })
    }
    if (userMovies.includes(data) || userSongs.includes(data) || userVidIds.includes(data) || userBooks.includes(data)) {
        return db.collection('users').doc(uid).update({
            movies: firebase.firestore.FieldValue.arrayRemove(data),
            videoIds: firebase.firestore.FieldValue.arrayRemove(data),
            books: firebase.firestore.FieldValue.arrayRemove(data),
            songs: firebase.firestore.FieldValue.arrayRemove(data)
        }).then(() => {
            renderUserSaved(uid)
        })
    }
}



function readData(uid) {
    var docRef = db.collection("users").doc(uid);
    return docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log(doc.data())
            userVidIds = doc.data().videoIds;
            userBooks = doc.data().books;
            userMovies = doc.data().movies;
            userSongs = doc.data().songs;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            db.collection("users").doc(uid).set({
                videoIds: [],
                books: [],
                movies: [],
                songs: []
            }).then(() => {
                return readData(uid)
            })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let vidDocRef = db.collection('videos').doc('curatedVideos')
    vidDocRef.get().then(doc => {
        if (doc.exists) {
            curatedVideos = doc.data().videos
        } else {
            debugger
            Promise.all(bestCookingVidsId.map(video => { return getUserRecommendeds(video) })).then(results => {
                vidDocRef.set({
                    videos: results
                })
                curatedVideos = results
                return curatedVideos
            })
        }
    })
})