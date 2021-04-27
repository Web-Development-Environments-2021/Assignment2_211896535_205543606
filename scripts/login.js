$(document).ready(function(){
	localStorage.setItem('k', 'k');

	//Add method to check if the password matches the user
	$.validator.addMethod('validateUser', function (password, element) {
		let input_username = document.getElementById("username").value;
		let localstorage_password = localStorage.getItem(input_username);
		if(localstorage_password === null) {
			return false;
		}
		else if(localstorage_password === password) {
			return true;
		}
		return false;
	});

    // LOGIN validation
	$("#login-form").validate({
		rules: {
			username: {
				required: true,
			},
			password: {
				required: true,
				validateUser: true
			}
		},
		messages: {
			username: {
				required: "Please enter your Username",
			},
			password: {
				required: "Please enter your Password",
				validateUser: "Password or Username are incorrect"
			}
		}
		,submitHandler: function(){
			login();
			newGameShowSettings();
			switchScreens(`game-screen`);
			let form = $("#login-form");
			form[0].reset();
		}
	});	
});

// Save the username
function login(){
	let try_username = document.getElementById("username").value;
	if(try_username != null){
		username_curr = try_username;
	}
	else{
		console.log("Username is null");
	}
}