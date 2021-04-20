$(document).ready(function(){
	localStorage.setItem('p', 'p');

	//REGISTER
	$("#register_form").validate({
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
				validateUsername: "Username already taken."
			},
			password: {
				required: "Please enter an password",
				strongPassword: "password MUST contain at least one character and one number."
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
	});	
});
