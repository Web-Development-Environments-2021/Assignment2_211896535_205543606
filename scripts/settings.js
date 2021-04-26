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
				required: "A",
			},
			moveDownBtn: {
				required: "A",
			},
            moveRightBtn: {
				required: "A",
			},
			moveLeftBtn: {
				required: "true",
			},
            foodPointsScale:{
                required: "true"
            },
            pointsColor5:{
                required: "true"
            },
            pointsColor15:{
                required: "true"
            },
            pointsColor25:{
                required: "true"
            },
            gameTimeScale:{
                required: "true"
            },
            monstersScale:{
                required: "true"
            }
		}
		,submitHandler: function(){
			startButton();
		}
	});	
});

let chosen_key_up;
let chosen_key_down;
let chosen_key_right;
let chosen_key_left ;
let chosen_key_code_up = 38;
let chosen_key_code_down = 40;
let chosen_key_code_left = 37;
let chosen_key_code_right = 39;
let chosen_num_of_food_points=50;
let chosen_color5 = "#dc143c"
let chosen_color15 = "#00FFFF";
let chosen_color25 = "#7FFF00"
let chosen_game_time = 100;
let chosen_num_of_monsters=4;

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
            chosen_game_time=document.getElementById("game-time-scale").value
            break;
        case "MONSTERS":
            chosen_num_of_monsters=document.getElementById("monsters-scale").value
            break;
    }
}

function updateSettingsKeys(setting){
    $(document).keydown(function(event){
    key_code = event.keyCode;
    switch (setting){
        case "UP":
            chosen_key_up =  String.fromCharCode(key_code);
            chosen_key_code_up = key_code;
            document.getElementById("moveUpBtn").value = chosen_key_up;
            break;
        case "DOWN":
            chosen_key_down =  String.fromCharCode(key_code);
            chosen_key_code_down = key_code;
            document.getElementById("moveDownBtn").value = chosen_key_down;
            break;
        case "LEFT":
            chosen_key_left =  String.fromCharCode(key_code);
            chosen_key_code_left = key_code;
            document.getElementById("moveLeftBtn").value = chosen_key_left;
            break;
        case "RIGHT":
            chosen_key_right =  String.fromCharCode(key_code);
            chosen_key_code_right = key_code;
            document.getElementById("moveRightBtn").value = chosen_key_right;
            break;
    }
    $(document).unbind();
});


}
function randomValues(){
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
    $("#game-container").hide();
    $("#settings-change").show();
}
