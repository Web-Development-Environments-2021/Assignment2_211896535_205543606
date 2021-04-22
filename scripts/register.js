$(document).ready(function(){
	localStorage.setItem('k', 'k');

	$.validator.addMethod('strongPassword', function(value, element) {
		return this.optional(element) 
		  || value.length >= 6
		  && /\d/.test(value)
		  && /[a-z]/i.test(value);
	  },)


	//check if username already exists
	$.validator.addMethod('validateUsername', function (value, element) {
		is_valid = localStorage.getItem(value)
		is_item = localStorage[value]
		if(is_item==null)
			return true;
		else return false;
	});
	
	//REGISTER
	$("#register-form").validate({
		rules: {
			username: {
				required: true,
				validateUsername: true
			},
			password: {
				required: true,
				strongPassword: true
			},
			fullname: {
				required: true,
				lettersonly: true
			},
			email: {
				required: true,
				email: true
			},
			birthdate: {
				required: true
			}
		},
		messages: {
			username: {
				required: "Please enter valid username address.",
				validateUsername: "this username already taken"
			},
			password: {
				required: "Please enter an password",
				strongPassword: "Your password must be at least 6 characters long and contain at least one number and one char"
			},
			fullname: {
				required: "Please enter a name.",
				lettersonly: "Full name can be only letters."
			},
			email: {
				required: "Please enter an email address....",
				email: "Please enter a valid email."
			},
			birthdate: {
				required: "Please enter your birth date."
			}
		}
		,submitHandler: function () {
			register();
			switchScreens(`Login-screen`)
			//reset form details
			let form = $("#register-form");
			form[0].reset();
		}
	});	
});


function register() {
	let username = document.getElementById("username-input").value;
	let password = document.getElementById("password-input").value;
	localStorage.setItem(username, password);
};
