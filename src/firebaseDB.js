var db = firebase.firestore();
var userVidIds
var video;

var saveBtn = $('#saveButton')


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        //....
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
        console.log(uid)
        saveBtn.click(() => {
            saveData(uid, player.getVideoData());
        })
    } else {
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
function saveData(uid, videoData) {
    db.collection('users').doc(uid).update({
        videoIds: firebase.firestore.FieldValue.arrayUnion(videoData)
    })
    return readData(uid)
}

function readData(uid) {
    var docRef = db.collection("users").doc(uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().videoIds);
            userVidIds = doc.data().videoIds;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}
