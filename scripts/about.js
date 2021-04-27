$(document).ready(function(){
    // about modal script
    let aboutBtn = document.getElementById("about-menu-btn");
    let modal = document.getElementById("about-modal");
    let closeBtn = document.getElementById("about-close-btn");

    aboutBtn.onclick = function(){
            modal.style.display = "block"
    }
    
    closeBtn.onclick = function(){
            modal.style.display = "none"
    }
    

    window.addEventListener("click", function(event) {
        if(event.target == modal){
            modal.style.display = "none"
        }
    });

    $(document).keydown(function(e) {
    var code = e.keyCode || e.which;
    if (code == 27)
        $(".modal").hide();
    });
});