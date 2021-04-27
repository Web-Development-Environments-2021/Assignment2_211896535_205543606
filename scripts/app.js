let context;
let pacman;
let small_food = new SmallFood();
let med_food = new MediumFood();
let big_food = new BigFood();
let board = new Board();
let score;
let start_time;
let time_elapsed;
let cur_username;
let food_remain;
let try_remain;
// let mySound = new sound("bounce.mp3");
let cnt;
let lastKey;
let ghost_array;
let curr_i
let curr_j
let doly;


$(document).ready(function() {
	context = canvas.getContext("2d");
	window.addEventListener("keydown", function(e) {
		if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);
});

function createBoard(){
	/** W - WALL
	 * F5 - Food 5
	 * F15 - 
od 15
	 * F25 - Food 25	 * P - Pacoman
	 * E - EMPTY
	 * D -DOLL
	 * G - GHOST 
	 */
	 //get the food num from the settings
	board.arr = new Array();
	food_remain = chosen_num_of_food_points
	for (var i = 0; i < board.cols_num; i++) {
		board.arr[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < board.rows_num; j++) {
			if (
				// 
				(i == 0) || (j==0) || 	(i == board.cols_num-1) || (j== board.rows_num-1)||
				(i == 3 && j == 3) || (i==3&&j==4) || (i==3&&j==5) || (i==3&&j==6)|| 
				(i==4&&j==3) || (i==5&&j==3) || (i==6&&j==3)||
				(i == 3 && j == 13) || (i==3&&j==12) || (i==3&&j==11) || (i==3&&j==10)||
				(i == 3 && j == 13) || (i==4&&j==13) || (i==5&&j==13) || (i==6&&j==13)||


				(i == 23 && j == 3) || (i==23 && j==4) || (i==23&&j==5) || (i==23&&j==6)||
				(i == 22 && j == 3) || (i==21&&j==3) || (i==20&&j==3)||

				(i == 23 && j == 13) || (i==22 && j==13) || (i==21&&j==13) || (i==20&&j==13)||
				(i == 23 && j == 13) || (i==23&&j==12) || (i==23&&j==11) || (i==23&&j==10)||

				(i == 12 && j == 3) || (i==13&&j==3) || (i==14&&j==3) ||
				(i == 12 && j == 13) || (i==13&&j==13) || (i==14&&j==13) ||
				(i == 9 && j == 1) || (i==9&&j==2) || (i==9&&j==3) || (i == 9 && j == 13) || (i==9&&j==15) || (i==9&&j==14)||
				(i == 17 && j == 1) || (i==17&&j==2) || (i==17&&j==3) || (i == 17 && j == 13) || (i==17&&j==15) || (i==17&&j==14)||
				(i == 12 && j == 13) || (i==13&&j==13) || (i==14&&j==13)||
				(i == 8 && j == 6) || (i==9&&j==6) || (i==10&&j==6) || (i == 11 && j == 6) || (i==12&&j==6) || (i == 14 && j == 6) || (i==15&&j==6) || (i==16&&j==6)|| (i==17&&j==6) || (i==18&&j==6)  ||
				(i == 8 && j == 10) || (i==9&&j==10) || (i==10&&j==10) || (i == 11 && j == 10) || (i==12&&j==10) || (i == 14 && j == 10) || (i==15&&j==10) || (i==16&&j==10)|| (i==17&&j==10) || (i==18&&j==10)
				||(i == 8 && j == 7) ||(i == 8 && j == 9) ||(i == 18 && j == 7) ||(i == 18 && j == 9) ||
				(i==12&&j==11) || (i == 14 && j == 11) || (i==12&&j==5) || (i == 14 && j == 5)||
				(i==7&&j==7) || (i == 7 && j == 9) || (i==19&&j==7) || (i == 19 && j == 9)||
				(i==3&&j==8) || (i == 23 && j == 8) || (i==12&&j==5) || (i == 14 && j == 5)
			)
			{
				board.arr[i][j] = "W";
			} 
			else if(i==13 && j==8){
				board.arr[i][j] = "T";
			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / board.cnt) 
				{
					const random_food = Math.random();
					if(random_food<=0.6){
						board.arr[i][j] = "F5";
						//small_food.remain--;
					}
					else if(random_food>0.6 && random_food<=0.9){
						board.arr[i][j] = "F15";
						//small_food.remain--;
					}
					else{
						board.arr[i][j] = "F25";
						//small_food.remain--;
					}
					food_remain--	
				} 
				// else if (randomNum < (1.0 * (pacman.lives_remain + food_remain)) / board.cnt) {
				// 	pacman.i = i;
				// 	pacman.j = j;
				// 	pacman.lives_remain--;
				// 	board.arr[i][j] = "P";
				// } 
				else {
					board.arr[i][j] = "E";
				}
				board.cnt--;
			}
		}
	}
	while (food_remain > 0) {
		let emptyCell = findRandomEmptyCell(board);
		const random_food = Math.random();
		if(random_food<=0.6){
			board.arr[emptyCell[0]][emptyCell[1]] = "F5";
		}
		else if(random_food>0.6 && random_food<=0.9){
			board.arr[emptyCell[0]][emptyCell[1]] = "F15";
		}
		else{
			board.arr[emptyCell[0]][emptyCell[1]] = "F25";
		}
		food_remain--
	}
	let pacman_cell = findRandomEmptyCell(board);
		score = 0;
		pacman.i=pacman_cell[0]
		pacman.j=pacman_cell[1]
	// set empty for teleport
	board.arr[0][8]="E"
	board.arr[26][8]="E"
	board.arr[13][0]="E"
	board.arr[13][16]="E"

}
function createMovingDoll(){
	doly.prevCell="E";
	let dollCell = findRandomEmptyCell(board);
	board.arr[dollCell[0]][dollCell[1]] = "D";
	doly.i=dollCell[0];
	doly.j=dollCell[1];
}

