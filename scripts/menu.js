function switchScreens(id){
    if (pacman != undefined){
        resetGame();
    }
    hideScreens();
    $('#'+id).show();
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