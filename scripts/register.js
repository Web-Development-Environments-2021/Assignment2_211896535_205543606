$(document).ready(function(){
	$("#register-form").vaildate({
		rules:{
			username:{
				required: true
			},
			fullname:{
				required: true
			},
			password:{
				required: true
				// minlength: 6
			},
			email:{
				required: true
			},
			date:{
				required: true
			},
		}
		,messages:{
			username:{
				required: "Please enter a username"
			}, 
			fullname:{
				required: "Please enter your full name"
			}, 
			password:{
				required: "Please enter a password"
			},
			email:{
				required:  "Please enter you email"
			},
			date:{
				required:  "Please enter your birth date"
			}, 
		},
	});
});