function createGhosts(){
	ghost_array = new Array(chosen_num_of_monsters);
	let startingPoints=[[1,1],[1,15],[25,1],[25,15]]
	let colorGhosts = ["RED","GREEN","BLUE","PINK"]
	for (i=0;i<ghost_array.length;i++){
		board.arr[startingPoints[i][0]][startingPoints[i][1]]="G";
		ghost_array[i]=new Ghost(colorGhosts[i]);
		ghost_array[i].i=startingPoints[i][0]
		ghost_array[i].j = startingPoints[i][1]
		ghost_array[i].prevCell="E"
	}
}
function Start() {
	pacman = new Pacman();
	pacman.lives_remain = 5;
	doly= new Doll();
	createBoard();
	createMovingDoll();
	createGhosts();
	// mySound.play();
	start_time = new Date();
	startTimer(chosen_game_time, document.getElementById("timer"));
	document.getElementById("username_title").innerHTML= username_curr;
	small_food.color = chosen_color5;
	med_food.color = chosen_color15;
	big_food.color = chosen_color25;
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
	interval2 = setInterval(updateGhostPosition,350);
	interval3 = setInterval(updateDollPosition,100);
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
		context.drawImage(pacman.img_up, center.x-10, center.y-10, board.cell_width*0.7, 0.7*board.cell_height);
	}
	else if (pacman.direction == "D"){
		context.drawImage(pacman.img_down, center.x-10, center.y-10, board.cell_width*0.7,0.7* board.cell_height);
	}
	else if (pacman.direction == "R"){
		context.drawImage(pacman.img_right, center.x-10, center.y-10, board.cell_width*0.7,0.7* board.cell_height);
	}
	else{
		context.drawImage(pacman.img_left, center.x-10, center.y-10, board.cell_width*0.7,0.7* board.cell_height);
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
			} 
			else if (board.arr[i][j] == "F5") {
				context.beginPath();
				context.arc(center.x, center.y, 4, 0, 2 * Math.PI); // circle
				context.fillStyle = small_food.color; //color
				context.fill();
			} else if (board.arr[i][j] == "F15") {
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = med_food.color; //color
				context.fill();
			}
			else if (board.arr[i][j] == "F25") {
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = big_food.color; //color
				context.fill();
			}
			else if (board.arr[i][j] == "W") {
				wall_img = new Image(10,10);
				wall_img.src = "./assets/wall.png";
				context.drawImage(wall_img,center.x-15, center.y-15, board.cell_width, board.cell_height);
			}
			else if (board.arr[i][j] == "T") {
				teleport_img = new Image(10,10);
				teleport_img.src = "./assets/teleport.jpg";
				context.drawImage(teleport_img,center.x-15, center.y-15, board.cell_width, board.cell_height);
			}
			else if(board.arr[i][j] == "D"){
				doll_img = new Image(10,10);
				doll_img.src = "./assets/doll.png";
				context.drawImage(doll_img,center.x-15, center.y-15, board.cell_width, board.cell_height);
			}
			else if(board.arr[i][j] == "G"){
				doll_img = new Image(10,10);
				doll_img.src = "./assets/ghost1.png";
				context.drawImage(doll_img,center.x-15, center.y-15, 0.75*board.cell_width, 0.75*board.cell_height);
			}
		}
	}
}

