var accessToken= "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
var API = "https://api.genius.com/search";
var APISong = "https://api.genius.com/songs/";
var songID = "378195";
var maxSong= 2471960; 


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (xhttp.readyState === 4) {
    if (xhttp.status === 200 || xhttp.status === 304) {

    }
  }
};
xhttp.open("GET", APISong+songID+accessToken, false);

xhttp.send(); 

demo=xhttp.response;

var json = JSON.parse(demo);
var song = json['response']['song'];


function newRandomSong() {
  songID =getRandomInt(1,maxSong);
  randomSong();
}

function randomSong(){
  xhttp.open("GET", APISong+songID+accessToken, false);
  xhttp.send(); 
  demo=xhttp.response;
  
  while (xhttp.status===404){
      songID =getRandomInt(1,maxSong);
      xhttp.open("GET", APISong+songID+accessToken, false);
      xhttp.send(); 
      demo=xhttp.response;
  }
  
  json = JSON.parse(demo);
  song = json['response']['song'];
  
  let img = document.getElementById('img');
  
  img.setAttribute('src', song['song_art_image_url']);
  
  //document.getElementById("title").innerHTML = "<a href = 'https://www.youtube.com/results?search_query= "+song['title']+" "+song['primary_artist']['name']+"'><img src = "+song['song_art_image_url']+"></img></a>";

  document.getElementById("title").textContent = "SONG: "+song['title'].toUpperCase();
 
  document.getElementById("summary").textContent = "ARTIST: " + song['primary_artist']['name'].toUpperCase();
  
  
  let b = document.getElementById("amazonURL");

  b.setAttribute('target', "blank")

  let songURL = "https://www.youtube.com/results?search_query=" +song['title']+ song['primary_artist']['name'];

  
  b.setAttribute("href",songURL);
  
  b.textContent="PLAY"
}
