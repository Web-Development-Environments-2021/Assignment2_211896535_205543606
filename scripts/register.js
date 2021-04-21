$(document).ready(function(){
	localStorage.setItem('k', 'k');

	$.validator.addMethod('strongPassword', function(value, element) {
		return this.optional(element) 
		  || value.length >= 6
		  && /\d/.test(value)
		  && /[a-z]/i.test(value);
	  },)
	
	//REGISTER
	$("#register-form").validate({
		rules: {
			username: {
				required: true,
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
	});	
});