function UpdatePosition() {
	if (pacman.i==undefined || pacman.j==undefined){
		return
	}
	board.arr[pacman.i][pacman.j] = "E";
	board.arr[13][8] = "T";
	lastKey = GetKeyPressed();
	if(lastKey == undefined){
		lastKey = 0;
	}
	// UP
	if (lastKey == 1) {
		pacman.direction = "U";
		if(pacman.i==13 && pacman.j==0){
			pacman.i = 13 
			pacman.j= 16
		}
		else if (pacman.j > 0 && board.arr[pacman.i][pacman.j - 1] != "W") {
			pacman.j--;
		}
	}
	// DOWN
	if (lastKey == 2) {
		pacman.direction = "D";
		if(pacman.i==13 && pacman.j==16){
			pacman.i = 13 
			pacman.j= 0
		}
		else if (pacman.j < board.rows_num-1 && board.arr[pacman.i][pacman.j + 1] != "W") {
			pacman.j++;
		}
	}
	// LEFT
	if (lastKey == 3) {
		pacman.direction = "L";
		if(pacman.i==0 && pacman.j==8){
			pacman.i = 26 
			pacman.j= 8
		}
		else if (pacman.i > 0 && board.arr[pacman.i - 1][pacman.j] != "W") {
			pacman.i--;
		}
	}
	// RIGHT
	if (lastKey == 4) {
		pacman.direction = "R";
		if(pacman.i==26 && pacman.j==8){
			pacman.i = 0 
			pacman.j= 8
		}
		if (pacman.i < board.cols_num-1 && board.arr[pacman.i + 1][pacman.j] != "W") {
			pacman.i++;
		}
	}
	if(board.arr[pacman.i][pacman.j] == "D"){
		score+=50
	}
	if (board.arr[pacman.i][pacman.j] == "F5") {
		score+=5;
	}
	if (board.arr[pacman.i][pacman.j] == "F15") {
		score+=15;
	}
	if (board.arr[pacman.i][pacman.j] == "F25") {
		score+=25;
	}
	if(board.arr[pacman.i][pacman.j] == "T"){
		let emptyCell = findRandomEmptyCell(board);
		pacman.i=emptyCell[0]
		pacman.j=emptyCell[1]
	}
	board.arr[pacman.i][pacman.j] = "P";
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(pacman.lives_remain <= 0 || time_elapsed >= chosen_game_time){
		endGame();
	}
	else{
		Draw();
	}
}
function updateGhostPosition(){
	if (ghost_array==undefined){
		return
	}
	// set the cell as prev cell
	for (i=0;i<ghost_array.length;i++){
		board.arr[ghost_array[i].i][ghost_array[i].j]=ghost_array[i].prevCell;
		//DO A STEP!!!!!!!!!!!!!!!
		let step =makeGhostStep(ghost_array[i].i,ghost_array[i].j);
		ghost_array[i].i=step[0];
		ghost_array[i].j=step[1];
		// if ghosts touch telport
		if(board.arr[ghost_array[i].i][ghost_array[i].j] == "T"){
			let emptyCell = findRandomEmptyCell(board);
			ghost_array[i].i=emptyCell[0]
			ghost_array[i].j=emptyCell[1]
		}
		ghost_array[i].prevCell= board.arr[ghost_array[i].i][ghost_array[i].j]
		if (ghost_array[i].prevCell=="G")
			board.arr[ghost_array[i].i][ghost_array[i].j] = "E";
		else 
			board.arr[ghost_array[i].i][ghost_array[i].j] = "G";
		if (pacmanCaught()) {
			resetGame();
			if(pacman.lives_remain >0){
				resetAfterCaught();
			}
			
		} 
		else {
			Draw();
		}
	}	
}

