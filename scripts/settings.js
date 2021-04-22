
var chosen_key_up;
var chosen_key_down;
var chosen_key_right;
var chosen_key_left ;
var chosen_key_code_up;
var chosen_key_code_down;
var chosen_key_code_left;
var chosen_key_code_right;
var chosen_num_of_food_points;
var chosen_color5;
var chosen_color15;
var chosen_color25;
var chosen_game_time;
var chosen_num_of_monsters;

function updateSettings(setting){
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
            document.getElementById("moveDownBtn").value = chosen_key_up;
            break;
        case "LEFT":
            chosen_key_left =  String.fromCharCode(key_code);
            chosen_key_code_left = key_code;
            document.getElementById("moveLeftBtn").value = chosen_key_up;
            break;
        case "RIGHT":
            chosen_key_right =  String.fromCharCode(key_code);
            chosen_key_code_right = key_code;
            document.getElementById("moveRightBtn").value = chosen_key_up;
            break;
        case "FOOD":
            chosen_num_of_food_points=document.getElementById("food-points-scale").value
            break;
        case "COLOR5":
            chosen_num_of_food_points=document.getElementById("food-points-scale").value
            break;
        case "COLOR15":
            chosen_num_of_food_points=document.getElementById("food-points-scale").value
            break;
        case "COLOR25":
            chosen_num_of_food_points=document.getElementById("food-points-scale").value
            break;
        case "TIME":
            chosen_num_of_food_points=document.getElementById("food-points-scale").value
            break;
        case "MONSTERS":
            chosen_num_of_food_points=document.getElementById("food-points-scale").value
            break;
    }

    $(document).unbind();
})
    
}