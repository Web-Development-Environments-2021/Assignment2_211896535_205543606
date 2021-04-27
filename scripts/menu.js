let menuBar = $('#menu');

let menuBarPosition = menuBar.offset().top;

$(window).scroll(function () {

    let currentScroll = $(window).scrollTop();
    if (currentScroll > menuBarPosition) {
        menuBar.addClass('fixed');
    } else {
        menuBar.removeClass('fixed');
    }
});

function switchScreens(id){
    if (pacman != undefined){
        resetGame();
    }
    hideScreens();
    $('#'+id).show();
    $('#'+id).focus();
};
function hideScreens(){
    $(".screen").hide();
}

function setValFromScale(label,scale){
    valfrom = document.getElementById(scale).value
    document.getElementById(label).innerHTML = valfrom
}

function startButton(){
    $("#settings-change").hide();
    showSettings();
    $("#game-container").show();
    Start();
}