function resetAfterCaught(){
	pacman.lives_remain--;
	score-=10;

	reset_arr = board.arr;
	for(let i=0; i<board.cols_num; i++){
		for(let j=0; j<board.rows_num; j++){
			if(board.arr[i][j] == "G" || board.arr[i][j] == "P"){
				reset_arr[i][j]=="E";
			}
		}
	}
	if (!doly.eaten){
		createMovingDoll();
	}
	createGhosts();	pacman.interval = setInterval(updatePosition,150);
	interval2 = setInterval(updateGhostPosition,350);
	interval3 = setInterval(updateDollPosition,200);

}

function updateDollPosition(){
	if (doly==undefined){
		return
	}
	board.arr[doly.i][doly.j]=doly.prevCell;
	//DO A STEP!!!!!!!!!!!!!!!
	let step =makeRandomValidStep(doly.i,doly.j);
	doly.i=step[0];
	doly.j=step[1];
	// if ghosts touch telport
	if(board.arr[doly.i][doly.j] == "T"){
		let emptyCell = findRandomEmptyCell(board);
		doly.i=emptyCell[0]
		doly.j=emptyCell[1]
	}

	//if pac touch doll
	if(board.arr[doly.i][doly.j] == "P"){
		score+=50
		clearInterval(interval3);
	}
	
	doly.prevCell= board.arr[doly.i][doly.j]
		if (doly.prevCell=="G")
			board.arr[doly.i][doly.j] = "E";
		else 
			board.arr[doly.i][doly.j] = "D";
		Draw();
}	
	
