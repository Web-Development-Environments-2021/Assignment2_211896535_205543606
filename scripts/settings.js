$(document).ready(function(){
    // SETTINGS 
	$("#settings-form").validate({
		rules: {
			moveUpBtn: {
				required: true,
			},
			moveDownBtn: {
				required: true,
			},
            moveRightBtn: {
				required: true,
			},
			moveLeftBtn: {
				required: true,
			},
            foodPointsScale:{
                required: true
            },
            pointsColor5:{
                required: true
            },
            pointsColor15:{
                required: true
            },
            pointsColor25:{
                required: true
            },
            gameTimeScale:{
                required: true
            },
            monstersScale:{
                required: true
            }
		},
		messages: {
            moveUpBtn: {
				required: "enter up btn",
			},
			moveDownBtn: {
				required: "enter down btn",
			},
            moveRightBtn: {
				required: "enter right btn",
			},
			moveLeftBtn: {
				required: "enter left btn",
			},
            foodPointsScale:{
                required: "enter food points"
            },
            pointsColor5:{
                required: "enter color"
            },
            pointsColor15:{
                required: "enter color"
            },
            pointsColor25:{
                required: "enter color"
            },
            gameTimeScale:{
                required: "enter game time"
            },
            monstersScale:{
                required: "enter monster"
            }
		}
		,submitHandler: function(){
			startButton();
		}
	});	
});

let chosen_key_up="⇧";
let chosen_key_down="⇩";
let chosen_key_right = "➪";
let chosen_key_left= "⇦" ;
let chosen_key_code_up = 38;
let chosen_key_code_down = 40;
let chosen_key_code_left = 37;
let chosen_key_code_right = 39;
let chosen_num_of_food_points=60;
let chosen_color5 = "#dc143c";
let chosen_color15 = "#00FFFF";
let chosen_color25 = "#7FFF00";
let chosen_game_time = 60;
let chosen_num_of_monsters=2;

function updateSettings(setting){
    switch(setting){
        case "FOOD":
            chosen_num_of_food_points=parseInt(document.getElementById("food-points-scale").value)
            break;
        case "COLOR5":
            chosen_color5=document.getElementById("5-point-color").value
            break;
        case "COLOR15":
            chosen_color15=document.getElementById("15-point-color").value
            break;
        case "COLOR25":
            chosen_color25=document.getElementById("25-point-color").value
            break;
        case "TIME":
            chosen_game_time=parseInt(document.getElementById("game-time-scale").value)
            break;
        case "MONSTERS":
            chosen_num_of_monsters=parseInt(document.getElementById("monsters-scale").value)
            break;
    }
}

function updateSettingsKeys(setting){
    $(document).keydown(function(event){
    key_code = event.keyCode;
    switch (setting){
        case "UP":
            if (key_code==chosen_key_code_down || key_code==chosen_key_code_left || key_code==chosen_key_code_right)
                break;
            chosen_key_up=  DisplaychosenKey(key_code);
            chosen_key_code_up = key_code;
            document.getElementById("moveUpBtn").value = chosen_key_up;
            break;
        case "DOWN":
            if (key_code==chosen_key_code_up || key_code==chosen_key_code_left || key_code==chosen_key_code_right)
            break;
            chosen_key_down=  DisplaychosenKey(key_code);
            chosen_key_code_down = key_code;
            document.getElementById("moveDownBtn").value = chosen_key_down;
            break;
        case "LEFT":
            if (key_code==chosen_key_code_down || key_code==chosen_key_code_up || key_code==chosen_key_code_right)
            break;
            chosen_key_left=  DisplaychosenKey(key_code);
            chosen_key_code_left = key_code;
            document.getElementById("moveLeftBtn").value = chosen_key_left;
            break;
        case "RIGHT":
            if (key_code==chosen_key_code_down || key_code==chosen_key_code_left || key_code==chosen_key_code_up)
            break;
            chosen_key_right=  DisplaychosenKey(key_code);
            chosen_key_code_right = key_code;
            document.getElementById("moveRightBtn").value = chosen_key_right;
            break;
    }
    $(document).unbind();
});


function DisplaychosenKey(key_code)
{
	if(key_code == 38) return "⇧";
	else if(key_code == 40) return "⇩";
	else if(key_code == 39) return "➪";
	else if(key_code == 37) return "⇦";
	else return String.fromCharCode(event.keyCode);
}


}
function randomValues(){
    chosen_key_code_up = 38;
    chosen_key_code_down = 40;
    chosen_key_code_left = 37;
    chosen_key_code_right = 39;
    chosen_key_up="⇧";
    document.getElementById("moveUpBtn").value = chosen_key_up;
    chosen_key_down="⇩";
    document.getElementById("moveDownBtn").value = chosen_key_down;
    chosen_key_right="➪";
    document.getElementById("moveRightBtn").value = chosen_key_right;
    chosen_key_left ="⇦";
    document.getElementById("moveLeftBtn").value = chosen_key_left;
    chosen_num_of_food_points= getRandomInt(50,90);
    document.getElementById("food-points-scale").value=chosen_num_of_food_points;
    document.getElementById("food-points-label").innerHTML=chosen_num_of_food_points;
    chosen_color5 =getRandomColor();
    document.getElementById("5-point-color").value=chosen_color5;
    chosen_color15= getRandomColor();
    document.getElementById("15-point-color").value=chosen_color15;
    chosen_color25 = getRandomColor();
    document.getElementById("25-point-color").value=chosen_color25;
    chosen_game_time = getRandomInt(60,360);
    document.getElementById("game-time-scale").value=chosen_game_time;
    document.getElementById("game-time-label").innerHTML=chosen_game_time;
    chosen_num_of_monsters=getRandomInt(1,4);
    document.getElementById("monsters-scale").value=chosen_num_of_monsters;
    document.getElementById("monsters-label").innerHTML=chosen_num_of_monsters;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function showSettings(){
    // if(chosen_key_up == || chosen_key_down == || chosen_key_left == || chosen_key_right)
    document.getElementById("game-time-val").innerHTML = chosen_game_time;
    document.getElementById("show-key-up-chosen-val").innerHTML= chosen_key_up;
    document.getElementById("show-key-down-chosen-val").innerHTML= chosen_key_down;
    document.getElementById("show-key-left-chosen-val").innerHTML= chosen_key_left;
    document.getElementById("show-key-right-chosen-val").innerHTML= chosen_key_right;
    document.getElementById("total-food-count-val").innerHTML= chosen_num_of_food_points;
    document.getElementById("total-ghosts-count-val").innerHTML= chosen_num_of_monsters;
    document.getElementById("5-points-color-val").value=chosen_color5;
    document.getElementById("15-points-color-val").value=chosen_color15;
    document.getElementById("25-points-color-val").value=chosen_color25;
}

function newGameShowSettings(){
    if(pacman != undefined){
        resetGame();
    }
    $(".modal").hide();
    $("#game-container").hide();
    $("#settings-change").show();
}

function changeSound(){
    sound_off_img = document.getElementById("sound-off-img");
    sound_on_img = document.getElementById("sound-on-img");
    if(sound_off_img.style.display == "block"){
        sound_off_img.style.display = "none";
        sound_on_img.style.display = "block";
        gameSound.muted = true;
        quackSound.muted = true;
        teleportSound = true;
    }
    else{
        sound_off_img.style.display = "block";
        sound_on_img.style.display = "none";
        gameSound.muted = false;
        quackSound.muted = false;
        teleportSound = false;
    }
}
