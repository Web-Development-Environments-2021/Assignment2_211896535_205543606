$(document).ready(function(){
	localStorage.setItem('p', 'p');
    // LOGIN 
	$("#login-form").validate({
		rules: {
			username: {
				required: true,
			},
			password: {
				required: true,
				strongPassword: true
			}
		},
		messages: {
			username: {
				required: "Please enter username",
			},
			password: {
				required: "Please enter an password",
			}
		}
	});	
});
