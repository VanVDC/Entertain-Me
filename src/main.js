var apiResults = $('#apiResults')
$('#entertainMeBtn').click(() => {

    //This portion sets our iframe element to hide
    $('#player').css('opacity', '0');
    $('#player').css('display', 'none');
    $('#player').attr('src', ``)
    let random = Math.floor((Math.random() * 4) + 1);
    console.log(random)
    if (random === 1) {
        giveMeRandomVid()
    }
})