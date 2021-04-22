$(document).ready(function(){
	localStorage.setItem('k', 'k');

	//check if password match user
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

	
    // LOGIN 
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
				required: "Please enter username",
			},
			password: {
				required: "Please enter an password",
				validateUser: "password or username is incorrect"
			}
		}
		,submitHandler: function(){
			//login();
			switchScreens(`game-screen`)
			let form = $("#login-form");
			form[0].reset();
		}
	});	
});
