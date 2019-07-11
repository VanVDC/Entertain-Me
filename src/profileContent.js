var saveBtn = $('#savebtn')
var modalSaved = $('#myModalSaved')

saveBtn.onclick = function() {
    saveModal.style.display = "block";
}

document.getElementById('movies').innerText=movies.title;
document.getElementById('youtube').innerHTML = userVidIds.map(video =>{
    return `<div><p>${video.}</div>`
})