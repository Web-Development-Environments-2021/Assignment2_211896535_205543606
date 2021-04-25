let context;
let pacman = new Pacman();
let small_food = new SmallFood();
let med_food = new MediumFood();
let big_food = new BigFood();
let board = new Board();
let score;
let start_time;
let time_elapsed;
let interval;
let cur_username;
// let mySound = new sound("bounce.mp3");
let cnt;
let lastKey;

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


function drawBoard(){
	/** W - WALL
	 * F5 - Food 5
	 * P - Pacman
	 * E - EMPTY
	 */

	 //get the food num from the settings
	small_food.remain = 50;
	pacman.lives_remain = 1;
	cnt = 375;
	board.arr = new Array();

	for (var i = 0; i < board.cols_num; i++) {
		board.arr[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < board.rows_num; j++) {
			if (
				(i == 0) || (j==0) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == board.cols_num-1) ||
				(j== board.rows_num-1)
			){
				board.arr[i][j] = "W";
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * small_food.remain) / cnt) {
					board.arr[i][j] = "F5";

					small_food.remain--;
				} else if (randomNum < (1.0 * (pacman.lives_remain + small_food.remain)) / cnt) {
					pacman.i = i;
					pacman.j = j;
					pacman.lives_remain--;
					board.arr[i][j] = "P";
				} else {
					board.arr[i][j] = "E";
				}
				cnt--;
			}
		}
	}
	while (small_food.remain > 0) {
		let emptyCell = findRandomEmptyCell(board);
		board.arr[emptyCell[0]][emptyCell[1]] = "F5";
		small_food.remain--;
	}	score = 0;
}

function Start() {
	drawBoard();
	// mySound.play();
	start_time = new Date();
	startTimer(chosen_game_time, document.getElementById("timer"));
	document.getElementById("username_title").innerHTML= username_curr;
	small_food.color = chosen_color5;

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
	interval = setInterval(UpdatePosition, 150);
}

function findRandomEmptyCell(board) {
	let i = getRandomInt(0,board.cols_num-1);
	let j = getRandomInt(0,board.rows_num-1);
	while (board.arr[i][j] != "E") {
		i = getRandomInt(0,board.cols_num-1);
		j = getRandomInt(0,board.rows_num-1);
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
	if (pacman.direction == "U"){
		context.drawImage(pacman.img_up, center.x-15, center.y-15, board.cell_width, board.cell_height);
	}
	else if (pacman.direction == "D"){
		context.drawImage(pacman.img_down, center.x-15, center.y-15, board.cell_width, board.cell_height);
	}
	else if (pacman.direction == "R"){
		context.drawImage(pacman.img_right, center.x-15, center.y-15, board.cell_width, board.cell_height);
	}
	else{
		context.drawImage(pacman.img_left, center.x-15, center.y-15, board.cell_width, board.cell_height);
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (let i = 0; i < board.cols_num; i++) {
		for (let j = 0; j < board.rows_num; j++) {
			let center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (board.arr[i][j] == "P") {
				DrawPacman(center);

			} else if (board.arr[i][j] == "F5") {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = small_food.color; //color
				context.fill();
			} else if (board.arr[i][j] == "W") {
				context.beginPath();
				context.rect(center.x - 10, center.y - 10, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board.arr[pacman.i][pacman.j] = "E";
	lastKey = GetKeyPressed();
	// UP
	if (lastKey == 1) {
		pacman.direction = "U";
		if (pacman.j > 0 && board.arr[pacman.i][pacman.j - 1] != "W") {
			pacman.j--;
		}
	}
	// DOWN
	if (lastKey == 2) {
		pacman.direction = "D";
		if (pacman.j < board.rows_num-1 && board.arr[pacman.i][pacman.j + 1] != "W") {
			pacman.j++;
		}
	}
	// LEFT
	if (lastKey == 3) {
		pacman.direction = "L";
		if (pacman.i > 0 && board.arr[pacman.i - 1][pacman.j] != "W") {
			pacman.i--;
		}
	}
	// RIGHT
	if (lastKey == 4) {
		pacman.direction = "R";
		if (pacman.i < board.cols_num-1 && board.arr[pacman.i + 1][pacman.j] != "W") {
			pacman.i++;
		}
	}
	if (board.arr[pacman.i][pacman.j] == "F5") {
		score++;
	}
	board.arr[pacman.i][pacman.j] = "P";
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pacman.color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.value = minutes + ":" + seconds;

		if (--timer < 0) {
			window.alert("game over!");
		}
	}, 1000);
}