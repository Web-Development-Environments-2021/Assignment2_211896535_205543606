$(document).ready(function(){
	localStorage.setItem('k', 'k');

	$.validator.addMethod('strongPassword', function(value, element) {
		return this.optional(element)
		  || value.length >=6
		  && /\d/.test(value)
		  && /[a-z]/i.test(value);
	  },)

	//check if username already exists
	$.validator.addMethod('validateUsername', function (value, element) {
		is_valid = localStorage.getItem(value);
		is_item = localStorage[value];
		if(is_item==null)
			return true;
		else return false;
	});

	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},); 

// 	jQuery.validator.addMethod("fullname", function(value, element) {
//   	if (/^[a-z][- a-z]*[- ]{2}[- a-z]*[a-z]$/i.test(value))
//     	return true;
//   	 else
//     	return false;
// 	},);

// 	$(function() {
//         $('#fullname').on('keydown', function(e) {
//             if (e.which == 32){
//                 window.alert('Space Detected');
//             }
//         });
// });
	
	//REGISTER
	$("#register-form").validate({
		rules: {
			username: {
				required: true,
				validateUsername: true
			},
			password: {
				required: true,
				//minlength: 6,
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
				required: "Please enter a valid username.",
				validateUsername: "This username already taken."
			},
			password: {
				required: "Please enter a password.",
				strongPassword: "6 chars long and at least one number, upper and lower."
			},
			fullname: {
				required: "Please enter your name.",
				lettersonly: "Full name can be only letters and spaces."
			},
			email:{
				required: "Please enter an email address",
				email: "Please enter a valid email."
			},
			birthdate: {
				required: "Please enter your birth date"
			}
		}
		,submitHandler: function (){
			register();
			switchScreens(`Login-screen`);
			//reset form details
			let form = $("#register-form");
			form[0].reset();
		}
	});	
});


function register() {
	let username = document.getElementById("username-input").value;
	let password = document.getElementById("password-input").value;
	if (username != null || password != null){
		localStorage.setItem(username, password);
	}
	else{
		console.log("error: password or username are null");
	}
};
