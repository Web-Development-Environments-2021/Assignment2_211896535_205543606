			$(document).ready(function(){
				// jQuery.validator.addMethod("fullname-onlyletters", function(value, element) {
  				// allow only letters characters as the username part
  				// return this.optional( element ) || /^[a-zA-Z])$/.test( value );
				// }, 'Please enter a valid full name.');

				$("#register-form").vaildate({
					rules:{
						username:"required",
						fullname:"required",
						password:{
							required: true,
							// minlength: 6
						},
						email:"required",
						date:"required"
					}
					,messages:{
						username: "Please enter a username",
						fullname: "Please enter your full name",
						password:{
							required: "Please enter a password",
							// minlength: "The password must be at least 6 characters"
						},
						email: "Please enter you email",
						date: "Please enter your birth date"
					},
					submitHandler:function(form){
						form.submit();
					}
				});
				
			});
