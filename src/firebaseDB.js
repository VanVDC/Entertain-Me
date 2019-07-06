var db = firebase.firestore();
var userVidIds;
var userBooks;
var userMovies;
var video;
var isUsrLoggedIn = false;
var saveBtn = document.getElementById('saveButton')
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
    } else {
        isUsrLoggedIn = false;
        login.addClass('bouncy');
        login.text('Login');
        login.click(() => {
            ui.start('#firebaseui-auth-container', uiConfig);
        })
        // User is signed out.
        // ...
    }
});

function userDataHTML(name, uid, ) {
    $('#userName').text(name);
    login.removeClass('bouncy');
    login.text('Sign Out');
    if (userVidIds.length > 1) {
        videosHTML = userVidIds.map(video => {
            return `<div class="likedContent"></div>`
        })
    }
}

function saveData(uid, type, data) {
    if (type === 'video') {
        db.collection('users').doc(uid).update({
            videoIds: firebase.firestore.FieldValue.arrayUnion(data)
        })
    } else if (type === 'book') {
        db.collection('users').doc(uid).update({
            books: firebase.firestore.FieldValue.arrayUnion(data)
        })
    } else if (type === 'movie') {
        db.collection('users').doc(uid).update({
            movies: firebase.firestore.FieldValue.arrayUnion(data)
        })
    }
    return readData(uid)
}

function readData(uid) {
    var docRef = db.collection("users").doc(uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            userVidIds = doc.data().videoIds;
            userBooks = doc.data().books;
            userMovies = doc.data().movies;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            db.collection("users").doc(uid).set({
                videoIds :[],
                books :[],
                movies :[]
            })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}