function pacmanCaught(){
	for (k=0;k<ghost_array.length;k++){
		if(pacman.i==ghost_array[k].i && pacman.j==ghost_array[k].j)
			return true
	}
	return false
}
// return a good step [x,y] to make
function makeGhostStep(curr_i,curr_j){
	let goodSteps=new Array();
	//UP
	if (board.arr[curr_i][curr_j+1]!="W" && board.arr[curr_i][curr_j+1]!="G"&& board.arr[curr_i][curr_j+1]!="D"  &&  goodStep(curr_i,curr_j,curr_i,curr_j+1))
		goodSteps.push([curr_i,curr_j+1]);
	//DOWN
	if (board.arr[curr_i][curr_j-1]!="W"  && board.arr[curr_i][curr_j-1]!="G" && board.arr[curr_i][curr_j-1]!="D" && goodStep(curr_i,curr_j,curr_i,curr_j-1))
		goodSteps.push([curr_i,curr_j-1]);
	//LEFT
	if (board.arr[curr_i-1][curr_j]!="W"   && board.arr[curr_i-1][curr_j]!="G" && board.arr[curr_i-1][curr_j]!="D" && goodStep(curr_i,curr_j,curr_i-1,curr_j))
		goodSteps.push([curr_i-1,curr_j]);
	//RIGHT
	if (board.arr[curr_i+1][curr_j]!="W" && board.arr[curr_i+1][curr_j]!="G" && board.arr[curr_i+1][curr_j]!="D" && goodStep(curr_i,curr_j,curr_i+1,curr_j))
		goodSteps.push([curr_i+1,curr_j]);

	if (goodSteps.length==0){
		return  makeRandomValidStep(curr_i,curr_j);
	}
	let rand_int = getRandomInt(0,goodSteps.length-1)
	let random_good_step = goodSteps[rand_int]
	return random_good_step;
}
function makeRandomValidStep(curr_i,curr_j){
	let validSteps=new Array();
	//UP
	if (curr_j+1<board.rows_num-1 &&board.arr[curr_i][curr_j+1]!="W" && board.arr[curr_i][curr_j+1]!="G"  && board.arr[curr_i][curr_j+1]!="D" )
		validSteps.push([curr_i,curr_j+1]);
	//DOWN
	if (curr_j-1>1&& board.arr[curr_i][curr_j-1]!="W"  && board.arr[curr_i][curr_j-1]!="G" && board.arr[curr_i][curr_j-1]!="D" )
		validSteps.push([curr_i,curr_j-1]);
	//LEFT
	if (curr_i>1 && board.arr[curr_i-1][curr_j]!="W"   && board.arr[curr_i-1][curr_j]!="G"  && board.arr[curr_i-1][curr_j]!="D")
		validSteps.push([curr_i-1,curr_j]);
	//RIGHT
	if (curr_j<board.cols_num-1 && board.arr[curr_i+1][curr_j]!="W" && board.arr[curr_i+1][curr_j]!="G" && board.arr[curr_i+1][curr_j]!="D")
		validSteps.push([curr_i+1,curr_j]);

	if (validSteps.length==0){
		return [curr_i,curr_j];
	}
	let rand_int = getRandomInt(0,validSteps.length-1)
	let random_valid_step = validSteps[rand_int]
	return random_valid_step;
}
//check if get ghost closer to pacman
function goodStep(curr_i,curr_j,next_i,next_j){
	let i_distance = curr_i - pacman.i;
	let j_distance = curr_j - pacman.j;

	let old_distance = Math.abs(i_distance) + Math.abs(j_distance);

	i_distance = next_i - pacman.i;
	j_distance = next_j - pacman.j;
	let new_distance = Math.abs(i_distance) + Math.abs(j_distance);
	if(old_distance >= new_distance)
		return true;
	else
		return false;
	}
function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
	window.clearInterval(timer);
	setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.value = minutes + ":" + seconds;

		--timer;
	}, 1000);
}
function endGame(){
	resetGame();
	let closeBtn;
	if(pacman.lives_remain <= 0){
		modal = document.getElementById("losing-ghost-modal");
		document.getElementById("losing-ghost-score-val").innerHTML=score;
		closeBtn = document.getElementById("close-ghost-lose-btn");
		modal.style.display = "block";
	}
	else if(time_elapsed >= chosen_game_time){
		if (score >=100){
			modal = document.getElementById("win-time-modal");
			document.getElementById("win-time-score-val").innerHTML = score;
			closeBtn = document.getElementById("close-win-time-btn");
			modal.style.display = "block";
		}
		else{
			modal = document.getElementById("lose-time-modal");
			document.getElementById("lose-time-score-val").innerHTML = score;
			closeBtn = document.getElementById("close-lose-time-btn");
			modal.style.display = "block";
		}
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
	if (code == 27)
		$(".modal").hide();
	});
}

function resetGame(){
	window.clearInterval(pacman.interval);
	window.clearInterval(interval2);

	winner.clearInterval(interval3);
}
