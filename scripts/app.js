let context;
let shape = new Object();
let pacman = new Object();
let board;
let score;
let pac_color = "yellow";
let start_time;
let time_elapsed;
let interval;
let cur_username;
let food_remain;
let pacman_remain;
let cnt;
let rows_num = 10;
let cols_num = 20;
let lastKey;
let pac_direction;

$(document).ready(function() {
	context = canvas.getContext("2d");
	setUpUserDict();

	window.addEventListener("keydown", function(e) {
		if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);
	//Start();
});

function setUpUserDict(){
	var users ={"k":"k"}
}

function login(){
	
}

// Game

// function createBoard(){
// 	context.fillStyle = "black";
// 	context.fillRect(0, 0, canvas.width, canvas.height);
// }

function drawBoard(){
	board = new Array();
	/** W - WALL
	 * F5 - Food 5
	 * P - Pacman
	 * E - EMPTY
	 */

	 //get the food num from the settings
	// food_remain = chosen_num_of_food_points;
	food_remain = 50;
	pacman_remain = 1;
	cnt = 100;

	for (var i = 0; i < cols_num; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < rows_num; j++) {
			if (
				(i == 0) || (j==0) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == cols_num-1) ||
				(j== rows_num-1)
			) {
				board[i][j] = "W";
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					board[i][j] = "F5";

					food_remain--;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = "P";
				} else {
					board[i][j] = "E";
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = "F5";
		food_remain--;
	}	score = 0;
}

function Start() {
	drawBoard();
	
	start_time = new Date();
	
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	let i = getRandomInt(0,cols_num-1);
	let j = getRandomInt(0,rows_num-1);
	while (board[i][j] != "E") {
		i = getRandomInt(0,cols_num-1);
		j = getRandomInt(0,rows_num-1);
	}
	return [i, j];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetKeyPressed() {
	// UP
	if (keysDown[chosen_key_code_up]) {
		return 1;
	}
	// DOWN
	if (keysDown[chosen_key_code_down]) {
		return 2;
	}
	// LEFT
	if (keysDown[chosen_key_code_left]) {
		return 3;
	}
	// RIGHT
	if (keysDown[chosen_key_code_right]) {
		return 4;
	}
}

function DrawPacman(center){
	context.beginPath();
	context.arc(center.x, center.y, 10, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x + 5, center.y - 10, 1, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	let pac_img = new Image();
	let pac_src = "";
	for (var i = 0; i < cols_num; i++) {
		for (var j = 0; j < rows_num; j++) {
			var center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (board[i][j] == "P") {
				DrawPacman(center);
				// if (pac_direction == "U"){
				// 	pac_src = "./assets/pacman2-up.png";
				// }
				// else if (pac_direction == "D"){
				// 	pac_src = "./assets/pacman2-down.png";
				// }
				// else if (pac_direction == "R"){
				// 	pac_src = "./assets/pacman2-right.png";
				// }
				// else{
				// 	pac_src = "./assets/pacman2-left.png";
				// }
				// pac_img.onload = function(){
				// 	context.drawImage(pac_img,center.x,center.y,30,30);
				// }
				// pac_img.src = pac_src;

			} else if (board[i][j] == "F5") {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == "W") {
				context.beginPath();
				context.rect(center.x - 10, center.y - 10, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = "E";
	lastKey = GetKeyPressed();
	// UP
	if (lastKey == 1) {
		pac_direction = "U";
		if (shape.j > 0 && board[shape.i][shape.j - 1] != "W") {
			shape.j--;
		}
	}
	// DOWN
	if (lastKey == 2) {
		pac_direction = "D";
		if (shape.j < rows_num-1 && board[shape.i][shape.j + 1] != "W") {
			shape.j++;
		}
	}
	// LEFT
	if (lastKey == 3) {
		pac_direction = "L";
		if (shape.i > 0 && board[shape.i - 1][shape.j] != "W") {
			shape.i--;
		}
	}
	// RIGHT
	if (lastKey == 4) {
		pac_direction = "R";
		if (shape.i < cols_num-1 && board[shape.i + 1][shape.j] != "W") {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == "F5") {
		score++;
	}
	board[shape.i][shape.j] = "P";
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}