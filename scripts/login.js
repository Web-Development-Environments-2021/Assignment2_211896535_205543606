$(document).ready(function(){
	localStorage.setItem('k', 'k');

	
    // LOGIN 
	$("#login-form").validate({
		rules: {
			username: {
				required: true,
			},
			password: {
				required: true,
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
