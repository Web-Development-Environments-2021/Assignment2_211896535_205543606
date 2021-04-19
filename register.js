$(document).ready(function(){
	// jQuery.validator.addMethod("fullname-onlyletters", function(value, element) {
	// allow only letters characters as the username part
	// return this.optional( element ) || /^[a-zA-Z])$/.test( value );
	// }, 'Please enter a valid full name.');

	$("#register-form").vaildate({
		rules:{
			username:{
				required: true
			},
			fullname:{
				required: true
			},
			password:{
				required: true,
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
				required: "Please enter a username",
			}, 
			fullname:{
				required: "Please enter your full name",
			}, 
			password:{
				required: "Please enter a password",
				// minlength: "The password must be at least 6 characters"
			},
			email:{
				required:  "Please enter you email",
			},
			date:{
				required:  "Please enter your birth date"
			}, 
		},
	});
});
