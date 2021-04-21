$(document).ready(function(){
    // about modal script
    let aboutBtn = document.getElementById("aboutBtn")
    let modal = document.querySelector(".modal")
    let closeBtn = document.querySelector(".close-btn")

    aboutBtn.onclick = function(){
            modal.style.display = "block"
    }
    
    closeBtn.onclick = function(){
            modal.style.display = "none"
    }
    window.onclick = function(e){
        if(e.target == modal){
            modal.style.display = "none"
        }
        }
        $(document).keydown(function(e) {
        var code = e.keyCode || e.which;
        if (code == 27) $(".modal").hide();
        });
});